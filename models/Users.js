const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');
 


 const UsersSchema = new mongoose.Schema({
   //add requirements


   firstname: {
     type:String,
     default :"",
     trim:true
   },

   lastname:{
     type:String,
     default :"",
     trim:true

   },

   email:{
     type :String,
     required: true,
     default :"",
 

     trim:true
   },


   password:{
     type : String,
     required: true,

   },
   discord :{
       type : String,
       require : true
   },
   img :{
        type : [String],
        default : []
   },
 item :{
     type : [String],
     default : []
 },
 profileImg :{
   type : String,
   default : "https://i.imgur.com/oCi5GCM.png"
 }

 });
 UsersSchema.plugin(timestamp);

 const Users = mongoose.model('Users',UsersSchema);
 module.exports = Users
