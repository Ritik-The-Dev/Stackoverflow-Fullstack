import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodeMailer from "nodemailer";
import User from "../models/auth.js";
import otpSchema from "../models/otp.js"
import otpGenerator from 'otp-generator';
import imageSchema from '../models/Public/image.js'
import tweetSchema from '../models/Public/tweet.js'
import videoSchema from '../models/Public/video.js'
import loginHistorySchema from "../models/loginHistory.js";
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
const  cloudinaryUse = cloudinary.v2;
import useragent from 'express-useragent'
import requestIp from 'request-ip'

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {  expiresIn: "30d" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    // get system ip and info
    let userSystemInfo = req.headers['user-agent'];
    userSystemInfo = useragent.parse(userSystemInfo);

    const userIPAddress = requestIp.getClientIp(req);

    console.log("System -:",userSystemInfo,"IP -:",userIPAddress)
    
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      {  expiresIn: "3d" }
    ); 

    await loginHistorySchema.create({email,SystemInfo:{userSystemInfo},IPAdress:userIPAddress});

    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    console.log(error)
    res.status(500).json("Something went worng...",error);
  }
};

export const sendOtp = async (req,res)=>{
  try{

    const {email} = req.body

    //validate user exists or not
    const userExist =  await User.findOne({email:email})
    if(!userExist){
      return res.status(404).json({
        message:"User does not exists with this email",
        success:false
      })
    }

    //Generate otp
    const otp = otpGenerator.generate(6,{ lowerCaseAlphabets: false,upperCaseAlphabets:false, specialChars: false })

    const result =await otpSchema.create({otp})
    //if userexists send otp
    const transporter = nodeMailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
      }
    })

    try{
      const MailInfo = await transporter.sendMail({
        from:"StackOverflow-Main",
        to:email,
        subject:"Forget Password Authentication",
        html: `<p>Otp for Authentication is <h1>${otp}</h1>
        do not Share it with anyone</p><br>
        <p>Valid for 5 minutes only </p>`
      })
    }
    catch(err){
      console.log(`Failed to send Email` ,err)
    }


    //send response
    res.status(200).json({
      message:`OTP has been sent on your registered mail id`,
      success:true,
    data:otp
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      data:err.message,
      message:"Internal Server Error"
    })
  }
}

export const changePassword = async (req,res)=>{
  try{
    const {email,otp,newpassword} = req.body;

    //validate user exists or not
    const userExist =  await User.findOne({email:email})
    if(!userExist){
      return res.status(404).json({
        message:"User does not exists with this email",
        success:false
      })
    }

    //extract otp from database
    const Sendedotp = await otpSchema.findOne({otp})

    if(!Sendedotp || Sendedotp === "" || Sendedotp === null){
      return res.status(403).json({
        message:"Otp is Expired"
      })
    }

    //extract userId too
    const userId = userExist._id;


    //check otp matches or not`
    if(otp !== Sendedotp.otp){
      return res.status(403).json({
        success:false,
        message:"Invalid Otp"
      })
    }
    //hash new password
    const hashedPassword = await bcrypt.hash(newpassword,12);

    //if Otp Matches change PassWord in db
    const response = await User.findByIdAndUpdate(userId,{
      password: hashedPassword
    })

    //send res
    return res.status(200).json({
      success:true,
      data:response,
      message:"Password Changes Successfully"
    })
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      data:err.message,
      message:"Internal Server Error"
    })
  }
}

export const Addtweet = async (req,res)=>{
  try{
    const {tweet,postedBy,email} = req.body;
    
    if(!tweet){
      return res.status(400).json({
        success:false,
        message:"No data found"
      })
    }

    //add tweet to db
    const tweetdata = await tweetSchema.create({tweet:tweet,postedBy,email});

    //send Response
    return res.status(200).json({
      success:true,
      data:tweetdata,
      message:"Data Uploaded Successfully"
    })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}
export const AddImage = async (req,res)=>{
  try{

    const imagefile = req.files.image1;

    const {imageCaption,postedBy,email} = req.body;

    if(!imagefile || imagefile===undefined){
      return res.status(400).json({
        success:false,
        message:"No data found"
      })
    }

    let imageUrl;
    try{
      const options = {folder:"StackOverflowimage"}
      options.resource_type="auto";
      const imageRes = await cloudinaryUse.uploader.upload(imagefile.tempFilePath,options)
      imageUrl = imageRes.secure_url
      }
      catch(err){
        console.log("Can't Upload image to Cloudinary");
      }
      
      //Upload data to db
      const imageData = await imageSchema.create({imageUrl:imageUrl,imageCaption,postedBy,email})

      // send response
      return res.status(200).json({
        success:true,
        data:imageData,
        message:"image Uploaded Successfully"
      })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }}

  export const AddVideo = async (req,res)=>{
    try{

      const videofile = req.files.video1;
      const {videoCaption,postedBy,email} = req.body;

      if(!videofile || videofile === undefined){
        return res.status(400).json({
          success:false,
          message:"No data found"
        })
      }
  
      let videoUrl;
      try{
        const options = {folder:"StackOverflowvideo"}
        options.resource_type="auto";
        const videoRes = await cloudinaryUse.uploader.upload(videofile.tempFilePath,options)
        videoUrl = videoRes.secure_url
        }
        catch(err){
          console.log("Can't Upload video to Cloudinary");
        }
        
        //Upload data to db
        const videoData = await videoSchema.create({videoUrl:videoUrl,videoCaption,postedBy,email})

        // send response
        return res.status(200).json({
          success:true,
          data:videoData,
          message:"Video Uploaded Successfully"
        })
    }
    catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      })
    }}

    export const getTweet = async (req,res)=>{
      try{

        //get tweets from database
        const tweetData = await tweetSchema.find({}).sort({ createAt: -1 });

        //send response
        return res.status(200).json({
          success:true,
          data:tweetData,
          message:"Tweet Fetched Successfully"
        })
      }
      catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
              message:"Internal Server Error"
      })
      }}

export const getImage = async (req,res)=>{
        try{
  
          //get Images from database
          const ImageData = await imageSchema.find({}).sort({ createAt: -1 });

          //send response
          return res.status(200).json({
            success:true,
            data:ImageData,
            message:"Image Fetched Successfully"
          })
        }
        catch(err){
        console.log(err);
        return res.status(500).json({
          success:false,
                message:"Internal Server Error"
        })
        }}

export const getVideo = async (req,res)=>{
          try{
            
            //get Videos from database
            const VideoData = await videoSchema.find({}).sort({ createAt: -1 });
            //send response
            return res.status(200).json({
              success:true,
              data:VideoData,
              message:"Video Fetched Successfully"
            })
          }
          catch(err){
          console.log(err);
          return res.status(500).json({
            success:false,
                  message:"Internal Server Error"
          })
          }}

//Get Login History
export const getLoginHistory = async(req,res)=>{
  try{
    const email = req.params;

    // const checkUserExist = 
    const LoginHistoryInfo = await loginHistorySchema.find(email).sort({ loginAt: -1 });
    return res.status(200).json({
      success:true,
      data:LoginHistoryInfo,
      message:"Login History Fetched Successfully"
    })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
            message:"Internal Server Error"
    })
  }
}