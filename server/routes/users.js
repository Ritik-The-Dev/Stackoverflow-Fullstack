import express from "express";

import 
    { login, signup 
    ,sendOtp,changePassword
    ,AddImage,AddVideo,Addtweet
    ,getTweet,getImage,getVideo,
    getLoginHistory}
     from "../controllers/auth.js";


import { getAllUsers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp",sendOtp);
router.post("/changePassword",changePassword);
router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);
router.post("/AddTweet",Addtweet);
router.get("/getTweet",getTweet);
router.post("/AddVideo",AddVideo)
router.get("/getVideo",getVideo)
router.post("/AddImage",AddImage);
router.get("/getImage",getImage);
router.get("/getLoginHistory/:email",getLoginHistory);

export default router;
