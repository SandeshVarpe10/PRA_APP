import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/viewCategories.css";
import Service from "../service/service";

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");

  // Fetch all categories
  const fetchCategories = () => {
    Service.getCategory()
      .then((res) => {
        setCategories(res.data.categories || []);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Delete category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      Service.deleteCategory(id)
        .then((res) => {
          setMsg(res.data.msg || "Category deleted successfully!");
          setCategories((prev) => prev.filter((cat) => cat.id !== id));
        })
        .catch(() => setMsg("Error deleting category!"));
    }
  };

  return (
    <div className="view-container">
      <div className="table-wrapper shadow-lg">
        <h2 className="title">Categories</h2>

        {msg && <div className="alert alert-info">{msg}</div>}

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search Category Name..."
            className="search-input"
          />
        </div>

        {/* Categories Table */}
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id}>
                  <td>{index + 1}</td>
                  <td className="category-name">{cat.category_name}</td>
                  <td className="actions">
                    <Link
                      to={`/updateCategory/${cat.id}`}
                      className="btn btn-update"
                    >
                      ✏️ Update
                    </Link>

                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(cat.id)}
                    >
                      🗑️ Delete
                    </button>

                    <Link
                      to={`/viewCategoryDetails/${cat.id}`}
                      className="btn btn-view-cat"
                    >
                      👁️ View
                    </Link>

                    {/* Dropdown */}
                    <div className="dropdown d-inline">
                      <button
                        className="btn btn-view-prod dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        📦 Sub-Categories
                      </button>
                      <div className="dropdown-menu">
                        <Link
                          className="dropdown-item"
                          to={`/add-subcategory/${cat.id}`}
                        >
                          ➕ Add Sub-Category
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={`/view-subcategories/${cat.id}`}
                        >
                          👁️ View Sub-Categories
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Bottom Buttons */}
        <div className="bottom-actions">
          <Link to="/adminDashboard" className="btn btn-back">
            ⬅️ Back
          </Link>
          <Link to="/add-category" className="btn btn-add">
            ➕ Add Category
          </Link>
        </div>
      </div>
    </div>
  );
}
