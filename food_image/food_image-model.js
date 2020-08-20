const db = require('../data/dbConfig')

function getImages() {
    return db('food_image')
}

function getImageById(id) {
    return db('food_image')
        .where({ 'food_image.id': id })
}

function getImagesByItemId(id) {
    return db('food_image')
        .where({ 'food_image.food_item_id': id })
}

function addImage(newImage) {
    return db('food_image').insert(newImage)
}

function updateImage(id, changes) {
    return db('food_image')
    .where({ 'food_image.id': id})
    .update(changes)
}

function removeImage(id) {
    return db('food_image')
        .where('food_image.id', id)
        .del();
}

module.exports = {
    getImages,
    getImageById,
    getImagesByItemId,
    addImage,
    updateImage,
    removeImage
}