const mongoose = require("mongoose");

const  userSchema =   new mongoose.Schema({
       
        firstName  : {
              type: String,
              required:true ,
              trim:true  
        },
        lastName :{
               type : String ,
               required: true  ,
               trim : true  ,
        },
        email :{
             type : String ,
             required: true  ,
             trim:true  ,
             unique:true  ,
        },
        password:{
             type:String,
             required:true ,
         


        },
        age:{

              type:Number,
              required:true ,
              
        },
        gender:{
            type:String ,
            enum:['male' , 'female' , 'other'],
            required:true 
        },
        imageUrl:{
             type:String,
             trim:true ,

        },
        skills:{
          type:[String],
          trim : true



        },
        about : {
            type : String,
            trim : true ,



        }



        


},{timestamps:true})


module.exports =  mongoose.model("User" , userSchema);