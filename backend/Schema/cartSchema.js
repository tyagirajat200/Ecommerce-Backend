var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    total:{type: Number, default:0},
    products:[{
        product:{type: Schema.Types.ObjectId, ref:'Product'},
        quantity:{type: Number, default:0},
        price:{type: Number,default:0}
    }]
},{ timestamps: true });
module.exports = mongoose.model('Cart',CartSchema);