import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../service/service";

export default function ViewSubCategory() {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (categoryId) {
      service.getSubCatById(categoryId)
        .then((res) => {
            console.log(res.data);
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

  return (
    <div className="container mt-5">
      <h2 className="category-header">{categoryName} - Subcategories</h2>

      {msg && <div className="alert alert-danger text-center">{msg}</div>}

      <div className="row">
        {subcategories.length > 0 ? (
          subcategories.map((sub) => (
            <div className="col-md-4 mb-4" key={sub.subcategory_id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`/images/${sub.image}`}
                  className="card-img-top"
                  alt={sub.subcategory_name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{sub.subcategory_name}</h5>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <div className="btn-group">
                    <Link
                      to={`/updatesubcategory/${categoryId}/${sub.subcategory_id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Update
                    </Link>
                    <Link
                      to={`/deleteSubCat/${categoryId}/${sub.subcategory_id}`}
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        if (!window.confirm("Are you sure you want to delete this subcategory?")) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Delete
                    </Link>
                    <Link
                      to={`/subcategorydetails/${categoryId}/${sub.subcategory_id}`}
                      className="btn btn-info btn-sm"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/viewProBySubCat/${sub.subcategory_id}`}
                      className="btn btn-success btn-sm"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h5>No subcategories found</h5>
          </div>
        )}
      </div>

      <div className="text-center mt-5 mb-3">
        <Link to="/view-category" className="btn btn-lg btn-secondary">
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}
