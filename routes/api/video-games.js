const express = require('express');
const router = express.Router();

const db= require('../../data/mongo');
/* GET users listing. */
router.get('/', function(req, res, next) {
  const info = {
      query:{},
      collection: req.app.locals.collectionVideoGames
  }

db.readAll(info)
    .then((videoGames) => {
        res.json(videoGames);
    })
    .catch(err=> {
        console.log(err);
    })
});

router.post('/', function(req,res,next) {
    const info ={
        doc: req.body,
        collection: req.app.locals.collectionVideoGames
    }
    db.createOne(info)
    .then((data) => {
        res.json (data);
    })
    .catch(err =>{
        console.log(err);
    })
})


module.exports = router;