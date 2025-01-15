const express =    require("express");

const router  =  express.Router();


const {freindListDetails  , feedApi  , requestReceived}   = require("../controllers/userProfile");
const{auth} =  require("../middleware/auth")


router.get('/freindlist' , auth , freindListDetails);
router.get('/feedapi' , auth , feedApi);
router.get('/requestreceived' ,  auth  , requestReceived)



module.exports   =  router;