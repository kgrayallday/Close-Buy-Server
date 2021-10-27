// load .env data into process.env
require('dotenv').config();
// Web server config
const PORT = process.env.PORT || 8080;

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const db = require("./lib/queries");


// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Separated Routes for each Resource 
// Example -- const products = require("./routes/products");
// Example -- const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const favouritesRoutes = require("./routes/favourites");

// Mount all resource routes
// Example -- app.use('/api/products', productRoutes);
// Example -- app.use('/api/users', userRoutes);
App.use('/api/products', productRoutes(db));
App.use('/api/users', userRoutes(db));
App.use('/api/favourites', favouritesRoutes(db));

// Home GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
