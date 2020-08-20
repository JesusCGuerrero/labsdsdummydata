const express = require('express');
const db = require('./food_item-model')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const validateCategoryId = require('../middleware/validate-category-id')
const validateItem = require('../middleware/validate-food-item')
const validateItemId = require('../middleware/validate-food-item-id')

router.get('/', (req, res) => {
    db.getItems()
    .then(item => {
      res.status(200).json({items: item})
    })
    .catch(error => {
      res.status(500).json({message: "Could not retrieve items"})
    })
  });

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.getItemById(id)
    .then(item => {
        if (item.length == 0){
            res.status(500).json({message: "This item does not exist"})
        } else {
            res.status(200).json({item: item})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve item"})
    })
});

router.get('/category/:id', validateCategoryId, (req, res) => {
    const id = req.params.id
    db.getItemsByCategoryId(id)
    .then(item => {
        if (item.length == 0){
            res.status(500).json({message: "Category has no items"})
        } else {
            res.status(200).json({items: item})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve data"})
    })
});

router.post('/category/:id', validateCategoryId, validateItem, (req, res) => {
    const id = req.params.id
    const newItem = {
        ...req.body,
        category_id: id
    } 
    db.addItem(newItem)
    .then(item => {
        res.status(201).json({item: item})
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve data"})
    })
})

router.put('/:id', validateItemId, validateItem, (req, res) => {
    const id = req.params.id
    const updatedItem = {
      ...req.body,
  } 
    db.updateItem(id, updatedItem)
    .then(post => {
      res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: 'The item information could not be modified' })
    })
  });

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.removeItem(id)
    .then(item => {
        if (item) {
            res.status(200).json(`succesfully deleted item ${id}`);
        } else {
            res.status(404).json({error: "The item with the specified ID does not exist."})
        }
    })
  });

module.exports = router;