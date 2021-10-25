const router = require("express").Router();
const {getCraigslistsFullListings, getCraigslistsListings, getCraigslistsDeatil} = require("../helper/craigslist");
const {getKijijiFullListings} = require("../helper/kijiji");

module.exports = () => {

  /* If '/craigslist' has the performance issue, React side could call 'lisngs' first and call 'detail' (rendering twice) */

  // api/products/craigslist?q=xxxx
  router.get("/craigslist", (request, response) => {
    getCraigslistsFullListings(request.query.q)
      .then((listingArray) => {
        response.json(
          listingArray
        )
      });
  });

  // api/products/craigslist/listings?q=xxxx
  router.get("/craigslist/listings", (request, response) => {
    getCraigslistsListings(request.query.q)
      .then((listings) => {
        response.json(
          listings
        )
      });
  });  

  // api/products/craigslist/detail?url=https://vancouver.craigslist.org/van/fuo/d/burnaby-white-scan-design-sectional/7396284138.html&pid=7396284138
  router.get("/craigslist/detail", (request, response) => {
    getCraigslistsDeatil(request.query.url, request.query.pid)
      .then((detail) => {
        response.json(
          detail
        )
      });
  });

  // api/products/kijiji?q=xxxx
  router.get("/kijiji", (request, response) => {
    getKijijiFullListings(request.query.q)
      .then((listingArray) => {
        response.json(
          listingArray
        )
      });
  });  

  return router;
};
