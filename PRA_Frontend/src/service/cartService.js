import axios from "axios";

const API_URL = "http://localhost:3000/cart"; // cart base URL

class CartService {
  // ✅ Add product to cart
  addToCart(userId, productId, quantity) {
    return axios.post(`${API_URL}/add`, {
      userId,
      productId,
      quantity,
    });
  }

  // ✅ Get cart items for a user
  getCart(userId) {
    return axios.get(`${API_URL}/${userId}`);
  }

  // ✅ Remove product from cart
  removeFromCart(userId, productId) {
    return axios.delete(`${API_URL}/${userId}/${productId}`);
  }

  // ✅ Update quantity of a product
  updateQuantity(userId, productId, quantity) {
    return axios.put(`${API_URL}/${userId}/${productId}`, { quantity });
  }
}

export default new CartService();
