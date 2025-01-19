const express  =  require("express");

const router  =  express.Router();

const{auth}   =  require("../middleware/auth")
const{getProfile ,updateProfile , deleteProfile  } = require("../controllers/profileApis")


router.get("/getprofile" ,  auth , getProfile)


router.patch('/updateprofile' , auth , updateProfile );
router.post('/deleteprofile' , auth ,deleteProfile )

module.exports = router ;
