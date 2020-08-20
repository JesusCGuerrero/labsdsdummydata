const express = require('express');
const db = require('./restaurant-model')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const validateUserId = require('../middleware/validate-user-id')
const validateRestaurant = require('../middleware/validate-restaurant')
const validateRestaurantId = require('../middleware/validate-restaurant-id')

router.get('/', (req, res) => {
    db.getRestaurants()
    .then(restaurant => {
      res.status(200).json({restaurants: restaurant})
    })
    .catch(error => {
      res.status(500).json({message: "Could not retrieve restaurants"})
    })
  });

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.getRestaurantById(id)
    .then(restaurant => {
        if (restaurant.length == 0){
            res.status(500).json({message: "This restaurant does not exist"})
        } else {
            res.status(200).json({restaurant: restaurant})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve restaurant"})
    })
});

router.get('/user/:id', validateUserId, (req, res) => {
    const id = req.params.id
    db.getRestaurantsByUserId(id)
    .then(restaurant => {
        if (restaurant.length == 0){
            res.status(500).json({message: "This restaurant does not exist"})
        } else {
            res.status(200).json({restaurant: restaurant})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve restaurant"})
    })
});

router.post('/user/:id', validateUserId, validateRestaurant, (req, res) => {
    const id = req.params.id
    const newRestaurant = {
        ...req.body,
        user_id: id
    } 
    db.addRestaurant(newRestaurant)
        .then(restaurant => {
        res.status(201).json({restaurant: restaurant})
        })
        .catch(error => {
        res.status(500).json({message: "Could not retrieve data"})
        })
})

router.put('/:id', validateRestaurantId, validateRestaurant, (req, res) => {
    const id = req.params.id
    const updatedRestaurant = {
      ...req.body,
  } 
    db.updateRestaurant(id, updatedRestaurant)
    .then(post => {
      res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: 'The restaurant information could not be modified' })
    })
  
  });

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.removeRestaurant(id)
    .then(restaurant => {
        if (restaurant) {
            res.status(200).json(`succesfully deleted restaurant ${id}`);
        } else {
            res.status(404).json({error: "The restaurant with the specified ID does not exist."})
        }
    })
  });

module.exports = router;