import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ import useParams
import service from "../service/service";
import "../css/productList.css";

export default function ProductList() {
  const { subCatId } = useParams(); // ✅ get subCatId from URL
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!subCatId) return;

    service
      .getProductBySubCat(subCatId)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setMsg("Failed to load products for this subcategory.");
      });
  }, [subCatId]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      service
        .deleteProduct(id)
        .then(() => {
          setProducts(products.filter((p) => p.product_id !== id));
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
        });
    }
  };

  return (
    <div className="admin-product-page">
      <h2 className="page-title">📦 Product Management</h2>

      {msg && <div className="error-msg">{msg}</div>}

      {products.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Final Price</th>
              <th>Stock</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const originalPrice = parseFloat(product.price);
              const discountPercent = parseFloat(product.discount);
              const saved = (originalPrice * discountPercent) / 100;
              const discountedPrice = originalPrice - saved;

              let unitLabel =
                product.stock_unit === "kilogram"
                  ? "kg"
                  : product.stock_unit === "piece"
                  ? "pc"
                  : product.stock_unit === "liter"
                  ? "ltr"
                  : "unit";

              return (
                <tr key={product.product_id}>
                  <td>
                    <img
                      src={`http://localhost:3000/images/${product.product_image}`}
                      alt={product.product_name}
                      className="table-img"
                    />
                  </td>
                  <td>{product.product_name}</td>
                  <td>₹{originalPrice}</td>
                  <td>{discountPercent}%</td>
                  <td className="final-price">₹{discountedPrice}</td>
                  <td>{product.stock}</td>
                  <td>{unitLabel}</td>
                  <td>
                    <Link
                to={`/upd-product/${product.product_id}`}
                className="subcat-btn update"
              >
                ✏️ Update
              </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product.product_id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="empty-msg">
          <p>No products available</p>
        </div>
      )}
    </div>
  );
}
