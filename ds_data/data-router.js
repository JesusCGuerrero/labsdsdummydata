const express = require('express');
const db = require('./data-model')
const router = express.Router();

router.get('/', (req, res) => {
    db.getData()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  });

module.exports = router;