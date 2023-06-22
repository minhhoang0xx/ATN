var mongoose = require('mongoose');
var CusSchema = mongoose.Schema({
     
    Email:String,
    Fullname:String,  
    Address:String,
    Age:String,
    PassWord:String
});

var CusModels = mongoose.model("cus",CusSchema,"Login");
module.exports = CusModels;
