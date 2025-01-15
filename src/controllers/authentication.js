const User  = require("../Model/User");
const  {z} =  require("zod");
const bcrypt  =  require("bcrypt") ;
require("dotenv").config();
const JWT =  require("jsonwebtoken");


exports.createProfile  = async(req ,  res)=>{

        try{

            const requiredBody  =  z.object({
                  email : z.string().min(3).max(100).email(),
                  firstName : z.string().min(3).max(100),
                  lastName:z.string().min(3).max(100),
                  age :  z.number().min(18).max(50),
                  gender : z.enum(["male", "female", "other"]),
                  password:z.string().min(4).max(50),
                  skills: z.array(z.string()).optional(),
                  about: z.string().optional(),
                  
            }).strict();

            const  parsedDataWithSuccess =  requiredBody.safeParse(req.body)

            if(!parsedDataWithSuccess.success)
            {
                  return res.status(400).json({
                    message: "Incorrect format",
                    error: parsedDataWithSuccess.error,
                  })
            }

            const {firstName  ,  lastName  , age  , email , password ,  gender , skills , about}  = parsedDataWithSuccess.data

            let hashPassword =  await bcrypt.hash(password , 10 )
             

             const user  = await User.create({firstName  ,  lastName  , age  , email , password:hashPassword ,  gender , skills: skills || [] ,  about: about || ""});

            return res.status(200).json({
                message: "Profile created successfully",
                user
              })


        }
        catch(error)
        {  
            return res.status(400).json({
                message: "failed to create profile",
                error: error.message,
              })

        }

       
       
}



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
                   id : user.id,
                   firstName: user.firstName,
                   lastName: user.lastName,
                   age: user.age,
                   gender: user.gender,
                   skills: user.skills,
                   about: user.about,
                  
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




//logout
exports.logout   = async(req,res)=>{
      try{  
            

            const option = {
                  expires : new Date( Date.now() ),
           
            }
            res.cookie('token' , null , option).status(200).json({
                  success:true,
                  message:"user logedout in successfully"
              })

              
      }
      catch(error)
      {  
          return res.status(400).json({
              message: "failed to  log out",
              error: error.message,
            })

      }
}
