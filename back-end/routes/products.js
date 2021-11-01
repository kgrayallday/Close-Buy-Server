const router = require("express").Router();
const {getCraigslistsFullListings, getCraigslistsListings, getCraigslistsDeatil} = require("../helper/craigslist");
const {getKijijiFullListings} = require("../helper/kijiji");
const {getEtsyListings} = require("../helper/etsy");
const {getEbayListings} = require("../helper/ebay");
const {getGoogleShoppingListings} = require("../helper/google");

module.exports = (db) => {

  /* If '/craigslist' has the performance issue, React side could call 'lisngs' first and call 'detail' (rendering twice) */
  /*
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
  */

  // api/products/craigslist?q=xxxx
  router.get("/craigslist", (request, response) => {
    getCraigslistsFullListings(request.query.q)
      .then((listingArray) => {
        response.json(
          listingArray
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

  // api/products/etsy?q=xxxx
  router.get("/etsy", (request, response) => {
    getEtsyListings(request.query.q)
      .then((listingArray) => {
        response.json(
          listingArray
        )
      });
  });  

  // api/products/etsy?q=xxxx
  router.get("/ebay", (request, response) => {
    let ebayText = false
    if (request.query.ebayText && request.query.ebayText === 't') ebayText = true;
    getEbayListings(request.query.q, ebayText)
      .then((listingArray) => {
        response.json(
          listingArray
        )
      });
  });    

  // api/products/google?q=xxxx
  router.get("/google", (request, response) => {
    getGoogleShoppingListings(request.query.q)
      .then((listingArray) => {
        response.json(
          listingArray
        )
        console.log(listingArray);
      });
  });   

  

  // api/products/closebuy?q=xxxx
  router.get("/closebuy", (request, response) => {
    db.getClosebuyProductsByTerm(request.query.q)
      .then((listingArray) => {
        const images = listingArray.rows;

        //Images group by product_id
        const newProduts = [...images.reduce((prv, cur) => {
          const key = cur.product_id;          
          const item = prv.get(key) || Object.assign({}, cur, {
            images: []
          });
          if(cur.image_url) item.images.push(cur.image_url);

          delete item.image_id;
          delete item.image_url;

          return prv.set(key, item);
        }, new Map).values()];        

        response.json(newProduts);
        return;
      });
  });    


  // api/products/closebuy?q=xxxx
  router.get("/closebuyall", (request, response) => {
    db.getClosebuyProductsAll()
      .then((listingArray) => {         

        response.json(listingArray.rows);
        return;
      });
  });

  // api/products?q=xxxx
  router.get("/to_db", (request, response) => {
    // Promise.allSettled([getCraigslistsFullListings(request.query.q), getKijijiFullListings(request.query.q)])
    // .then((vals) => {
    //   const craigsList = vals[0];
    //   const kijiji = vals[1];

    //   const newObject = [];
    //   if (craigsList.status === 'fulfilled') newObject.push(...craigsList.value);
    //   if (kijiji.status === 'fulfilled') newObject.push(...kijiji.value);

    //   response.json(newObject);
    //   return;
    // });  
  });    

  // api/products?q=xxxx
  router.get("/", (request, response) => {
    let ebayText = false;
    if (request.query.ebayText && request.query.ebayText === 't') ebayText = true;

    Promise.allSettled([getGoogleShoppingListings(request.query.q), getCraigslistsFullListings(request.query.q), getKijijiFullListings(request.query.q), getEtsyListings(request.query.q), getEbayListings(request.query.q, ebayText)])
    .then((vals) => {
      const google = vals[0];
      const craigsList = vals[1];
      const kijiji = vals[2];
      const etsy = vals[3];
      const ebay = vals[4];

      const newObject = [];
      if (google.status === 'fulfilled') newObject.push(...google.value);
      if (craigsList.status === 'fulfilled') newObject.push(...craigsList.value);
      if (kijiji.status === 'fulfilled') newObject.push(...kijiji.value);
      if (etsy.status === 'fulfilled') newObject.push(...etsy.value);
      if (ebay.status === 'fulfilled') newObject.push(...ebay.value);

      response.json(newObject);
      return;
    });  
  });  

  return router;
};