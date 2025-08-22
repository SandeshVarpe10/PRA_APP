import axios from "axios";

const API_URL = "http://localhost:3000/cart"; // cart base URL

class CartService {
  addToCart(userId, productId, quantity) {
    return axios.post(`${API_URL}/add`, {
      userId,
      productId,
      quantity,
    });
  }

  getCart(userId) {
    return axios.get(`${API_URL}/${userId}`);
  }

  removeFromCart(userId, productId) {
    return axios.delete(`${API_URL}/${userId}/${productId}`);
  }

  updateQuantity(userId, productId, quantity) {
    return axios.put(`${API_URL}/${userId}/${productId}`, { quantity });
  }
}

export default new CartService();
