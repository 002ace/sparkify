const express  =  require("express");
const router =  express.Router();

const{createProfile , login , logout}  =   require("../controllers/authentication");


router.post('/signup' , createProfile);

router.post('/login' , login);


router.post('/logout'  , logout);


module.exports =  router;
