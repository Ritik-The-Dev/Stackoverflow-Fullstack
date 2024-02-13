import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './AddPublic.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import badWords from 'bad-words-next'
import en from 'bad-words-next/data/en.json'
import Filter from 'bad-words'
import abusiveWords from './abusiveWords.json';
//
import {
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from 'obscenity';
const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});
//

const filter = new Filter();
filter.addWords(...abusiveWords.abusiveWords);
const BADWORDS = new badWords({ data: en })

const AddPublicInfo = ({ slideIn, handleSlideIn }) => {

    const [image,setimage] = useState(null);
    const [video,setVideo] = useState(null);
    const [tweet,settweet]= useState('');
    const [imageCaption,setimageCaption] = useState('')
    const [videoCaption,setvideoCaption] = useState('')


    //Check user login or not
    const User = useSelector((state) => state.currentUserReducer);
    const Navigate = useNavigate();

    //tweet upload
    const tweetUpload = async ()=>{
    try{
      if (User){
        let email = await User.result.email
        let postedBy = await User.result.name
         if(tweet !== ""){
          const badWordDetect = BADWORDS.check(tweet.toLowerCase());
         if(badWordDetect === true || matcher.hasMatch(tweet.toLowerCase()) || filter.isProfane(tweet.toLowerCase()) === true){
          settweet('');
          return alert(" Cannot Post Bad Word Detected")
        }
        const data = await fetch(`https://stackbackend-9z32.onrender.com/user/AddTweet`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Set the content type header to JSON
            },
            body: JSON.stringify({ tweet,postedBy,email })
          })
          const res = await data.json();

        if(res.success === true){
            alert("Tweet Upload Successfully")
            settweet('')
        }
        else{
            alert("Error in Tweet Upload");
        }
      }
      else{
        alert("Cant Tweet Empty")
      }
    }
    else{
      alert("Login to Post a Tweet")
    }}
    catch(err){
        console.log(err);
    }
    }

  //Image Upload

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setimage(selectedImage);
    };

    const uploadImage = async ()=>{
           try{
            if(User){
            let email = await User.result.email
        let postedBy = await User.result.name

            if (!image) {
                alert('No image selected.');
                return;
              }
              if (!User) {
                Navigate("/Auth");
               return alert("Login or Signup to Post Images");
              }

              const formData = new FormData();
              formData.append('image1', image);
            
              // Check if imageCaption is provided before appending
              if (imageCaption) {
                const badWordDetect = BADWORDS.check(imageCaption);
                if(badWordDetect === true){
                  setimageCaption('');
                  return alert(" Cannot Post Bad Word Detected")
                }
                if(filter.isProfane(imageCaption) === true){
                  setimageCaption('');
                  return alert(" Cannot Post Bad Word Detected")
                }
                formData.append('imageCaption', imageCaption);
                formData.append('postedBy', postedBy);
                formData.append('email', email);

              }
            
              const data = await fetch(`https://stackbackend-9z32.onrender.com/user/AddImage`, {
                method: 'POST',
                body: formData,
              });
            
              const res = await data.json();
            if(res.success === true){
                alert("Image Upload Successfully")
                setimage(null)
            }
            else{
                alert("Error in Image Upload");
            }}
            else{
              alert("Login to Post a Image")
            }
           }
           catch(err){
            console.log(err)
           }
        }

//Video Upload

    const handleVideoChange = (e)=>{
        const selectedVideo = e.target.files[0];
        setVideo(selectedVideo);
    }


const uploadVideo = async ()=>{
    try{
      if(User){
      let email = await User.result.email
        let postedBy = await User.result.name

        if (!video) {
            alert('No image selected.');
            return;
          }

          if (!User) {
            Navigate("/Auth");
           return alert("Login or Signup to Post Videos");
          }

     const formData = new FormData();
     formData.append('video1', video);

      // Check if imageCaption is provided before appending
      if (videoCaption) {
        const badWordDetect = BADWORDS.check(videoCaption);
        if(badWordDetect === true){
          setvideoCaption('');
          return alert(" Cannot Post Bad Word Detected")
        }
        if(filter.isProfane(video) === true){
          setvideoCaption('');
          return alert(" Cannot Post Bad Word Detected")
        }
        formData.append('videoCaption', videoCaption);
        formData.append('postedBy', postedBy);
        formData.append('email', email);
      }

     const data = await fetch(`https://stackbackend-9z32.onrender.com/user/AddVideo`, {
     method: 'POST',
     body: formData
      })
     const res = await data.json();
     if(res.success === true){
        alert("Video Upload Successfully");
        setVideo(null)
    }
    else{
        alert("Error in Video Upload");
    }
    }
    else{
      alert("Login to Post a Video")
    }}
    catch(err){
     console.log(err)
    }
 }
    const GotoImage = ()=>{
        let box1 = document.querySelector(".data1")
        let box2 = document.querySelector(".data2")
        let box3 = document.querySelector(".data3")

        box1.classList.add("hidden")
        box3.classList.add("hidden")
        box2.classList.remove("hidden")
    }
    const gotoVideo = ()=>{
        let box1 = document.querySelector(".data1")
        let box2 = document.querySelector(".data2")
        let box3 = document.querySelector(".data3")

        box1.classList.add("hidden")
        box2.classList.add("hidden")
        box3.classList.remove("hidden")
    }
    const gotoTweet = ()=>{
        let box1 = document.querySelector(".data1")
        let box2 = document.querySelector(".data2")
        let box3 = document.querySelector(".data3")

        box3.classList.add("hidden")
        box2.classList.add("hidden")
        box1.classList.remove("hidden")
    }
  return (
    <div className="home-container-1">
        <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn}  />
    <div className="home-container-2">
    <div className='question-details-page'>
      <div className="main-data">   
        <div className="data">
        <h1 className='TweetAdd'>Add Public info</h1>
        <div className="boxesdata">
            <div className="data1">
            <div className="tweet">
            <p className='textp' >Add Tweet to Upload in Public Page</p>
            <input style={{cursor:"pointer"}} type="text" name='tweet' id='tweet' placeholder='Tweet' value={tweet} onChange={(e)=>settweet(e.target.value)}/>
            <button style={{cursor:"pointer"}} onClick={tweetUpload}>Upload Tweet</button>
            </div>
            </div>
            <div className="data2 hidden">
            <div className="tweet">
            <p className='textp'>Add Image to Upload in Public Page</p>
            <input style={{cursor:"pointer"}} type="file" name='image' id='image'onChange={handleImageChange}/>
            <input type="text" name="caption" id="caption" placeholder='caption' style={{cursor:"pointer"}} value={imageCaption} onChange={(e)=> setimageCaption(e.target.value)}/>
            <button style={{cursor:"pointer"}} onClick={uploadImage}>Upload Image</button>
            </div>
            </div>
            <div className="data3 hidden">
            <div className="tweet">
            <p className='textp'>Add Video to Upload in Public Page</p>
            <input style={{cursor:"pointer"}} type="file" name='video' id='video' onChange={handleVideoChange}/>
            <input type="text" name="caption" id="caption" placeholder='caption' style={{cursor:"pointer"}} value={videoCaption} onChange={(e)=> setvideoCaption(e.target.value)}/>
            <button style={{cursor:"pointer"}} onClick={uploadVideo}>Upload Video</button>
            </div>
            </div>
            </div>
            <button className='boxdata' onClick={gotoTweet}>Upload Tweet</button> <button className='boxdata' onClick={GotoImage}>Upload Image</button> <button className='boxdata' onClick={gotoVideo}>Upload video</button>
        </div>
      </div>
    </div>
    <RightSidebar/>
    </div>
    </div>
  )
}

export default AddPublicInfo
