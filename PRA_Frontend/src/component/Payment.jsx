import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/payment.css";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const totalAmount = cart.reduce((acc, item) => {
    const originalPrice = Number(item.price);
    const discount = Number(item.discount) || 0;
    const discountedPrice = originalPrice - (originalPrice * discount) / 100;
    return acc + discountedPrice * item.quantity;
  }, 0);

  const handlePayment = () => {
    alert("✅ Payment successful!");
    navigate("/userDashboard");
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">💳 Payment Page</h2>

      <div className="payment-summary">
        <h4>Total Payable Amount: ₹{totalAmount.toFixed(2)}</h4>
      </div>

      <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="Enter card number" required />
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" required />
        </div>

        <div className="form-group">
          <label>CVV</label>
          <input type="password" placeholder="***" required />
        </div>

        <div className="form-group">
          <label>Card Holder Name</label>
          <input type="text" placeholder="Name on card" required />
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </form>
    </div>
  );
}
