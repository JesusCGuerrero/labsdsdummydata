const db = require('../data/dbConfig')

function getRestaurants() {
    return db('restaurant')
}

function getRestaurantById(id) {
    return db('restaurant')
        .where({ 'restaurant.id': id })
}

function getRestaurantsByUserId(id) {
    return db('restaurant')
        .where({ 'restaurant.user_id': id })
}

function addRestaurant(newRestaurant) {
    return db('restaurant').insert(newRestaurant)
}

function updateRestaurant(id, changes) {
    return db('restaurant')
    .where({ 'restaurant.id': id})
    .update(changes)
}

function removeRestaurant(id) {
    return db('restaurant')
        .where('restaurant.id', id)
        .del();
}

module.exports = {
    getRestaurants,
    getRestaurantById,
    getRestaurantsByUserId,
    addRestaurant,
    updateRestaurant,
    removeRestaurant
}