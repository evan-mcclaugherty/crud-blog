exports.up = function(knex, Promise) {
    return Promise.all([
        knex.raw('ALTER TABLE comment ALTER COLUMN comment SET NOT NULL'),
        knex.raw('ALTER TABLE post ALTER COLUMN name SET NOT NULL'),
        knex.raw('ALTER TABLE post ALTER COLUMN blog SET NOT NULL'),
        knex.raw('ALTER TABLE post ALTER COLUMN image SET NOT NULL'),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.raw('ALTER TABLE comment ALTER COLUMN comment DROP NOT NULL'),
        knex.raw('ALTER TABLE post ALTER COLUMN name DROP NOT NULL'),
        knex.raw('ALTER TABLE post ALTER COLUMN blog DROP NOT NULL'),
        knex.raw('ALTER TABLE post ALTER COLUMN image DROP NOT NULL'),
    ])
};
