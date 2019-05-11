const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
  console.log('before router.get / find')
  Blog
    .find()
    .then(users => {
      res.status(200).json(users);
    });
});

router.get('/featured', (req, res) => {
  Blog
    .where('featured').eq(true)
    .then(featured => {
      if(featured) {
        res.status(200).json(featured);
      } else {
        res.status(404).send('*** no featured in database');
      }
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(`blog id is ${id}`);
  Blog
    .findById(id)
    .then(blogByID => {
      if(blogByID) {
        res.status(200).json(blogByID);
      } else {
        res.status(404).send('*** blog not in database');
      }
    });
});


router.post('/', (req, res) => {
  let dbUser = null;
  User
    .findById(req.body.author)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      dbUser.blogs.push(blog);
      dbUser.save().then(() => res.status(201).json(blog).send('saved blog successfully'));
    })
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  Blog
    .findByIdAndUpdate(id, {
      $set: {
        title: req.body.title,
        article: req.body.article,
        publichsed: req.body.published,
        featured: req.body.featured,
        author: req.body.author
      }
    })
    .then(updatedBlog => {
      res.status(204).json(updatedBlog).send('updated blog successfully');
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog
    .findByIdAndRemove(id)
    .then(removedBlog => {
      res.status(200).json(removedBlog).send('removed blog successfully');
    });
});

module.exports = router;
