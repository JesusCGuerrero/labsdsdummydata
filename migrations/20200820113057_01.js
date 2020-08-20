exports.up = function(knex) {
    return knex.schema

    .createTable('ds_string', ds_string => {
        ds_string.increments();
        ds_string.json('data')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('ds_string')
};