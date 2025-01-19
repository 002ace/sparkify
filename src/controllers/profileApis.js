const {z} =  require("zod");
const  User  =  require("../Model/User");


//get profile 
exports.getProfile   =  async(req, res)=>{

       try
       {  
                const user  =  req.user ;
              
                
                return res.status(200).json({
                    message: "Profile created successfully",
                     data : user
                  })
    
               
       }
       catch(error)
       {  
           return res.status(400).json({
               message: "Incorrect format",
               error: error.message,
             })

       }


}



//update profile 

exports.updateProfile  = async(req ,  res)=>{

        try{
            
           const requiredBody  =  z.object({
                 
                  firstName : z.string().min(3).max(100).optional(),
                  lastName:z.string().min(3).max(100).optional(),
                  age :  z.number().min(18).max(50).optional(),
                  gender : z.enum(["male", "female", "other"]).optional(),
                  skills: z.array(z.string()).optional().optional(),
                  about: z.string().optional().optional(),
                  
            }).strict();

            const userDetails  =   req.user ;
            const userId  =  userDetails.id;

            const  parsedDataWithSuccess =  requiredBody.safeParse(req.body)

            if(!parsedDataWithSuccess.success)
            {
                  return res.status(400).json({
                    message: "Incorrect format",
                    error: parsedDataWithSuccess.error,
                  })
            }

            const {firstName  ,  lastName  , age   ,  gender , skills , about}  = parsedDataWithSuccess.data
               
           

            const updateDetails =  await User.findByIdAndUpdate(userId ,
                                           {firstName:firstName  ,  lastName:lastName  , age:age    ,  gender:gender , skills:skills , about:about},
                                           {new :  true}
                                       )
           

            return res.status(200).json({
                message: "update profile  successfully",
                updateDetails
              })


        }
        catch(error)
        {  
            return res.status(400).json({
                message: "failed to update profile",
                error: error.message,
              })

        }

       
       
}



//delete profile
exports.deleteProfile   =  async(req, res)=>{

        try
        {   
                const userDetail  =  req.user ;
                const userId  =  userDetail.id;


                await User.findByIdAndDelete(userId)

                return res.status(200).json({
                    message: "Delete profile successfully",
                    
                  })



        }

        catch(error)
        {  
            return res.status(400).json({
                message: "failed to update profile",
                error: error.message,
              })

        }
        



}

