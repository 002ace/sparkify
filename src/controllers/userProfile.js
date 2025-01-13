
const Connection =  require("../Model/Connection");


exports.requestReceived  =  async(req  , res) =>{
      try{
           
              const logedInUserId  =  req.user.id;

              const freindListDetails =  await Connection.find({toUserId:logedInUserId,
                                                     status:"interested"
                                                 }).populate("fromUserId" , ["firstName" , "lastName"])

             return res.status(200).json({
                  message:"detailsed fetch succeessfully",
                  freindListDetails
             })

      }
      catch(error)
      {  
          return res.status(400).json({
              message: "failed to  get details",
              error: error.message,
            })

      }
}



exports.freindListDetails = async(req,res) =>{
       try
       {  

               const logedInUserId =  req.user.id ;
               
               const freindList   =  await Connection.find({$or:[{fromUserId:logedInUserId , status:'accepted'} , {toUserId:logedInUserId , status:'accepted'}]});

               return res.status(200).json({
                   
                     message:"freind list details",
                     data:freindList

               }).populate("fromUserId" , "toUserId", ["firstName" , "LastName"])
 
       }
       catch(error)
       {  
           return res.status(400).json({
               message: "failed to  get details",
               error: error.message,
             })
 
       }
}