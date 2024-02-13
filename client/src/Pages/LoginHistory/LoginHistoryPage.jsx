import {React,useState,useEffect} from 'react'
import './LoginHistory.css'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import moment from "moment";
const LoginHistoryPage = () => {

const [LoginInfo,setLoginInfo] = useState([]);


//Check user login or not
const User = useSelector((state) => state.currentUserReducer);
const Navigate = useNavigate();

//get Login History
  const GetLoginInfo = async ()=>{
    if (User === null) {
      Navigate("/Auth");
      return alert("Login or Signup to Check Login History");
    }
    else{
    try{
        let email = await User.result.email
        if(email !== ""){
      const data = await fetch(`https://stackbackend-9z32.onrender.com/user/getLoginHistory/${email}`,{
      method:'GET'
      })
        const res = await data.json()
        console.log(res)
        setLoginInfo(res.data);
      }
      else{
      alert("Email Should not be Empty")
      }}
  catch(err){
      console.log(err)
     }
  }}

  useEffect(()=>{
    GetLoginInfo();
  },[])
  return (
    <div>
    <div className='question-details-page'>
      <div className='main-data'>
      <div className="data">
      <h1 style={{marginBottom:"2rem", textAlign:"center"}}>Welcome to the Login History Page!</h1>
      <div className="tweeeet">
      {
  LoginInfo.map((e, index) => {
    return (
      <div className="box1" key={index}>
        <p>Browser -: {e.SystemInfo.userSystemInfo.browser}</p>
        <p>Os -: {e.SystemInfo.userSystemInfo.os}</p>
        <p>Platform -: {e.SystemInfo.userSystemInfo.platform}</p>
        <p>Source -: {e.SystemInfo.userSystemInfo.source}</p>
        <br />
        <p>IP address -: {e.IPAdress}</p>
        
        <p>Login {moment(e.loginAt).fromNow()}</p>
      </div>
    )
  })
}
      </div>
    </div>
    </div>
    </div>
  </div>
  )
}

export default LoginHistoryPage
