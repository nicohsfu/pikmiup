DROP TABLE IF EXISTS cart_items CASCADE;

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY NOT NULL,
  food_id INTEGER REFERENCES foods(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  quantity INTEGER
);
