const db = require('../data/dbConfig')

function getCategories() {
    return db('category')
}

function getCategoryById(id) {
    return db('category')
        .where({ 'category.id': id })
}

function getCategoriesByRestaurantId(id) {
    return db('category')
        .where({ 'category.restaurant_id': id })
}

function addCategory(newCategory) {
    return db('category').insert(newCategory)
}

function updateCategory(id, changes) {
    return db('category')
    .where({ 'category.id': id})
    .update(changes)
}

function removeCategory(id) {
    return db('category')
        .where('category.id', id)
        .del();
}

module.exports = {
    getCategories,
    getCategoryById,
    getCategoriesByRestaurantId,
    addCategory,
    updateCategory,
    removeCategory
}