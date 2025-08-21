import React from "react";

function SubCategoryBar({ subcategories }) {
  return (
    <div className="category-bar d-flex ">
      {subcategories.length > 0 ? (
        subcategories.map((cat) => (
          <button
            key={cat.subcategory_id}
            className="category-button"
            onClick={() => {
              const section = document.getElementById(
                `sub-${cat.subcategory_id}`
              );
              if (section) {
                section.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }}
          >
            <i className="bi bi-tag-fill"></i> {cat.subcategory_name}
          </button>
        ))
      ) : (
        <div className="text-muted">No Categories Found</div>
      )}
    </div>
  );
}

export default SubCategoryBar;
