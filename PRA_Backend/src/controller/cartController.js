const Cart = require("../model/cartModel");

exports.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;
  Cart.findByUserAndProduct(userId, productId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0) {
      Cart.updateQuantityAdd(userId, productId, quantity, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Cart updated successfully" });
      });
    } else {
      Cart.insert(userId, productId, quantity, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Product added to cart" });
      });
    }
  });
};

exports.getCart = (req, res) => {
  const { userId } = req.params;
  Cart.getCartByUser(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.removeFromCart = (req, res) => {
  const { userId, productId } = req.params;
  Cart.remove(userId, productId, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Product removed from cart" });
  });
};

exports.updateQuantity = (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;
  Cart.updateQuantity(userId, productId, quantity, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Cart updated successfully" });
  });
};
