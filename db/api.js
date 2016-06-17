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
        },
        update: function(id) {
            return knex.table('post').where({
                id: id
            })
        }
    },
    User: {
        get: function() {
            return knex.table('person').select();
        },
        insert: function(data) {
            return knex.table('person').insert(data);
        },
        delete: function(id) {
            return knex.table('person').where({
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
