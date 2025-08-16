import React, { useState } from "react";
import "../css/addProduct.css";

function AddProduct({ subcategories = [], msg }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    subcategoryId: "",
    brand: "",
    description: "",
    stockUnit: "",
    stock: "",
    price: "",
    discount: "",
    organic: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Send to backend using fetch or axios
  };

  return (
    <div className="container mt-5">
      <div className="form-container">
        <h2>Add Product</h2>

        {msg && (
          <div
            className={`alert alert-${msg.type || "info"} alert-dismissible fade show`}
            role="alert"
          >
            {msg.text || msg}
            <button type="button" className="close" data-dismiss="alert">
              <span>&times;</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control formData"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Product Image */}
          <div className="form-group">
            <label>Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="form-control formData"
              required
            />
          </div>

          {/* Subcategory Dropdown */}
          <div className="form-group">
            <label>Select Subcategory</label>
            <select
              name="subcategoryId"
              value={formData.subcategoryId}
              onChange={handleChange}
              className="form-control formData"
              required
            >
              <option value="">-- Choose Subcategory --</option>
              {subcategories.map((subcat) => (
                <option key={subcat.subcategory_id} value={subcat.subcategory_id}>
                  {subcat.subcategory_name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="form-control formData"
              placeholder="Enter brand name"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control formData"
              rows="3"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          {/* Stock Unit */}
          <div className="form-group">
            <label>Stock Unit</label>
            <select
              name="stockUnit"
              value={formData.stockUnit}
              onChange={handleChange}
              className="form-control formData"
              required
            >
              <option value="">-- Choose Unit --</option>
              <option value="kilogram">Kilogram</option>
              <option value="piece">Piece</option>
              <option value="liter">Liter</option>
            </select>
          </div>

          {/* Stock Quantity */}
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="form-control formData"
              min="0"
              step="1"
              placeholder="Enter available stock"
              required
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price (per unit)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control formData"
              step="0.01"
              min="0"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Discount */}
          <div className="form-group">
            <label>Discount (per unit)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="form-control formData"
              step="0.01"
              min="0"
              placeholder="Enter discount"
              required
            />
          </div>

          {/* Organic */}
          <div className="form-group">
            <label>Is Organic?</label>
            <select
              name="organic"
              value={formData.organic}
              onChange={handleChange}
              className="form-control formData"
              required
            >
              <option value="">-- Select --</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success btn-block">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
