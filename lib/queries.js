const db = require('./db');

module.exports = {
  query: (text, params) => {
    return db.query(text, params);
  },

  // ---------------
  // Users
  // ---------------
  //Use only inside of the server
  getUserWithId: (id) => {
    const query = `SELECT id, name, email FROM users WHERE id = $1;`;  
    return db
      .query(query, [id])
  },

  // ---------------
  // Favourites
  // ---------------
  getFavourites: (id) => {
    const query = `SELECT id, product_id, user_id FROM favourites WHERE id = $1;`;  
    return db
      .query(query, [id])
  },

  getFavouritesByUserId: (userId) => {
    const query = `SELECT * FROM favourites WHERE user_id = $1;`;  
    return db
      .query(query, [userId])
  },  

  getFavouriteProductsByUserId: (userId) => {
    const query = `
                  SELECT 
                    f.id as favourite_id, 
                    p.id as product_id, 
                    p.name, 
                    p.primary_url, 
                    p.domain, 
                    p.price 
                  FROM favourites f 
                    JOIN products p 
                    ON f.product_id = p.id 
                  WHERE user_id = $1 ; `;  
    return db
      .query(query, [userId])
  },  

  getFavouriteImagesByUserId: (userId) => {
    const query = `
                  SELECT 
                    images.* 
                FROM (
                      SELECT 
                        f.id as favourite_id, 
                        p.id as product_id, 
                        p.name, 
                        p.primary_url, 
                        p.domain, 
                        p.price 
                      FROM favourites f 
                        JOIN products p 
                        ON f.product_id = p.id 
                      WHERE user_id = $1) fav_prod 
                JOIN images 
                  on fav_prod.product_id = images.product_id ; `;  
    return db
      .query(query, [userId])
  },    

  getFullFavouritesByUserId: (userId) => {
    const query = `
                  SELECT 
                    fav_prod.*, 
                    images.id as image_id, 
                    images.url as image_url 
                  FROM (
                        SELECT 
                          f.id as favourite_id, 
                          p.id as product_id, 
                          p.name, 
                          p.primary_url, 
                          p.domain, 
                          p.price 
                        FROM favourites f 
                          JOIN products p 
                          ON f.product_id = p.id 
                        WHERE user_id = $1) fav_prod 
                  LEFT JOIN images 
                    on fav_prod.product_id = images.product_id ; `;  
    return db
      .query(query, [userId])
  },
  
  
  // ---------------
  // Products of DB
  // ---------------  
  getClosebuyProductsByTerm: (term) => {
    const query = `
                  SELECT 
                    i.id as image_id, 
                    i.url as image_url,
                    i.product_id,              
                    p.id as product_id, 
                    p.name, 
                    p.primary_url, 
                    p.domain, 
                    p.price 
                  FROM products p                 
                  LEFT JOIN images i
                    on p.id = i.product_id 
                  WHERE name LIKE $1 ; `;                    
    return db
      .query(query, [`%${term.toLowerCase()}%`]);
  },   

  //For test
  getClosebuyProductsAll: () => {
    const query = `
                  SELECT 
                    i.id as image_id, 
                    i.url as image_url,
                    i.product_id,              
                    p.id as product_id, 
                    p.name, 
                    p.primary_url, 
                    p.domain, 
                    p.price 
                  FROM products p                 
                  LEFT JOIN images i
                    on p.id = i.product_id 
                  `;                    
    return db
      .query(query);
  },     

};


