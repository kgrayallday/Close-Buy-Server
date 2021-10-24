const router = require("express").Router();
const {getFullListings, getListings, getDeatil} = require("../helper/craigslist");

module.exports = () => {

  /* If '/craigslist' has the performance issue, React side could call 'lisngs' first and call 'detail' (rendering twice) */

  // api/products/craigslist?query=xxxx
  router.get("/craigslist", (request, response) => {
    getFullListings(request.query.query)
      .then((listingArray) => {
        response.json(
          listingArray
        )
      });
  });

  // api/products/craigslist/listings?query=xxxx
  router.get("/craigslist/listings", (request, response) => {
    getListings(request.query.query)
      .then((listings) => {
        response.json(
          listings
        )
      });
  });  

  // api/products/craigslist/detail?url=https://vancouver.craigslist.org/van/fuo/d/burnaby-white-scan-design-sectional/7396284138.html&pid=7396284138
  router.get("/craigslist/detail", (request, response) => {
    getDeatil(request.query.url, request.query.pid)
      .then((detail) => {
        response.json(
          detail
        )
      });
  });

  return router;
};
