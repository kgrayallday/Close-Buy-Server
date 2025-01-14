-- Drop and recreate favourites table

DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);