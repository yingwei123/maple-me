const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');
 


 const ListingsSchema = new mongoose.Schema({
   //add requirements

owner :{
    type : String,
    default :""
},
img :{
    type: String,
    default : ""

},
price : {
    type : String,
    default : ""
},
offerby :{
    type : String,
    default : "None"
}, 
autowin :{
    type : String,
    default : ""
}

 });
 ListingsSchema.plugin(timestamp);

 const Listings = mongoose.model('Listings',ListingsSchema);
 module.exports = Listings
