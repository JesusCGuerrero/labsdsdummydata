const db = require('../data/dbConfig')

function getItems() {
    return db('food_item')
}

function getItemById(id) {
    return db('food_item')
        .where({ 'food_item.id': id })
}

function getItemsByCategoryId(id) {
    return db('food_item')
        .where({ 'food_item.category_id': id })
}

function addItem(newItem) {
    return db('food_item').insert(newItem)
}

function updateItem(id, changes) {
    return db('food_item')
    .where({ 'food_item.id': id})
    .update(changes)
}

function removeItem(id) {
    return db('food_item')
        .where('food_item.id', id)
        .del();
}

module.exports = {
    getItems,
    getItemById,
    getItemsByCategoryId,
    addItem,
    updateItem,
    removeItem
}