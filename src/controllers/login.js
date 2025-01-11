const  bcrypt =  require("bcrypt");
const User  =  require("../Model/User");
const  JWT =  require("jsonwebtoken");
const {z}  =  require("zod")
require("dotenv").config();


exports.login =  async(req, res) =>{

       try
       {
            const requiredBody  =  z.object({
                email : z.string().min(3).max(100).email(),   
                password:z.string().min(6).max(50),
            }).strict();

            const  parsedDataWithSuccess =  requiredBody.safeParse(req.body)
            
            if(!parsedDataWithSuccess.success)
             {
                      return res.status(400).json({
                        message: "Incorrect format",
                        error: parsedDataWithSuccess.error,
                      })
             }
             
             const {email , password}  =  parsedDataWithSuccess.data;
             let user  =  await User.findOne({email});

             if(!user)
             {  
                 return res.status(400).json({
                    message: "User does not exist",
                    
                  })
                   
             }

             const payload = {

                   email : user.email,
                   id : user.id
                  
             }

            console.log(process.env.JWT_SECRET);
             if(await bcrypt.compare(password  , user.password))
             {
                    let token  =  JWT.sign(payload  ,process.env.JWT_SECRET , {expiresIn : "2h"})
                    // localStorage.setItem("token", token);

                    user =  user.toObject();
                    user.token  =  token ;
                    user.password =  undefined  ;


                    const option = {
                        expires : new Date( Date.now() + 3 *24 *60*60*1000),
                        httpOnly : true
                    }

                    res.cookie('token' , token , option).status(200).json({
                        success:true,
                        token,
                        user,
                        message:"user loged in successfully"
                    })



             }
             else
             {        
                 return res.status(400).json({
                     success:false ,
                     message:"password does not match"
                 })
                   
             }

           
              

           

       }
       catch(error)
       {  
           return res.status(400).json({
               message: "Incorrect format",
               error: error.message,
             })

       }


}

