import React, { useState } from "react";
import "../css/addCategory.css";
import service from "../service/service";

export default function AddCategory() {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let promise = service.saveCategory(formData);
    promise
      .then((res) => {
        setMsg(res.data.msg);
      })
      .catch((err) => {
        setMsg(err);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="add-category-container">
      <div className="add-category-card">
        <h3 className="add-category-title">🗂️ Add New Category</h3>

        {msg && <div className="alert alert-info text-center">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              name="categoryName"
              placeholder="Enter category name"
              value={formData.categoryName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="categoryDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="categoryDescription"
              name="categoryDescription"
              rows="3"
              placeholder="Enter category description"
              value={formData.categoryDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-secondary ms-2">
              ➕ Add Category
            </button>
            <a href="/adminDashboard" className="btn btn-secondary ms-2">
              🔙 Back
            </a>
          </div>
        </form>

        <div className="text-center mt-4">
          <a href="/view-category" className="btn btn-view">
            📋 View Categories
          </a>
        </div>
      </div>
    </div>
  );
}
