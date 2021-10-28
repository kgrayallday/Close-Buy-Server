const router = require("express").Router();

module.exports = (db) => {

  // api/favourites/n
  router.get("/:id", (request, response) => {
    db.getFavourites(Number(request.params.id))

      .then((result) => {
        response.json(result.rows);
      })
      .catch((err) => {
        console.log(err.message)
        response.status(500).json(err.message)
        return;
      });
  });

  // api/favourites?userId=n
  router.get("/", (request, response) => {
    /* Comment for performance test
    Promise.all(
      [db.getFavouriteProductsByUserId(Number(request.query.userId)),db.getFavouriteImagesByUserId(Number(request.query.userId))])
      .then((vals) => {

        const products = vals[0].rows;
        const images = vals[1].rows;

        //Images group by product_id
        const imageGroup = [...images.reduce((prv, cur) => {
          const key = cur.product_id;          
          const item = prv.get(key) || Object.assign({}, cur, {
            images_url: []
          });
          item.images_url.push(cur.url)        
          return prv.set(key, item);
        }, new Map).values()];
        
        //Add image array to product
        const newProducts = products.map((product) => {
          const selectedImage = imageGroup.find((image) => {
            return image.product_id === product.product_id;
          });
          product.images = (selectedImage) ? selectedImage.images_url : [];
          return product;
        });

        response.json(newProducts);
        return;
      });
    */
    db.getFullFavouritesByUserId(Number(request.query.userId))

      .then((result) => {

        const products = result.rows;

        //Images group by product_id
        const formattedProduct = [...products.reduce((prv, cur) => {
          const key = cur.product_id;          
          const item = prv.get(key) || Object.assign({}, cur, {
            images: []
          });
          if(cur.image_url) item.images.push(cur.image_url);

          delete item.image_id;
          delete item.image_url;    

          return prv.set(key, item);
        }, new Map).values()];

        response.json(formattedProduct);
      })
      .catch((err) => {
        console.log(err.message)
        response.status(500).json(err.message)
        return;
      });


    

  });  

  /* TODO */
  // router.put("/favourites/", (request, response) => {}); //TODO: Check transaction 
  // router.delete("/appointments/:id", (request, response) => {});

  return router;
};
