const db = require("../../db.js");

// Add to cart
exports.addToCart = (userId, productId, quantity, callback) => {
  db.query(
    "SELECT * FROM cart WHERE user_id=? AND product_id=?",
    [userId, productId],
    (err, result) => {
      if (err) return callback(err);

      if (result.length > 0) {
        db.query(
          "UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?",
          [quantity, userId, productId],
          callback
        );
      } else {
        db.query(
          "INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)",
          [userId, productId, quantity],
          callback
        );
      }
    }
  );
};

// Get all cart items
exports.getCart = (userId, callback) => {
  db.query(
    `SELECT 
        c.cart_id, 
        c.product_id, 
        c.quantity, 
        p.product_name, 
        p.price, 
        p.product_image
     FROM cart c 
     JOIN products p ON c.product_id = p.product_id 
     WHERE c.user_id=?`,
    [userId],
    callback
  );
};

// Remove from cart
exports.removeFromCart = (userId, productId, callback) => {
  db.query(
    "DELETE FROM cart WHERE user_id=? AND product_id=?",
    [userId, productId],
    callback
  );
};

// Update quantity
exports.updateQuantity = (userId, productId, quantity, callback) => {
  db.query(
    "UPDATE cart SET quantity=? WHERE user_id=? AND product_id=?",
    [quantity, userId, productId],
    callback
  );
};
