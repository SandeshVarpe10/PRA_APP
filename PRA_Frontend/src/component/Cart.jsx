import React, { useEffect, useState } from "react";
import Service from "../service/cartService.js";
import "../css/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Service.getCart(5).then((res) => setCart(res.data));
  }, []);

  const removeItem = (productId) => {
    Service.removeFromCart(5, productId).then(() => {
      setCart(cart.filter((item) => item.product_id !== productId));
    });
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) return;
    Service.updateQuantity(5, productId, qty).then(() => {
      setCart(
        cart.map((item) =>
          item.product_id === productId ? { ...item, quantity: qty } : item
        )
      );
    });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 My Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
          />
          <p>Your cart is empty. Start shopping now!</p>
        </div>
      ) : (
       <div className="cart-table-wrapper">
  <table className="cart-table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Product</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {cart.map((item) => {
        const originalPrice = Number(item.price);
        const discount = Number(item.discount) || 0;
        const discountedPrice =
          originalPrice - (originalPrice * discount) / 100;

        return (
          <tr key={item.product_id}>
            <td>
              <img
                src={`http://localhost:3000/images/${item.product_image}`}
                alt={item.name}
                width="50"
              />
            </td>
            <td>{item.product_name}</td>
            <td>
              {discount > 0 && (
                <span style={{ color: "green", marginLeft: "8px" }}>
                  ₹{discountedPrice.toFixed(2)}
                </span>
              )}
            </td>
            <td>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQty(item.product_id, Number(e.target.value))
                }
              />
            </td>
            <td>₹{(discountedPrice * item.quantity).toFixed(2)}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => removeItem(item.product_id)}
              >
                remove
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

      )}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h4 className="cart-summary-price">
            Total: ₹
            {cart
              .reduce((acc, item) => {
                const originalPrice=Number(item.price);  //string to number
                const discount=Number(item.discount) || 0;
                const discountedPrice =originalPrice-(originalPrice*discount)/100;
                return acc + discountedPrice * item.quantity;
              }, 0)
              .toFixed(2)}
          </h4>

          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
