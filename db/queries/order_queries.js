const db = require('../connection');

const incrementItem = () => {
  const query = `
    UPDATE cart_items
    SET quantity = (quantity + 1)
    WHERE id = 1
    RETURNING *;
  `;

  return db.query(query)
    .then(data => {
      console.log("data.rows:", data.rows);
      return data.rows;
    });

};

const decrementItem = () => {
  const query = `
    UPDATE cart_items
    SET quantity = (quantity - 1)
    WHERE id = 1
    RETURNING *;
  `;

  return db.query(query)
    .then(data => {
      console.log("data.rows:", data.rows);
      return data.rows;
    });
};

const getPlacedOrders = () => {

  const query = `
    SELECT;
    foods.name AS item,
      quantity,
      users.name AS name,
        foods.price AS price
    FROM cart_items
    JOIN orders ON orders.id = order_id
    JOIN foods ON foods.id = food_id
    JOIN users ON users.id = user_id
    WHERE orders.status = 'placed';
  `;

  return db.query(query)
    .then(data => {
      console.log('item currently placed: ', data.rows);
      return data.rows;
    });
};

const placeOrder = () => {
  const query = `
    UPDATE orders
    SET status = 'placed'
    WHERE id = 1
    RETURNING *;
  `;

  return db.query(query)
    .then(data => {
      console.log("data.rows:", data.rows);
      return data.rows;
    });
};

module.exports = { incrementItem, decrementItem, placeOrder, getPlacedOrders };



// Order placed data

// from foods
//- id
// -name
// -price

// from cart_items
//- id
// -quantity

// from orders
//- id
// -status
