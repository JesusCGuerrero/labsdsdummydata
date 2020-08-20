const express = require('express');
const db = require('./food_image-model')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const validateItemId = require('../middleware/validate-food-item-id')
const validateImageId = require('../middleware/validate-food-image-id')
const validateImage = require('../middleware/validate-food-image')


router.get('/', (req, res) => {
    db.getImages()
    .then(image => {
      res.status(200).json({images: image})
    })
    .catch(error => {
      res.status(500).json({message: "Could not retrieve images"})
    })
  });

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.getImageById(id)
    .then(image => {
        if (image.length == 0){
            res.status(500).json({message: "This image does not exist"})
        } else {
            res.status(200).json({image: image})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve image"})
    })
});

router.get('/item/:id', validateItemId, (req, res) => {
    const id = req.params.id
    db.getImagesByItemId(id)
    .then(image => {
        if (image.length == 0){
            res.status(500).json({message: "Item has no image"})
        } else {
            res.status(200).json({image: image})
        }
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve data"})
    })
});

router.post('/item/:id', validateItemId, validateImage, (req, res) => {
    const id = req.params.id
    const newImage = {
        ...req.body,
        food_item_id: id
    } 
    db.addImage(newImage)
    .then(image => {
        res.status(201).json({image: image})
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve data"})
    })
})

router.put('/:id', validateImageId, validateImage, (req, res) => {
    const id = req.params.id
    const updatedImage = {
      ...req.body,
  } 
    db.updateImage(id, updatedImage)
    .then(post => {
      res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: 'The image information could not be modified' })
    })
  });

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.removeImage(id)
    .then(image => {
        if (image) {
            res.status(200).json(`succesfully deleted image ${id}`);
        } else {
            res.status(404).json({error: "The image with the specified ID does not exist."})
        }
    })
  });

module.exports = router;