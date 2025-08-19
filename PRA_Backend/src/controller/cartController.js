const db = require("../../db.js");

// ✅ Add product to cart
exports.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Check if item already in cart
  const checkQuery = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
  db.query(checkQuery, [userId, productId], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length > 0) {
      // Update quantity if exists
      const updateQuery =
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
      db.query(updateQuery, [quantity, userId, productId], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Cart updated successfully" });
      });
    } else {
      // Insert new product into cart
      const insertQuery =
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
      db.query(insertQuery, [userId, productId, quantity], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Product added to cart" });
      });
    }
  });
};

// ✅ Get cart for a user
exports.getCart = (req, res) => {
  const { userId } = req.params;

  const query = `
  SELECT c.product_id, c.quantity, p.product_name, p.product_image, p.price, p.discount,
         (p.price - (p.price * p.discount / 100)) AS discounted_price
  FROM cart c
  JOIN products p ON c.product_id = p.product_id
  WHERE c.user_id = ?`;


  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// ✅ Remove product from cart
exports.removeFromCart = (req, res) => {
  const { userId, productId } = req.params;

  const query = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
  db.query(query, [userId, productId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Product removed from cart" });
  });
};

// ✅ Update quantity of product
exports.updateQuantity = (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  const query =
    "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
  db.query(query, [quantity, userId, productId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Cart updated successfully" });
  });
};
