const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  console.log('before router.get / find')
  User
    .find()
    .then(users => {
      res.status(200).json(users);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(`user id is ${id}`);
  User
    .findById(id)
    .then(userById => {
      if(userById) {
        res.status(200).json(userById);
      } else {
        res.status(404).send('*** user not in database');
      }
    });
});

router.post('/', (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })

  user
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(201).json(user);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  User
    .findByIdAndUpdate(id, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }
    })
    .then(updatedUser => {
      res.status(204).json(updatedUser);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  User
    .findByIdAndRemove(id)
    .then(removedUser => {
      res.status(200).json(removedUser);
    });
});

module.exports = router;
