var express = require('express');
const CusModels = require('../models/CusModels');
var router = express.Router();

router.get('/', async(req, res) => {
    const user = await CusModels.find({})
    res.render('manage/customer',{Login:user});
})

router.get('/delete/:id', async (req, res) => {
    await CusModels.findByIdAndDelete(req.params.id)
    res.redirect('/')
});




router.get('/addcustomer', async (req, res) => {
    res.render('manage/addcustomer');
})

router.post('/addcustomer', async (req, res) => {
    var customer = req.body;
    await CusModels.create(customer)
    res.redirect('/');
})

router.get('/editcustomer/:id', async (req, res) => {
    var id = req.params.id
    var customer = await CusModels.findById(id);
    res.render('customer/editcustomer', { customers: customer })
})

router.post('/editcustomer/:id', async (req, res) => {
    var id = req.params.id;
    var customer = req.body;
    await CusModels.findByIdAndUpdate(id, customer);
    res.redirect('/')
})

//search
router.post('/search', async (req, res) => {
    var keyword = req.body.customers_name;
    var customer = await CusModels.find({ customers_name: new RegExp(keyword, "i") })
    res.render('customer/home', { customers: customer })
})

router.get('/sort/low', async (req, res) => {
    var customer = await CusModels.find().sort({ customers_price: 1 })
    res.render('customer/home', { customers: customer })
})

router.get('/sort/hight', async (req, res) => {
    var customer = await CusModels.find().sort({ customers_price: -1 })
    res.render('customer/home', { customers: customer })
})
router.get('/girl', async (req, res) => {
    var customers = await CusModels.find({ customers_gender: {$in:['girl','unisex']}});
    res.render('customer/home', { customers: customers });
})

router.get('/boy', async (req, res) => {
    var customers = await CusModels.find({ customers_gender: {$in:['boy','unisex']}});
    res.render('customer/home', { customers: customers });
})

router.get('/index', async (req, res) => {
    var customers = await CusModels.find({});
    res.render('customer/index',{customers:customers});
})

module.exports = router;
