const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI)

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connect('mongodb://heroku_8jsx5fck:ag05h99lksf9t0dqokmolp5b3k@ds155596.mlab.com:55596/heroku_8jsx5fck', { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
  res.status(200).send()
});

module.exports = app;
