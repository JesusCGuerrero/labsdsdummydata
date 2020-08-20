const express = require('express');

module.exports = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({message: 'No post data provided!'})
    } else if (!req.body.url) {
        res.status(400).json({message: 'Please include a URL for this image.'}).end()
    } else {
        next()
    }
}