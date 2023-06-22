var express = require('express');
const ToyModels = require('../models/ToyModels');
var router = express.Router();

router.get('/', async (req, res) => {
    var toy = await ToyModels.find({})
    res.render('toy/home', { Toys: toy })
});
router.get('/delete/:id', async (req, res) => {
    await ToyModels.findByIdAndDelete(req.params.id)
    res.redirect('/')
});


router.get('/addToy', async (req, res) => {
    res.render('toy/addToy');
})

router.post('/addToy', async (req, res) => {
    var toy = req.body;
    await ToyModels.create(toy)
    res.redirect('/');
})

router.get('/editToy/:id', async (req, res) => {
    var id = req.params.id
    var toy = await ToyModels.findById(id);
    res.render('toy/editToy', { Toys: toy })
})

router.post('/editToy/:id', async (req, res) => {
    var id = req.params.id;
    var toy = req.body;
    await ToyModels.findByIdAndUpdate(id, toy);
    res.redirect('/')
})

//search
router.post('/search', async (req, res) => {
    var keyword = req.body.toys_name;
    var toy = await ToyModels.find({ toys_name: new RegExp(keyword, "i") })
    res.render('toy/home', { Toys: toy })
})

router.get('/sort/low', async (req, res) => {
    var toy = await ToyModels.find().sort({ toys_price: 1 })
    res.render('toy/home', { Toys: toy })
})

router.get('/sort/hight', async (req, res) => {
    var toy = await ToyModels.find().sort({ toys_price: -1 })
    res.render('toy/home', { Toys: toy })
})
router.get('/girl', async (req, res) => {
    var toys = await ToyModels.find({ toys_gender: {$in:['girl','unisex']}});
    res.render('toy/home', { Toys: toys });
})

router.get('/boy', async (req, res) => {
    var toys = await ToyModels.find({ toys_gender: {$in:['boy','unisex']}});
    res.render('toy/home', { Toys: toys });
})

router.get('/index', async (req, res) => {
    var toys = await ToyModels.find({});
    res.render('toy/index',{Toys:toys});
})


module.exports = router;