const express = require('express');
const db = require('../food_image/food_image-model')

module.exports = (req, res, next) => {
    const id = req.params.id
    db.getImageById(id)
    .then(image => {
        if(image.length == 0) {
        res.status(404).json({message: "Can not find a image with this ID" })
        } else {
            next()
        }
    })
    .catch(error => {
        res.status(404).json({message: "Can not retrieve data" })
    })
}