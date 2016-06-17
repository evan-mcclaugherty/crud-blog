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
    db.User.get().select().then(person => {
        res.render('create', {
            person: person
        });
    });
});

router.get('/addUser', function(req, res, next) {
    res.render('user');
});

router.post('/addUser', function(req, res, next) {
    db.User.insert({
            name: req.body.name
        })
        .then(() => {
            res.redirect('/')
        })
});

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    Promise.all([
            db.Post.get().where({
                id: id
            }),
            db.User.get().join('post', 'post.user_id', 'person.id').select('person.name').where('post.id', id),
            db.Post.get().join('comment', 'post.id', 'comment.post_id').join('person', 'person.id', 'comment.user_id').select('comment.comment', 'person.name').where('comment.post_id', id),
            db.User.get().select(),
        ])
        .then(data => {
            res.render('details', {
                post: {
                    person: data[1][0].name,
                    id: data[0][0].id,
                    name: data[0][0].name,
                    blog: data[0][0].blog,
                    image: data[0][0].image
                },
                comment: data[2],
                person: data[3]
            });
        })
});

router.post('/comment', (req, res) => {
    db.Comment.insert({
        comment: req.body.comment,
        user_id: req.body.user_id,
        post_id: req.body.id
    }).then(() => {
        res.redirect('/' + req.body.id)
    })
});
router.get('/:id/delete', function(req, res, next) {
    db.Post.delete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
});

router.get('/:id/edit', function(req, res, next) {
    db.Post.get().where({
        id: req.params.id
    }).first().then(post => {
        res.render('edit', {
            post: post
        });
    })
});

router.post('/:id/edit', function(req, res, next) {
    console.log(req.body);
    db.Post.update(req.params.id).update(req.body).then(() => {
        res.redirect('/' + req.params.id);
    })
});

router.post('/create', function(req, res, next) {
    db.Post.insert({
        name: req.body.name,
        blog: req.body.blog,
        image: req.body.image,
        user_id: req.body.id
    }).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        next(error);
    })
})

module.exports = router;
