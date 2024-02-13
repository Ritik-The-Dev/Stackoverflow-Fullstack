import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './ForgetPass.css'
import icon from "../../assets/icon.png";
import { Link } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";

const ForgetPass = () => {
    const [email,setEmail] = useState('');
    const [otp,setOtp] = useState(null);
    const [password,setpassword] = useState('')
    const [confirmPassword,setconfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleOtpSend = async (e) => {
      e.preventDefault();
      if(email){
        const data = await fetch(`https://stackbackend-9z32.onrender.com/user/sendOtp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Set the content type header to JSON
          },
          body: JSON.stringify({ email })
        })
        const res = await data.json();
        if(res.success === true){
            alert("Otp Sent Successfully")
        }
        else{
            alert("Email do not exists")
        }}
        else{
          alert("Enter Email")
        }
      }

    const handlechangePassword = async (e)=>{
      e.preventDefault();
      if(email,otp,password,confirmPassword){        
        if(password === confirmPassword && password!=="" && confirmPassword!==""){
            const data = await fetch(`https://stackbackend-9z32.onrender.com/user/changePassword`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Set the content type header to JSON
            },
            body: JSON.stringify({ email,otp,newpassword:password })
          })
          const res = await data.json();
          if(res.success === true){
            alert("Password Change Successfully");
            navigate("/Auth");
        }
        else{
            alert("Otp is Expired or Invalid")
        }
        }
        else{
            alert("Password and Confirm Password Do not Match")
        }}
        else{
          alert("All fields are Mandatory")
        }
     }
     
     const showPassword = ()=>{
        let x = document.getElementById("Password");
        if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
    }
    const showConfirmPassword = ()=>{
        let x = document.getElementById("confirmPassword");
        if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
    }
  return (
    <div className='forget'>
        <div className="main">
        <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form>
              <input
              style={{height:"2rem",fontSize:"1rem",paddingLeft:"20px",borderRadius:"5px",border:"2px solid gray"}}
                type="text"
                id="email"
                name="email"
                placeholder='Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button className="auth-btn" onClick={handleOtpSend} style={{marginBottom:"1rem"}}>
            Send Otp
          </button>
          <input
          style={{height:"2rem",fontSize:"1rem",paddingLeft:"20px",borderRadius:"5px",border:"2px solid gray",marginBottom:"1rem"}}
                type="text"
                id="otp"
                name="otp"
                placeholder='otp'
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
              <div className="pass" style={{border:"2px solid gray",borderRadius:"5px",marginBottom:"2rem" }}>
                 <input
                 style={{height:"2rem",fontSize:"1rem",paddingLeft:"20px",width:"89%", border:"none"}}
                type="password"
                id="Password"
                placeholder='Password'
                name="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              /><span onClick={showPassword} style={{cursor:"pointer"}}><FaEyeSlash/></span></div>
              <div className="pass" style={{border:"2px solid gray",borderRadius:"5px",marginBottom:"1rem" }}>
                   <input
                   style={{height:"2rem",fontSize:"1rem",paddingLeft:"20px",width:"89%", border:"none"}}
                type="password"
                id="confirmPassword"
                placeholder='Confirm Password'
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
              /><span onClick={showConfirmPassword} style={{cursor:"pointer"}}><FaEyeSlash/></span></div>
              <Link to={"/auth"} style={{textDecoration:"none", color:"#007ac6"}}>
              <p>Back to Login</p></Link>
        </form>
        <button className="auth-btn" onClick={handlechangePassword}>
            Change Password
          </button>
        </div>
        </div>
    </div>
  )
}

export default ForgetPass


/*        <div className="main">
            <div className="container">
                <h1>Forget Password</h1>
            </div>
            <div className="detailsField">
                    <input type="email" name='email'
                    placeholder='Enter your Email' value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                    <button className='' onClick={handleOtpSend}>Send Otp</button>
                    <br />
                    <input type="otp" name='otp' placeholder='Otp' value={otp} onChange={(e)=>{setOtp(e.target.value)}} />
                    <input type="password" name='password' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                    <input type="confirmPassword" name='confirmPassword' placeholder='confirmPassword' value={confirmPassword} onChange={(e)=>{setconfirmPassword(e.target.value)}} />
                    <br />
                    <button onClick={handlechangePassword}>Verify Otp</button>
            </div>
        </div> */