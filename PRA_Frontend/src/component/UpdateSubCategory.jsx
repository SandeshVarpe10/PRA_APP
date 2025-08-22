import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../service/service"; // adjust path
import "../css/updateSubCat.css";

export default function UpdateSubCategory() {
  const { Cid, Sid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subcategory_name: "",
    image: null,
    categoryId: "",
  });

  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);

  // Load categories and subcategory details
  useEffect(() => {
    // Fetch all categories for dropdown
    service
      .getCategory()
      .then((res) => {
        setCategories(res.data.categories || []);
      })
      .catch((err) => console.error("Error fetching categories:", err));

    // Fetch subcategory details
    service
      .getSubCatBySid(Sid)
      .then((res) => {
        const subcat = res.data.subcategories[0];
        if (subcat) {
          setFormData({
            subcategory_name: subcat.subcategory_name || "",
            image: null,
            categoryId: subcat.category_id || "",
          });

          if (subcat.image) {
            setPreview(`http://localhost:3000/images/${subcat.image}`);
          }
        }
      })
      .catch((err) => {
        console.error("Error loading subcategory:", err);
        setMsg("❌ Failed to load subcategory.");
      });
  }, [Cid, Sid]);

  // Handle text/select input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("subcategory_name", formData.subcategory_name);
    form.append("categoryId", formData.categoryId);
    if (formData.image) form.append("image", formData.image);

    service
      .updSubCategoryById(Cid, Sid, form)
      .then(() => {
        setMsg("✅ Subcategory updated successfully!");
        setTimeout(
          () => navigate(`/view-subcategories/${formData.categoryId}`),
          800
        );
      })
      .catch((err) => {
        console.error("Update failed:", err);
        setMsg("❌ Failed to update subcategory.");
      });
  };

  return (
    <div className="update-subcat-container">
      <div className="update-subcat-card">
        <h2 className="update-subcat-title">Update Subcategory</h2>

        {msg && <div className="update-subcat-alert">{msg}</div>}

        <form onSubmit={handleSubmit}>
          {/* Subcategory Name */}
          <div className="update-subcat-group">
            <label className="update-subcat-label" htmlFor="subcategory_name">
              Subcategory Name
            </label>
            <input
              type="text"
              name="subcategory_name"
              id="subcategory_name"
              className="update-subcat-input"
              value={formData.subcategory_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="update-subcat-group mt-3">
            <label className="update-subcat-label" htmlFor="categoryId">
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              className="update-subcat-input"
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

          {/* Image Preview & File Upload */}
          <div className="update-subcat-group mt-3">
            <label className="update-subcat-label">Current Image</label>
            <br />
            {preview ? (
              <img
                src={preview}
                alt="Subcategory"
                className="update-subcat-preview"
              />
            ) : (
              <p className="text-muted">No image available</p>
            )}
            <input
              type="file"
              name="image"
              className="update-subcat-file"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary update-subcat-btn">
            Update Subcategory
          </button>
        </form>
      </div>
    </div>
  );
}
