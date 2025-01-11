const express  =  require("express");

const router  =  express.Router();

const {createProfile} =  require("../controllers/createProfile");
const{login} =  require("../controllers/login")
const{auth} =  require("../middleware/auth")


router.post('/createProfile' ,  createProfile) ;
router.post('/login' , login )


router.get("/auth" ,  auth , (req  , res)=>{

    return res.status(200).json({
        message: "middle ware executed successfully",
      
      })

       
     
})

module.exports = router ;
