var express = require('express');
var router = express.Router();
// var knex = require('../db/knex');
// var db = require('../db/api');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user');
});

router.post('/', function(req, res, next) {
    db.User.insert({
            name: req.body.name
        })
        .then(() => {
            res.redirect('/')
        })
});

module.exports = router;
