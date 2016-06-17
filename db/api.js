var knex = require('./knex');

module.exports = {
    Post: {
        get: function() {
            return knex.table('post').select();
        },
        insert: function(data) {
            return knex.table('post').insert(data);
        },
        delete: function(id) {
            return knex.table('post').where({
                id: id
            }).del();
        }
    },
    User: {
        get: function() {
            return knex.table('user').select();
        },
        insert: function(data) {
            return knex.table('user').insert(data);
        },
        delete: function(id) {
            return knex.table('user').where({
                id: id
            }).del();
        }
    },
    Comment: {
        get: function() {
            return knex.table('comment').select();
        },
        insert: function(data) {
            return knex.table('comment').insert(data);
        },
        delete: function(id) {
            return knex.table('comment').where({
                id: id
            }).del();
        }
    }
}
