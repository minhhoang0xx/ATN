var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
    toys_name:String,   
    toys_year:String,
    toys_country:String,
    toys_price:String,
    toys_gender:String,
    toys_image:String
});

var ToyModels = mongoose.model("toy",ToySchema,"Toys");
module.exports = ToyModels;
