var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{ 
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    seller:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{ timestamps: true });


module.exports = mongoose.model('Product',productSchema);