const User  =  require("../Model/User");
const  {z} =  require("zod");
const bcrypt  =  require("bcrypt") ;

exports.createProfile  = async(req ,  res)=>{

        try{

            const requiredBody  =  z.object({
                  email : z.string().min(3).max(100).email(),
                  firstName : z.string().min(3).max(100),
                  lastName:z.string().min(3).max(100),
                  age :  z.number().min(18).max(50),
                  gender : z.enum(["male", "female", "other"]),
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

            const {firstName  ,  lastName  , age  , email , password ,  gender}  = parsedDataWithSuccess.data

            let hashPassword =  await bcrypt.hash(password , 10 )
             

             const user  = await User.create({firstName  ,  lastName  , age  , email , password:hashPassword ,  gender})

            return res.status(200).json({
                message: "Profile created successfully",
                user
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




