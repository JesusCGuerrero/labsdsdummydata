exports.up = function(knex) {
    return knex.schema

    .createTable('user', user => {
        user.increments()
            // .onDelete('CASCADE');
        user.string('email', 40)
            .notNullable()
            .unique();
        user.string('username', 32)
            .notNullable()
            .unique();
        user.string('password')
            .notNullable();
    })

    .createTable('restaurant', restaurant => {
        restaurant.increments();
        restaurant.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user.id')
        restaurant.string('name', 64)
            .notNullable()
        restaurant.string('location', 64)
            .notNullable()
    })

    .createTable('category', category => {
        category.increments();
        category.integer('restaurant_id')
            .unsigned()
            .notNullable()
            .references('restaurant.id')
        category.string('name', 64)
            .notNullable()
    })

    .createTable('food_item', food_item => {
        food_item.increments();
        food_item.integer('category_id')
            .unsigned()
            .notNullable()
            .references('category.id')
        food_item.string('name', 64)
            .notNullable()
        food_item.integer('price')
            .notNullable()
        food_item.string('description', 500)
            .notNullable()
    })

    .createTable('food_image', food_image => {
        food_image.increments();
        food_image.integer('food_item_id')
            .unsigned()
            .notNullable()
            .references('food_item.id')
        food_image.string('url', 1000)
            .notNullable()
    })

    .createTable('ds_string', ds_string => {
        ds_string.increments();
        ds_string.string('data')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('user')
        .dropTableIfExists('restaurant')
        .dropTableIfExists('category')
        .dropTableIfExists('food_item')
        .dropTableIfExists('food_image')
};