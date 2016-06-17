var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
/* GET home page. */
router.get('/', function(req, res, next) {
    db.Post.get().then(post => {
        res.render('index', {
            post: post
        });
    });
});

router.get('/create', function(req, res, next) {
    res.render('create');
});

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    Promise.all([
            db.Post.get().where({
                id: id
            }),
            db.Comment.get().where({
                post_id: id
            }).select('comment'),
        ])
        .then(data => {
            console.log(data);
            res.render('details', {
                data: data[1]
            });
        })
});

router.get('/:id/delete', function(req, res, next) {
    knex.table('sandwiches').where({
        id: req.params.id
    }).del().then(() => {
        res.redirect('/');
    })
});

router.get('/:id/edit', function(req, res, next) {
    knex.table('sandwiches').where({
        id: req.params.id
    }).first().then(sandwich => {
        res.render('edit', {
            sandwich: sandwich
        });
    })
});

router.post('/:id/edit', function(req, res, next) {
    console.log(req.body);
    knex.table('sandwiches').where({
        id: req.params.id
    }).update(req.body).then(() => {
        res.redirect('/' + req.params.id);
    })
});

router.post('/create', function(req, res, next) {
    db.Post.insert({
        name: req.body.name,
        blog: req.body.blog,
        image: req.body.image
    }).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        next(error);
    })
})

module.exports = router;
