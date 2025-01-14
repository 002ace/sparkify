

const Connection =  require("../Model/Connection");
const User  =  require("../Model/User")


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




//feed api 

exports.feedApi  =  async(req, res) =>{
        try
        {    
                const  logedInUserId =  req.user.id ;
                const  page =  parseInt(req.params.page) || 1;
                const limit  =  parseInt(req.params.limit) || 10 ;

                limit  =  limit>50 ? 50 : limit;
                const skip =  (page-1)*limit;

                const findfeed =  await  Connection.find({$or:[{fromUserId:logedInUserId} , {toUserId:logedInUserId}]}).select("fromUserId" , "logedInUserId");

                const hideUserFromFeed  =  new Set();

                findfeed.forEach((req)=>{
                      hideUserFromFeed.add(req.fromUserId.toString());
                      hideUserFromFeed.add(req.toUserId.toString());
                })


                const feedResult  =  await User.find({$and:[
                                              
                                         {_id : {$nin : Array.from(hideUserFromFeed)}},
                                         {_id : {$ne : logedInUserId}}

                                     ]}).skip(skip).limit(limit);

                return  res.status(200).json({
                    
                         message:"feed result",
                         data:feedResult
                        
                    
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