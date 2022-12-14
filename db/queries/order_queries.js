const db = require('../connection');

const incrementItem = (id) => {
  const values = [id];

  const query = `
    UPDATE cart_items
    SET quantity = (quantity + 1)
    WHERE (id = $1) AND (quantity > -1)
    RETURNING *;
  `;

  return db.query(query, values)
    .then(data => {
      console.log("data.rows for incrementItem:", data.rows);
      return data.rows;
    })
    .catch((err) => { err.message; });
};

const decrementItem = (id) => {
  const values = [id];

  const query = `
    UPDATE cart_items
    SET quantity = (quantity - 1)
    WHERE (id = $1) AND (quantity > 0)
    RETURNING *;
  `;

  return db.query(query, values)
    .then(data => {
      console.log("data.rows for decrementItem:", data.rows);
      return data.rows;
    })
    .catch((err) => { err.message; });
};

//check if using anywhere
const getPendingOrders = () => {
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
    WHERE orders.status = 'pending';
  `;

  return db.query(query)
    .then(data => {
      console.log('item currently pending: ', data.rows);
      return data.rows;
    })
    .catch((err) => { err.message; });
};

const getPlacedOrders = () => {
  const query = `
    SELECT
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
      console.log('item currently placed data rows: ', data.rows);
      return data.rows;
    })
    .catch((err) => { err.message; });
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
    })
    .catch((err) => { err.message; });
};

module.exports = {
  incrementItem,
  decrementItem,
  placeOrder,
  getPlacedOrders
};
