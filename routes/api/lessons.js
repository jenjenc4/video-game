const express = require('express');
const router = express.Router();

const db= require('../../data/mongo');
/* GET users listing. */
router.get('/', function(req, res, next) {
  const info = {
      query:{},
      collection: req.app.locals.collectionLessons
  }

db.readAll(info)
    .then((lessons) => {
        res.json(lessons);
    })
    .catch(err=> {
        console.log(err);
    })
});

router.post('/', function(req,res,next) {
    const info ={
        doc: req.body,
        collection: req.app.locals.collectionLessons
    }
    db.createOne(info)
    .then((data) => {
        res.json (data);
    })
    .catch(err =>{
        console.log(err);
    })
})
router.delete('/:id', function(req,res,next) {
    const info ={
        id: req.params.id,
        collection: req.app.locals.collectionLessons
    }
    db.deleteOne(info)
    .then((data) => {
        res.json ({msg: `deleted ${info.id}` });
    })
    .catch(err =>{
        console.log(err);
    })
})
router.put('/:id', function(req,res,next) {
    const info ={
        id: req.params.id,
        doc:req.body,
        collection: req.app.locals.collectionLessons
    }
    db.replaceOne(info)
    .then((data) => {
        res.json ({msg: `updated ${info.id}`});
    })
    .catch(err =>{
        console.log(err);
    })
})


module.exports = router;