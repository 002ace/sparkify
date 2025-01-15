const express  =  require('express');
const router  =  express.Router();

const{auth} =  require("../middleware/auth");


const{connection ,  accepteOrReject}   =  require("../controllers/connectionApis");


router.post('/send/:status/:toUserId', auth , connection);

router.post('/status/:status/:requestId' ,  auth , accepteOrReject )

module.exports =  router ;