const express = require('express');
const db = require('./user-model')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const validateUserRegister = require('../middleware/validate-user-register')
const validateUserLogin = require('../middleware/validate-user-login')
const validateUserId = require('../middleware/validate-user-id')

router.get('/', (req, res) => {
    db.getUsers()
    .then(users => {
      res.status(200).json({users: users})
    })
    .catch(error => {
      res.status(500).json({message: "Could not retrieve users"})
    })
  });

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.getUserById(id)
    .then(users => {
        if (users.length == 0){
            res.status(500).json({message: "This user does not exist"})
        } else {
            res.status(200).json({users: users})
        }
        
    })
    .catch(error => {
        res.status(500).json({message: "Could not retrieve user"})
    })
});

router.post('/register', validateUserRegister, (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash;

    db.register(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to register the user. User may already exist.' });
        })
})

router.post('/login', validateUserLogin, (req, res, next) => {
    const {username, password} = req.body
    db.login(username)
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                    res.status(200).json({  user_id: user.id, username: user.username, user_email: user.email, token: token});
                } else if(!user || !bcrypt.compareSync(password, user.password)){
                    res.status(404).json({ message: 'Invalid Credentials' })
                } else {
                    res.status(401).json({ message: 'Could not retrieve data' });
            }
        })
        .catch(err => {
            res.status(500).json({message: "User not found"})
            console.log(err)
        })
})

router.put('/:id', validateUserId, validateUserRegister, (req, res) => {
    const id = req.params.id
    const updatedUser = {
      ...req.body,
  } 
    db.editUser(id, updatedUser)
    .then(post => {
      res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: 'The user information could not be modified' })
    })
  });

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.removeUser(id)
    .then(post => {
        if (post) {
            res.status(200).json(`succesfully deleted user ${id}`);
        } else {
            res.status(404).json({error: "The user with the specified ID does not exist."})
        }
    })
  });

function generateToken(user) {
    const payload = {
        sub: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '8h',
    }
    const token = jwt.sign(payload, secrets.jwtSecret, options)
    return token
}

module.exports = router;