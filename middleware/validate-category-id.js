const express = require('express');
const db = require('../category/category-model')

module.exports = (req, res, next) => {
    const id = req.params.id
    db.getCategoryById(id)
    .then(category => {
        if(category.length == 0) {
        res.status(404).json({message: "Can not find a category with this ID" })
        } else {
            next()
        }
    })
    .catch(error => {
        res.status(404).json({message: "Can not retrieve data" })
    })
}