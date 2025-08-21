import React, { useState, useEffect } from "react";
import "../css/addSubCategory.css";
import service from "../service/service";

export default function AddSubCategory() {
  const [formData, setFormData] = useState({
  subCategoryName: "",
  image: null,   // 👈 same name as backend expects
  categoryId: "",
});

  const [categories, setCategories] = useState([]); // ✅ Store all categories
  const [msg, setMsg] = useState("");

  // ✅ Fetch categories on component mount
  useEffect(() => {
    service
      .getCategory() // <-- you need to have this API in your service
      .then((res) =>{ 
        console.log(res.data)
        setCategories(res.data.categories)})
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // ✅ Reset form after success
  useEffect(() => {
    if (msg && msg.includes("success")) {
      setFormData({
        subCategoryName: "",
        image: null,
        categoryId: "",
      });
    }
  }, [msg]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("subCategoryName", formData.subCategoryName);
    form.append("image", formData.image);
    form.append("categoryId", formData.categoryId);

    service
      .saveSubCategory(form)
      .then((res) => setMsg(res.data.msg))
      .catch((err) => setMsg("Error: " + err.message));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className="add-subcategory-container">
      <div className="add-subcategory-card">
        <h2 className="add-subcategory-title mb-5">📂 Add New Subcategory</h2>

        {msg && <div className="alert alert-info text-center">{msg}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Subcategory Name */}
          <div className="mb-3">
            <label htmlFor="subCategoryName" className="form-label">
              Subcategory Name
            </label>
            <input
              type="text"
              className="form-control"
              id="subCategoryName"
              name="subCategoryName"
              placeholder="Enter subcategory name"
              value={formData.subCategoryName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subcategory Image */}
          <div className="mb-3">
            <label htmlFor="subCategoryImage" className="form-label">
              Subcategory Image
            </label>
            <input
  type="file"
  className="form-control"
  id="subCategoryImage"
  name="image"        // 👈 must match backend key
  accept="image/*"
  onChange={handleChange}
  required
/>
          </div>

          {/* Category Dropdown */}
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="text-center">
            <button type="submit" className="btn btn-secondary ms-2">
              ➕ Add Subcategory
            </button>
            <a href="/view-category" className="btn btn-secondary ms-2">
              🔙 Back
            </a>
          </div>
        </form>

      </div>
    </div>
  );
}
