const Connection =  require("../Model/Connection");
const {z} =  require('zod')
const User  =  require("../Model/User");



//connection

exports.connection =  async(req , res) =>{
   
       try{
              const   fromUserId  =  req.user.id;
              const toUserId =  req.params.toUserId;

              const finDetails =  await User.findById(toUserId);

              if(!finDetails)
              {  
                  return res.status(400).json({
                    message: "user doesnot exist",
                    
                  })

              }


              if(fromUserId === toUserId)
              {   
                  return res.status(400).json({
                    message: "Cannot send request ",
                    
                  })

              }
             

              const statusSchema = z.enum(['interested', 'ignore']);
              const status =  req.params.status ;
              const validation  =   statusSchema.safeParse(status);

              if(!validation.success)
              {
                   return res.status(400).json({
                    message: "Incorrect format",
                    error: validation.error,
                  })
              }

              
               
              const findUserDetails   =  await Connection.findOne({$or:[{fromUserId , toUserId} , {fromUserId:toUserId , toUserId:fromUserId}]});

              if(findUserDetails)
              {  
                   return res.status(400).json({
                    message: "Connection is already exist",
                  })
                   
              }


              const user  =  await Connection.create({fromUserId , toUserId , status})

              return res.status(200).json({
                message: "Connection created successfully",
                user
              })



       }
       catch(error)
       {  
           return res.status(400).json({
               message: "failed to create connection",
               error: error.message,
             })

       }



}


//accepted or rejected  

exports.accepteOrReject  =  async(req, res)=>{

      try
      {  
                const loginUser =  req.user ;
                const{status  , requestId } =  req.params ;

                console.log("app chal rahe ho ya nhi")

                const  findDetails = await Connection.findById(requestId);

                if(!findDetails)
                {
                      res.status(400).json({
                            
                           message : "data not present with id"
                      })
                }

                if(loginUser.id === findDetails.toUserId)
                {
                      res.status(400).json({
                            
                        message : "Canc not send  request"
                   })
                }


                const statusSchema  =  z.enum(['accepted' , 'rejected']);

                const validate  =  statusSchema.safeParse(status);

                if(!validate.success)
                {
                       return res.status(400).json({
                         message: "Incorrect format",
                          error: validate.error,
                       })
                }


                const  connectionRequest  =  await  Connection.findOneAndUpdate({
                                              
                                              _id : requestId,
                                              toUserId:loginUser.id,
                                              status:"interested"
                                              // status: { $in: ["interested"] }, 
                                              // {status : status}

                                           } ,  {status : status} , {new :  true} )
                if(!connectionRequest)
                {
                       return res.status(400).json({
                             message : "connection request not found",
                       })
                }

               

                return res.status(200).json({
                     message:"connection updated succesfully",

                      
                })

      }
      catch(error)
      {  
          return res.status(400).json({
              message: "failed to update connection",
              error: error.message,
            })

      }

   
}
