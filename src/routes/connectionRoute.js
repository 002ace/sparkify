const express  =  require('express');
const router  =  express.Router();

const{auth} =  require("../middleware/auth");


const{connection}   =  require("../controllers/connectionApis");


router.post('/send/:status/:toUserId', auth , connection);

module.exports =  router ;