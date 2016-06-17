exports.up = function(knex, Promise) {
    return knex.schema.table('person', function(table) {
        table.unique('name');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('person',
        function(table) {
            table.dropUnique('name');
        });
};
