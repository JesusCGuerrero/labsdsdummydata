const express = require('express');
const db = require('../restaurant/restaurant-model')

module.exports = (req, res, next) => {
    const id = req.params.id
    db.getRestaurantById(id)
    .then(restaurant => {
        if(restaurant.length == 0) {
        res.status(404).json({message: "Can not find a restaurant with this ID" })
        } else {
            next()
        }
    })
    .catch(error => {
        res.status(404).json({message: "Can not retrieve data" })
    })
}