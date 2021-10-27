-- Drop and recreate images table

DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE images (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL
);