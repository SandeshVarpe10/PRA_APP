import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Service from "../service/service";
import "../css/updatePro.css";

export default function UpdateProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: null,
    existingImage: "",
    subcategoryId: "",
    brand: "",
    description: "",
    stockUnit: "",
    stock: 0,
    price: 0,
    discount: 0,
    organic: "",
  });

  const [subcategories, setSubcategories] = useState([]);

  // Fetch product + subcategories
  useEffect(() => {
    // fetch product by id
    Service.getProductById(id).then((res) => {
      const product = res.data;
      setFormData({
        id: product.id,
        name: product.product_name,
        image: null,
        existingImage: product.product_image,
        subcategoryId: product.subcategory_id,
        brand: product.brand,
        description: product.description,
        stockUnit: product.stock_unit,
        stock: product.stock,
        price: product.price,
        discount: product.discount,
        organic: product.organic ? "true" : "false",
      });
    });

    // fetch subcategories
    Service.getAllSubcategories().then((res) => {
      setSubcategories(res.data.subcategories);
    });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
data.append("id", formData.id);
data.append("product_name", formData.name);
if (formData.image) data.append("product_image", formData.image);
else data.append("product_image", formData.existingImage);
data.append("subcategory_id", formData.subcategoryId);
data.append("brand", formData.brand);
data.append("description", formData.description);
data.append("stock_unit", formData.stockUnit);
data.append("stock", formData.stock);
data.append("price", formData.price);
data.append("discount", formData.discount);
data.append("organic", formData.organic === "true" ? 1 : 0);


    Service.updateProduct(id, data).then(() => {
      alert("✅ Product updated successfully!");
      navigate("/products/"+formData.subcategoryId);
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Update Product Details</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Current Image */}
        {formData.existingImage && (
          <div className="form-group">
            <label>Current Product Image</label>
            <br />
            <img
              src={`http://localhost:3000/images/${formData.existingImage}`}
              className="product-image-preview"
              alt="Product"
            />
            <input
              type="hidden"
              name="existingImage"
              value={formData.existingImage}
            />
          </div>
        )}

        {/* Upload New Image */}
        <div className="form-group">
          <label>Change Product Image (Optional)</label>
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Subcategory */}
        <div className="form-group">
          <label>Select Subcategory</label>
          <select
            name="subcategoryId"
            className="form-control"
            value={formData.subcategoryId}
            onChange={handleChange}
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

        <div className="section-divider"></div>

        {/* Brand */}
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Stock Unit */}
        <div className="form-group">
          <label>Stock Unit</label>
          <select
            name="stockUnit"
            className="form-control"
            value={formData.stockUnit}
            onChange={handleChange}
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
            className="form-control"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price (per unit)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Discount */}
        <div className="form-group">
          <label>Discount (%)</label>
          <input
            type="number"
            name="discount"
            className="form-control"
            step="0.01"
            min="0"
            value={formData.discount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Organic */}
        <div className="form-group">
          <label>Is Organic?</label>
          <select
            name="organic"
            className="form-control"
            value={formData.organic}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button type="submit" className="btn btn-custom btn-block">
          Update Product
        </button>
      </form>
    </div>
  );
}
