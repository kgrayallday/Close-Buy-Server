-- Drop and recreate Products table --

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  primary_url TEXT NOT NULL,
  domain VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL
);