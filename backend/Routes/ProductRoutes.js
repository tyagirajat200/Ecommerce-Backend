var express = require('express')
var router = express.Router()
var Users = require('../Schema/User')
const authChecker = require('../Middleware/Auth')
var Product = require('../Schema/productSchema ')


router.post('/addProduct', (req, res) => {
    var newProduct = new Product(req.body)

    newProduct.save((err, data) => {
        if (!err) {
            return res.json({ msg: "Successfully Added", data: data })
        }
    })
})

// get All PRoducts using category 
router.get('/products/category', (req, res) => {
    var catName = req.query.category
    var search = req.query.search
    let query
    if (catName == 'All Categories') {
        query =  {name: { $regex: '.*' + search + '.*' , $options: 'i' } } 
    }
    else {
        query = { category: catName , name: { $regex: '.*' + search + '.*' , $options: 'i' } }
    }
    Product.find(query).exec((err, data) => {
        if (!err) {
            return res.json({ count: data.length, products: data })
        }
    })
})



//get Single Product
router.get('/products/single/:id', (req, res) => {
    Product.findById(req.params.id).exec((err, data) => {
        if (!err) {
            return res.json(data)
        }
    })
})



//get Products  by Seller ID

router.get('/admin/:id', (req, res) => {
    Product.find({ seller: req.params.id }).exec((err, data) => {
        if (!err)
            res.json(data)
    })
})
//get single admin product 
router.get('/admin/product/:id/:pid', (req, res) => {
    Product.findOne({ seller: req.params.id, _id: req.params.pid }).exec((err, data) => {
        if (!err)
            res.json(data)
    })
})

//delete admin product 
router.delete('/admin/deleteProduct/:id/:pid', (req, res) => {
    Product.findOneAndDelete({ seller: req.params.id, _id: req.params.pid }).exec((err, data) => {
        if (!err)
            res.json(data)
    })
})

router.put('/admin/editProduct/:id/:pid', (req, res) => {
    Product.findOneAndUpdate({ seller: req.params.id, _id: req.params.pid }, req.body, { new: true }).exec((err, data) => {
        if (!err)
            res.json(data)
    })
})

module.exports = router