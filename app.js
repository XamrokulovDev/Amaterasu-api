const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allowed Origins for CORS
const allowedOrigins = ['http://localhost:4000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// Routes
app.use('/api/author', require('./routes/author.route'));
app.use('/api/category', require('./routes/category.route'));
app.use('/api/studio', require('./routes/studio.route'));
app.use('/api/anime', require('./routes/anime.route'));
app.use('/api/part', require('./routes/part.route'));

// Not running yet! 👇
// app.use('/api/episode', require('./routes/episode.route'));

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

module.exports = app;