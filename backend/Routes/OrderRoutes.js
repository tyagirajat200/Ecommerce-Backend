var express = require('express')
var router = express.Router()
var Users = require('../Schema/User')
const authChecker = require('../Middleware/Auth')
var Order = require('../Schema/orderSchema')
var Product = require('../Schema/productSchema ')
var stripe = require('stripe')('sk_test_51HJN0kCXBMTo72p9Cx9EY9SXkNtUOEUBHrJLnfZBIvmXJ6CrSKXPGJc2KVsg7yhB3I1fD2l7K0iinHcilhmBZzFT001hOOSj6l');

// Payment Gateway
router.post('/payment', (req, res) => {
    stripe.charges.create({
        amount: parseInt(req.body.cartTotal) * 100,
        currency: 'INR',
        source: req.body.token,
        description: 'Software'
    }, (err, charge) => {
        if (err) {
            console.log(err);
            var newOrder = new Order({
                userId: req.body.myID,
                status: 'Failed',
                products: req.body.products,
                totalAmount: req.body.cartTotal,
                billing: req.body.billing
            })
            newOrder.save((err, data) => {
                res.status(200).json({ success: false });
            })

        }
        else
            res.status(200).json({ success: true });
    });
});

router.post('/new', async (req, res) => {
    var userId = req.body.myID;
    var products = req.body.products
    var totalAmount = parseInt(req.body.totalAmount)
    var newOrder = new Order({
        userId: userId,
        status: 'Placed',
        products: products,
        totalAmount: totalAmount,
        billing: req.body.billing,
    })

    newOrder.save((err, data) => {
        res.json({
            message: `Order successfully placed with order id ${data._id}`,
            success: true,
            order_id: data._id,
            products: products
        })
    })

});

//getSingleOrderThankyou
router.get('/:id', (req, res) => {
    console.log((req.params.id))
    Order.findById(req.params.id)
        .populate('products._id')
        .exec((err, data) => {
            res.json(data.products)
        })
})

//getSingleOrder OrderDetails
router.get('/orderDetails/:id', (req, res) => {
    Order.findById(req.params.id)
        .populate('products._id')
        .exec((err, data) => {
            res.json(data)
        })
})


//getAllOrder
router.get('/myOrders/:id', (req, res) => {
    Order.find({ userId: req.params.id })
        .populate('products._id')
        .exec((err, data) => {
            res.json({ data })
        })
})


module.exports = router