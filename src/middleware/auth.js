

const JWT  =  require("jsonwebtoken")

exports.auth  = async(req,res,next)=>{
      try
      {
              const{token} =  req.cookies;
              

              if(!token)
              {  
                  return res.status(401).json({
                    message: "token does not exist",
                    
                  })

              }


              try{
                     const decode  =  JWT.verify(token , process.env.JWT_SECRET)

                    req.user  =  decode;

              }
             catch(error)
             {     
                      return res.status(400).json({
                      success:false ,
                     message:"token is invalid "
              })

          }

          next();


      }
      catch(err){

        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"failed to authentication",
            message:err.message,
        })

      }

}