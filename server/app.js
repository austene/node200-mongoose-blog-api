const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(`${MONGODB_URI}`, { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
  res.status(200).send()
  console.log('in app.get /');
});

module.exports = app;
