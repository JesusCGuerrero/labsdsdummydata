const express = require('express');
const db = require('../food_item/food_item-model')

module.exports = (req, res, next) => {
    const id = req.params.id
    db.getItemById(id)
    .then(item => {
        if(item.length == 0) {
        res.status(404).json({message: "Can not find a item with this ID" })
        } else {
            next()
        }
    })
    .catch(error => {
        res.status(404).json({message: "Can not retrieve data" })
    })
}