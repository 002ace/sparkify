const mongoose =  require("mongoose");

const connectionRequest =  new  mongoose.Schema({
      fromUserId:{
           type:mongoose.Schema.Types.ObjectId,
           required:true,
           ref:'User'

      },
      toUserId:{

            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'

      },

      status:{
          
            type:String,
            enum:['ignore' , 'interested' , 'accepted' , 'rejected'],
            required:true 

      }
},{timestamps:true})

module.exports  =  mongoose.model('Connection' , connectionRequest);