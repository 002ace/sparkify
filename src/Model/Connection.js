const mongoose =  require("mongoose");

const connectionRequest =  new  mongoose.Schema({
      fromUserId:{
           type:mongoose.Schema.Types.ObjectId,
           required:true,

      },
      toUserId:{

            type:mongoose.Schema.Types.ObjectId,
            required:true,

      },

      status:{
          
            type:String,
            enum:['igonore' , 'interested' , 'accepted' , 'rejected'],
            required:true 

      }
},{timestamps:true})

module.exports  =  mongoose.model('Connection' , connectionRequest);