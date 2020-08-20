const express = require('express');

module.exports = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({message: 'No post data provided!'})
    } else if (!req.body.name) {
        res.status(400).json({message: 'Please include a name for the category.'}).end()
    } else {
        next()
    }
}