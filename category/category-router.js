const express = require('express');
const db = require('./category-model')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const validateCategoryId = require('../middleware/validate-category-id')
const validateCategory = require('../middleware/validate-category')
const validateRestaurantId = require('../middleware/validate-restaurant-id')

router.get('/', (req, res) => {
    db.getCategories()
    .then(category => {
      res.status(200).json({categories: category})
    })
    .catch(error => {
      res.status(500).json({message: "Could not retrieve categories"})
    })
  });

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.getCategoryById(id)
    .then(category => {
        if (category.length == 0){
            res.status(500).json({message: "This category does not exist"})
        } else {
            res.status(200).json({category: category})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve category"})
    })
});

router.get('/restaurant/:id', validateRestaurantId, (req, res) => {
    const id = req.params.id
    db.getCategoriesByRestaurantId(id)
    .then(category => {
        if (category.length == 0){
            res.status(500).json({message: "Restaurant has no categories"})
        } else {
            res.status(200).json({category: category})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve data"})
    })
});

router.post('/restaurant/:id',  validateRestaurantId, validateCategory, (req, res) => {
    const id = req.params.id
    const newCategory = {
        ...req.body,
        restaurant_id: id
    } 
    db.addCategory(newCategory)
    .then(category => {
        res.status(201).json({category: category})
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve data"})
    })
})

router.put('/:id', validateCategoryId, validateCategory, (req, res) => {
    const id = req.params.id
    const updatedCategory = {
      ...req.body,
  } 
    db.updateCategory(id, updatedCategory)
    .then(post => {
      res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: 'The category information could not be modified' })
    })
  });

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.removeCategory(id)
    .then(category => {
        if (category) {
            res.status(200).json(`succesfully deleted category ${id}`);
        } else {
            res.status(404).json({error: "The category with the specified ID does not exist."})
        }
    })
  });

module.exports = router;