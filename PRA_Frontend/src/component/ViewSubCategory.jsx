import React, { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import service from "../service/service";
import "../css/viewSubCategory.css";

export default function ViewSubCategory() {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [msg, setMsg] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      service
        .getSubCatById(categoryId)
        .then((res) => {
          setSubcategories(res.data.subcategories || []);
          setCategoryName(res.data.categoryName || "Unknown Category");
        })
        .catch((err) => {
          console.error("Error fetching subcategories:", err);
          setMsg("Failed to fetch subcategories!");
          setSubcategories([]);
        });
    }
  }, [categoryId]);

const handleDelete = (Cid, Sid) => {
  if (window.confirm("Are you sure you want to delete this subcategory?")) {
    service.deleteSubCat(Cid, Sid)
      .then((res) => {
        setMsg(res.data.msg || "Subcategory deleted successfully!");
        setSubcategories((prev) =>
          prev.filter((subcat) => subcat.subcategory_id !== Sid)
        );
        navigate();
      })
      .catch(() => setMsg("Error deleting subcategory!"));
  }
};


  return (
    <div className="subcat-wrapper">
      <h2 className="subcat-title">{categoryName} - Subcategories</h2>

      {msg && <div className="subcat-alert">{msg}</div>}

      <div className="subcat-grid">
        {subcategories.length > 0 ? (
          subcategories.map((sub) => (
            <div className="subcat-card" key={sub.subcategory_id}>
              <img
                src={`http://localhost:3000/images/${sub.image}`}
                className="subcat-img"
                alt={sub.subcategory_name}
              />
              <div className="subcat-body">
                <h5 className="subcat-name">{sub.subcategory_name}</h5>
              </div>
              <div className="subcat-actions">
                <Link
                  to={`/updatesubcategory/${categoryId}/${sub.subcategory_id}`}
                  className="subcat-btn update"
                >
                  ✏️ Update
                </Link>
                <Link
                  to={`/deleteSubCat/${sub.category_id}/${sub.subcategory_id}`}
                  className="subcat-btn delete"
                  onClick={() => handleDelete(sub.category_id,sub.subcategory_id)}
                >
                  🗑️ Delete
                </Link>
              
                <Link
                  to={`/viewProBySubCat/${sub.subcategory_id}`}
                  className="subcat-btn product"
                >
                  📦 Products
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="subcat-empty">No subcategories found</div>
        )}
      </div>

      <div className="subcat-footer">
        <Link to="/view-category" className="subcat-back-btn">
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}
