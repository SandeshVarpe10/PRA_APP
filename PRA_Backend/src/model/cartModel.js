const db = require("../../db.js");

  exports.findByUserAndProduct=(userId, productId, callback)=>{
    const query = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
    db.query(query, [userId, productId], callback);
  }

  exports.updateQuantityAdd=(userId, productId, quantity, callback)=>{
    const query = "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
    db.query(query, [quantity, userId, productId], callback);
  }

  exports.insert=(userId, productId, quantity, callback)=>{
    const query = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
    db.query(query, [userId, productId, quantity], callback);
  }

  exports.getCartByUser=(userId, callback)=>{
    const query = `
      SELECT c.product_id, c.quantity, p.product_name, p.product_image, 
             p.price, p.discount, (p.price - (p.price * p.discount / 100)) AS discounted_price
      FROM cart c 
      JOIN products p ON c.product_id = p.product_id 
      WHERE c.user_id = ?`;
    db.query(query, [userId], callback);
  }

  exports.remove=(userId, productId, callback)=> {
    const query = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
    db.query(query, [userId, productId], callback);
  }

  exports.updateQuantity=(userId, productId, quantity, callback)=> {
    const query = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
    db.query(query, [quantity, userId, productId], callback);
  }

