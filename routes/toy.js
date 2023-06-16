var express = require('express');
const ToyModels = require('../models/toyModels');
var router = express.Router();

router.get('/', async (req, res) => {
    var toy = await ToyModels.find({})
    res.render('toy/home',{Toys:toy})
});
router.get('/delete/:id', async (req, res) => {
    await ToysModels.findByIdAndDelete(req.params.id)
    res.redirect('/toy')
});

router.get('/list', async (req, res) => {
    var toy = await ToysModels.find({})
    res.render('toy/list', { Toys: toy })
});

router.post('/rent', async (req, res) => {
    var id = req.body.id;
    var toy = await ToysModels.findById(id);
    res.render('toy/rent', { Toys: toy });
})
router.get('/add',async (req, res) => {
    res.render('toy/add');
})

router.post('/add', async (req,res) =>{
var toy = req.body;
await ToysModels.create(toy)
.then(() => {console.log('Add success')});
res.redirect('/toy');
})

router.get('/edit/:id', async (req, res) =>{
    var id = req.params.id
    var toy =await ToysModels.findById(id);
    res.render('toy/edit',{Toys:toy})
})

router.post('/edit/:id', async (req, res) => {
    await ToysModels.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/toy')
})

//search
router.post('/search',async (req,res)=>{
    var keyword = req.body.name;
    var toy = await ToysModels.find({name:new RegExp(keyword,"i")})
    res.render('toy/list', {Toys:toy})
})

//sort

//sort function
router.get('/sort/asc', async (req, res) => {
    var toy = await ToysModels.find().sort({ name: 1 })
    res.render('toy/list', { Toys: toy })
 })
 
 router.get('/sort/dsc', async (req, res) => {
    var toy = await ToysModels.find().sort({ name: -1 })
    res.render('toy/list', { Toys: toy })
 })
 
 module.exports = router;