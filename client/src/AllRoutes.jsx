import React from "react";
import { Routes, Route } from "react-router-dom";
import VideoPlayer from "./Pages/DisplayPublicInfo/VideoPlayer";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Questions from "./Pages/Questions/Questions";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";
import ForgetPass from "./Pages/ForgetPassword/ForgetPass";
import AddPublicInfo from "./Pages/AddPublicInfo/AddPublicInfo";
import DisplayPublic from "./Pages/DisplayPublicInfo/DisplayPublic";
import LoginHistory from "./Pages/LoginHistory/LoginHistory";

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Forget-Password" element={<ForgetPass />} />
      <Route path="/AddPublicInfo" element={<AddPublicInfo slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
      <Route path="/DisplayPublic" element={<DisplayPublic slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
      <Route path="/VideoPlayer/:videoUrl" element={<VideoPlayer slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/Login-History" element={<LoginHistory slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
    </Routes>
  );
};

export default AllRoutes;
