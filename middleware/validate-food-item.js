const express = require('express');

module.exports = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({message: 'No post data provided!'})
    } else if (!req.body.name && !req.body.price && !req.body.description) {
        res.status(400).json({message: 'Please include a name, price and description for this item.'}).end()
    } else if (!req.body.name && !req.body.price) {
        res.status(400).json({message: 'Please include a name and price for this item.'}).end()
    } else if (!req.body.name && !req.body.description) {
        res.status(400).json({message: 'Please include a name and description for this item.'}).end()
    } else if (!req.body.price && !req.body.description) {
        res.status(400).json({message: 'Please include a price and description for this item.'}).end()
    } else if (!req.body.name) {
        res.status(400).json({message: 'Please include a name for this item.'}).end()
    } else if (!req.body.price) {
        res.status(400).json({message: 'Please include a price for this item.'}).end()
    } else if (!req.body.description) {
        res.status(400).json({message: 'Please include a description for this item.'}).end()
    } else {
        next()
    }
}