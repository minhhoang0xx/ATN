var express = require('express');
const CusModels = require('../models/CusModels');
var router = express.Router();

router.get('/', async(req, res) => {
    var customer = await CusModels.find({})
    res.render('manage/customer',{Login:customer});
});

router.get('/deleteCustomer/:id', async (req, res) => {
    await CusModels.findByIdAndDelete(req.params.id)
    res.redirect('/manage')
});

router.get('/addCustomer', async (req, res) => {
    console.log('asd');
    res.render('manage/addCustomer');
  });

router.post('/addCustomer', async (req, res) => {
    var customer = req.body;
    await CusModels.create(customer)
    res.redirect('/manage');
});

router.get('/editCustomer/:id', async (req, res) => {
    var id = req.params.id
    var customer = await CusModels.findById(id);
    res.render('manage/editcustomer', { Login: customer })
});

router.post('/editCustomer/:id', async (req, res) => {
    var id = req.params.id;
    var customer = req.body;
    await CusModels.findByIdAndUpdate(id, customer);
    res.redirect('/manage')
})

//search
router.post('/searchCustomer', async (req, res) => {
    var keyword = req.body.Fullname;
    var customer = await CusModels.find({ Fullname: new RegExp(keyword, "i") })
    res.render('manage/customer', { Login: customer })
})

router.get('/sort/young', async (req, res) => {
    var customer = await CusModels.find().sort({ Age: 1 })
    res.render('manage/customer', { Login: customer })
})

router.get('/sort/noYoung', async (req, res) => {
    var customer = await CusModels.find().sort({ Age: -1 })
    res.render('manage/customer', { Login: customer })
})

module.exports = router;
