-- Drop and recreate Products table --

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  domain_id VARCHAR(255) NOT NULL, --new
  domain VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL, --new
  url TEXT NOT NULL, -- modified / 
  location VARCHAR(255), -- new 
  price INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL, --new
  title VARCHAR(255) NOT NULL, -- modified / name
  post_date VARCHAR(255) --new
);