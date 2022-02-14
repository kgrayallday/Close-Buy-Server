// load .env data into process.env
require('dotenv').config();
// Web server config
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./lib/queries");

// express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Separated Routes for each Resource 
// Example -- const products = require("./routes/products");
// Example -- const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const favouritesRoutes = require("./routes/favourites");

// Mount all resource routes
// Example -- app.use('/api/products', productRoutes);
// Example -- app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes(db));
app.use('/api/users', userRoutes(db));
app.use('/api/favourites', favouritesRoutes(db));

// Home GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express seems to be listening on port ${PORT} ... nice 👍`);
});
