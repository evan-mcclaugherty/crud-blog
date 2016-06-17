exports.up = function(knex, Promise) {
    return knex.raw('ALTER TABLE person ALTER COLUMN name SET NOT NULL')
};

exports.down = function(knex, Promise) {
    return knex.raw('ALTER TABLE person ALTER COLUMN name DROP NOT NULL')
};
