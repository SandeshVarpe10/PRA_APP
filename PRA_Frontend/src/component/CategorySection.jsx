import React from "react";

function CategorySection({ categories, subcategories }) {
  return (
    <div>
      <h2>All Categories & Subcategories</h2>

      <h3 id="searchRes" className="searchResult">
        Search Results
      </h3>
      <div id="searchResults" className="subcategory-container"></div>

      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <h3>{category.category_name}</h3>
            <div className="subcategory-container">
              {subcategories
                .filter((sub) => sub.category_id === category.id)
                .map((sub) => (
                  <a
                    key={sub.subcategory_id}
                    href={`/products/${sub.subcategory_id}`}
                    id={`sub-${sub.subcategory_id}`}
                  >
                    <div className="subcategory-card">
                      <img
                        src={`http://localhost:3000/images/${sub.image}`}
                        alt={sub.subcategory_name}
                      />
                      <h4>{sub.subcategory_name}</h4>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
