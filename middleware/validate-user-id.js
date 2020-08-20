const express = require('express');
const db = require('../user/user-model')

module.exports = (req, res, next) => {
    const id = req.params.id
    db.getUserById(id)
    .then(user => {
        if(user.length == 0) {
        res.status(404).json({message: "Can not find a user with this ID" })
        } else {
            next()
        }
    })
    .catch(error => {
        res.status(404).json({message: "Can not retrieve data" })
    })
}