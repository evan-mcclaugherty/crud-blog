exports.up = function(knex, Promise) {
    return knex.schema.createTable('post', function(table) {
        table.increments();
        table.string('name')
        table.text('blog');
        table.string('image')
        table.integer('user_id').references('user.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('post');
};
