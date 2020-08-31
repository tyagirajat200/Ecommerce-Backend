var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        default: "Pending"
    },
    products: [{
        incart: Number,
        _id: { type: Schema.Types.ObjectId, ref: 'Product' }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    billing :{
        type:Object , 
        required : true
    }
},{ timestamps: true });
module.exports = mongoose.model('Order', OrderSchema);