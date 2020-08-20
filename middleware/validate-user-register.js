const express = require('express');

module.exports = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({message: 'No post data provided!'})
    } else if (!req.body.username && !req.body.password && !req.body.email) {
        res.status(400).json({message: 'Please include a username, password and email for the user.'}).end()
    } else if (!req.body.username && !req.body.password) {
        res.status(400).json({message: 'Please include a username and password for the user.'}).end()
    } else if (!req.body.username && !req.body.email) {
        res.status(400).json({message: 'Please include a username and email for the user.'}).end()
    } else if (!req.body.password && !req.body.email) {
        res.status(400).json({message: 'Please include a password and email for the user.'}).end()
    } else if (!req.body.username) {
        res.status(400).json({message: 'Please include a username.'}).end()
    } else if (!req.body.password) {
        res.status(400).json({message: 'Please include a password.'}).end()
    } else if (!req.body.email) {
        res.status(400).json({message: 'Please include an email.'}).end()
    } else {
        next()
    }
}