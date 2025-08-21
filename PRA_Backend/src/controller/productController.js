let productmodel = require("../model/productModel");

exports.addCategoryPage = (req, res) => {
    res.render("AddCategory.ejs");
};

exports.saveCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;

        const existing = await productmodel.checkCategory(categoryName);
        if (existing.length > 0) {
            return res.status(200).json({ msg:"Category Allready Exists" }); 
        }
        const result = await productmodel.saveCategory(categoryName, categoryDescription);
        return res.status(200).json({ msg,data: result }); 

    } catch (err) {
        console.error("Error saving category:", err);
        return res.status(500).json({ msg: "Server error" });
    }
};

exports.viewCategory = async (req, res) => {
  try {
    const categories = await productmodel.getAllCategories();
    res.status(200).json({ categories }); 
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.searchProductByCategory = async (req, res) => {
    let categoryName = req.query.Cn;
    try {
        let categories = await productmodel.searchProductByCategory(categoryName);
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.liveSearch = (req, res) => {
  const searchTerm = req.query.query || '';
  const categoryId = req.query.category || '';

  productmodel.searchProducts(searchTerm, categoryId)
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
};


exports.deleteCategory = async (req, res) => {
  try {
    let categoryId = req.params.Did;
    await productmodel.deleteCategory(categoryId);

    let categories = await productmodel.getAllCategories();
    res.json({ success: true, categories, msg: "Category deleted successfully!" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ success: false, categories: null, msg: "Error deleting category!" });
  }
};


exports.updateCategoryPage = async (req, res) => {
  let categoryId = req.params.Uid;
  let result = await productmodel.getCategoryById(categoryId);

  if (result && result.length > 0) {
    res.json({ success: true, category: result[0] }); // ✅ send JSON
  } else {
    res.json({ success: false, message: "Category not found" });
  }
};

exports.updateSaveCategory = async (req, res) => {
  let { categoryId, categoryName, categoryDescription } = req.body;

  try {
    let result = await productmodel.updateSaveCategory(
      categoryId,
      categoryName,
      categoryDescription
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Category updated successfully" });
    } else {
      res.json({ success: false, message: "Update failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



exports.viewCategoryDetails = async (req, res) => {
  try {
    let category_id = req.params.Cid;
    let result = await productmodel.getCategoryById(category_id);

    if (result.length > 0) {
      res.json({ success: true, category: result[0] });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (err) {
    console.error("Error fetching category details:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.addSubCategoryPage = (req, res) => {
    let categoryId = req.params.Cid;
    res.render("AddSubCategory.ejs", {msg: null, categoryId });
}

exports.getAllSubCat=async (req,res)=>{
      try {
    const subcategories = await productmodel.getAllSubCategories();
    res.status(200).json({subcategories}); 
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Server error" });
  }
}

exports.saveSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;   // match frontend keys
    const image = req.file ? req.file.filename : null;

    let result = await productmodel.addSubCategory(subCategoryName, image, categoryId);

    res.json({
      success: true,
      msg: "Subcategory added successfully!",
      data: result,
    });
  } catch (err) {
    console.error("Error adding subcategory:", err);
    res.status(500).json({
      success: false,
      msg: "Error adding subcategory!",
    });
  }
};


exports.viewSubCategory = async (req, res) => {
  let categoryId = req.params.Cid;
  try {
    let categoryData = await productmodel.getCategoryById(categoryId);
    let categoryName = categoryData[0]?.category_name || "Unknown Category";

    // fetch subcategories
    let subcategories = await productmodel.getSubCategoriesByCategoryId(categoryId);
    if (subcategories && subcategories.length > 0) {
      res.status(200).json({
        categoryId,
        categoryName,
        subcategories,
      });
    } else {
      res.status(404).json({
        message: "No subcategories found",
        categoryId,
        categoryName,
        subcategories: [],
      });
    }
  } catch (err) {
    console.error("Error fetching subcategories:", err);
    res.status(500).json({
      message: "Error fetching subcategories",
      categoryId,
      categoryName: "Unknown",
      subcategories: [],
    });
  }
};


exports.deleteSubCatByID = async (req, res) => {
  try {
    const subCatId = req.params.Sid;
    const categoryId = req.params.Cid;

    // Delete the subcategory
    await productmodel.deleteSubCatByID(subCatId);

    // Fetch updated list after deletion
    const subcategories = await productmodel.getSubCategoriesByCategoryId(categoryId);

    res.json({
      success: true,
      msg: "Subcategory deleted successfully!",
      subcategories, // send updated list
      categoryId,
    });
  } catch (err) {
    console.error("Error deleting subcategory:", err);
    res.status(500).json({
      success: false,
      msg: "Error deleting subcategory!",
    });
  }
};


exports.updateSubCategoryPage = async (req, res) => {
  let category_Id = req.params.Cid;

  try {
    let result = await productmodel.getSubCategoryById(req.params.Sid);

    if (result && result.length > 0) {
      res.status(200).json({
        subcategory: result[0],
        category_Id: category_Id
      });
    } else {
      res.status(404).json({ message: "Sub category not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching subcategory." });
  }
};


exports.updateSubCategorySave = async (req, res) => {
  const subcategoryId = req.params.Sid;
  const oldCategoryId = req.params.Cid; // from URL params
  const { subcategory_name, categoryId: newCategoryId } = req.body; // from form body

  try {
    // Fetch current subcategory first
    const currentSubcategory = await productmodel.getSubCategoryById(subcategoryId);
    if (!currentSubcategory || !currentSubcategory[0]) {
      return res.status(404).json({ success: false, msg: "Subcategory not found!" });
    }

    // Use old image if no new image is uploaded
    const image = req.file ? req.file.filename : currentSubcategory[0].image;

    // Determine which category_id to use (new if provided, else old one)
    const finalCategoryId = newCategoryId || oldCategoryId;

    // Update subcategory
    const result = await productmodel.updatesavesubcategory(
      subcategoryId,
      subcategory_name,
      image,
      finalCategoryId
    );

    if (result && result.affectedRows > 0) {
      const updatedSubcategory = await productmodel.getSubCategoryById(subcategoryId);
      res.json({
        success: true,
        msg: "Subcategory updated successfully!",
        subcategory: updatedSubcategory[0],
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "Error updating subcategory! Maybe no changes were made.",
      });
    }
  } catch (err) {
    console.error("Error updating subcategory:", err);
    res.status(500).json({
      success: false,
      msg: "Error updating subcategory!",
    });
  }
};




exports.viewSubCategoryDetails = async (req, res) => {
  let subcategory_id = req.params.sid;
  let category_id = req.params.cid;

  try {
    let subcategory = await productmodel.getSubCategoryById(subcategory_id);

    if (subcategory && subcategory.length > 0) {
      res.json({
        success: true,
        data: subcategory[0],
        category_id: category_id
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Subcategory not found"
      });
    }
  } catch (err) {
    console.error("Error fetching subcategory details:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching subcategory details"
    });
  }
};


exports.addProductPage = (req, res) => {
    let promise = productmodel.getAllSubCategories();
    promise.then((subcategories) => {
        res.render("AddProduct.ejs", { subcategories,msg: null });
    }).catch((err) => {
        res.render("AddProduct.ejs", { subcategories:[],msg: null });
    });
}

exports.saveProduct = async (req, res) => {
    const {
        name,
        subcategoryId,
        brand,
        description,
        stockUnit,
        stock,
        price,
        discount,
        organic,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const created_at = new Date().toISOString().slice(0, 10);
    const updated_at = new Date().toISOString().slice(0, 10);

    try {
        const result = await productmodel.saveProduct(
            name,
            image,
            subcategoryId,
            brand,
            description,
            stockUnit,
            stock,
            price,
            discount,
            organic,
            created_at,
            updated_at
        );

        return res.status(200).json({
            msg: "Product saved successfully",
            data: result
        });

    } catch (err) {
        console.error("Error saving product:", err);
        return res.status(500).json({
            msg: "Error saving product",
            error: err.message
        });
    }
};




exports.viewProducts = async (req, res) => {
  try {
    const categories = await productmodel.getAllCategories();
    const subcategories = await productmodel.getAllSubCategories();

    // send JSON instead of rendering EJS
    res.json({
      success: true,
      categories,
      subcategories
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      categories: [],
      subcategories: []
    });
  }
};


exports.viewProductsBySubcategory = async (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  try {
    const products = await productmodel.getProductsBySubcategoryId(subcategoryId);

    // ✅ return JSON instead of rendering EJS
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Error fetching products." });
  }
};


exports.showProductDetails = async (req, res) => {
  const productId = req.params.product_id;
  try {
    const product = await productmodel.getProductById(productId);
    if (product) {
      res.status(200).json(product); 
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error("Error fetching product details:", err);
    res.status(500).json({ message: "Error fetching product details" });
  }
};

exports.getProBySubCat = async (req, res) => {
  const subCatId = req.params.Sid;

  try {
    const products = await productmodel.getProductsBySubcategoryId(subCatId);

    if (products && products.length > 0) {
      res.status(200).json({
        success: true,
        products: products,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No products found for this subcategory.",
      });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching product details.",
      error: err.message,
    });
  }
};


exports.updateProductPage = async (req, res) => {
  const productId = req.params.product_id;

  try {
    const product = await productmodel.getProductById(productId);
    const subcategories = await productmodel.getAllSubCategories();

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    res.render("UpdateProduct.ejs", { product, subcategories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading update page.");
  }
};

exports.updateProductSave = async (req, res) => {
  const productId = req.params.product_id;
  const {
    product_name,
    subcategory_id,
    brand,
    description,
    stock_unit,
    stock,
    price,
    discount,
    organic,
    product_image, // existing image string
  } = req.body;

  const image = req.file ? req.file.filename : product_image;

  try {
    const result = await productmodel.updateProductSave(
      productId,
      product_name,
      image,
      subcategory_id,
      brand,
      description,
      stock_unit,
      stock,
      price,
      discount,
      organic
    );

    if (result) {
      const updatedProduct = await productmodel.getProductById(productId);
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct[0],
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update product",
      });
    }
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating product",
      error: err.message,
    });
  }
};



exports.deleteProduct = async (req, res) => {
  const productId = req.params.product_id;

  try {
    const product = await productmodel.getProductById(productId);
    const subcategoryId = product.subcategory_id;
    const result = await productmodel.deleteProduct(productId);
    if (result) {
        const products = await productmodel.getProductsBySubcategoryId(subcategoryId);
       res.render("SubcategoryProducts.ejs", { products });
    } else {
      res.status(500).send("Error deleting product.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product.");
  }
};

exports.searchLiveProduct = async (req, res) => {
  const query = req.params.query;   // frontend कडून ?query=milk
  

  try {
    const products = await productmodel.searchLiveProducts(query);

    if (products && products.length > 0) {
      res.json({
        success: true,
        pro: products
      });
    } else {
      res.json({
        success: true,
        data: [],
        message: "No products found"
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error searching products."
    });
  }
};
