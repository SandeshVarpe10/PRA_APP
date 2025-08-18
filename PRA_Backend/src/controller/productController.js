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
    const { name, categoryId } = req.body;
    const image = req.file ? req.file.filename : null;
    let promise = productmodel.addSubCategoryPage(name, image,categoryId);
    promise.then((result) => {
            res.render("AddSubCategory.ejs", { msg:"Subcategory added successfully!", categoryId });
    }).catch((err) => {
        res.render("AddSubCategory.ejs", { msg:"Error adding subcategory!", categoryId });
    })
}

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




exports.deleteSubCatByID =  (req, res) => {
    let subCatId =req.params.Sid;
    let categoryId = req.params.Cid;
    let promise= productmodel.deleteSubCatByID(subCatId);
    promise.then((result)=>{
        let p= productmodel.getSubCategoriesByCategoryId(categoryId);
        p.then((r)=>{
            res.render("ViewSubCategory.ejs", { subcategories : r, categoryId, msg: "Sub category deleted successfully!" });
        })
        p.catch((err) => {
             res.status(404).send("Sub category not found.");
        });
    }).catch((err) => {
        res.status(500).send("Error fetching sub category details.");
    });
    
}

exports.updateSubCategoryPage = async (req, res) => {
    let category_Id = req.params.Cid;
    let promise = productmodel.getSubCategoryById(req.params.Sid);

    promise.then((result) => {
        if (result && result.length > 0) {
            res.render("UpdateSubCategory.ejs", { subcategory: result[0], msg: null, category_Id }); // pass first object
        } else {
            res.status(404).send("Sub category not found.");
        }
    }).catch((err) => {
        res.status(404).send("Sub category not found.");
    });
}


exports.updateSubCategorySave = async (req, res) => {
    const subcategoryId = req.params.Sid;
    const category_Id = req.params.Cid;
    const { subcategory_name } = req.body;
    const image = req.file ? req.file.filename : null;
    console.log("Updating subcategory with ID:", subcategoryId);
    console.log("New subcategory name:", subcategory_name);
    try {
        let categoryData = await productmodel.getCategoryById(category_Id);
        let categoryName = categoryData[0]?.category_name || "Unknown Category";
        const result = await productmodel.updatesavesubcategory(subcategoryId, subcategory_name, image);

        if (result && result.affectedRows > 0) {
            const updatedSubcategory = await productmodel.getSubCategoryById(subcategoryId);
            const categoryId = updatedSubcategory[0].category_id;

            const subcategories = await productmodel.getSubCategoriesByCategoryId(categoryId);
            res.render("ViewSubCategory.ejs", {
                subcategories,
                categoryId,
                categoryName,
                msg: "Subcategory updated successfully!"
            });
        } else {
            const subcategory = await productmodel.getSubCategoryById(subcategoryId);
            res.render("UpdateSubCategory.ejs", {
                subcategory: subcategory[0],
                msg: "Error updating subcategory!"
            });
        }
    } catch (err) {
        console.error("Error updating subcategory:", err);
        const subcategory = await productmodel.getSubCategoryById(subcategoryId);
        res.render("UpdateSubCategory.ejs", {
            subcategory: subcategory[0] || {},
            msg: "Error updating subcategory!"
        });
    }
};

exports.viewSubCategoryDetails = async (req, res) => {
    let subcategory_id = req.params.Sid;
    let category_id=req.params.Cid;
    try {
        let subcategory = await productmodel.getSubCategoryById (subcategory_id);
        if (subcategory && subcategory.length > 0) {
            res.render("ViewSubCategoryDetails.ejs", { subcategories: subcategory[0],category_id});
        } else {
            res.status(404).send("Category not found.");
        }
    } catch (err) {
        console.error("Error fetching category details:", err);
        res.status(500).send("Error fetching category details.");
    }
}
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
        if (products) {
            res.render('SubcategoryProducts.ejs', { products : products });
        } else {
            res.status(404).send("Product not found.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching product details.");
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
    name,
    subcategoryId,
    brand,
    description,
    stockUnit,
    stock,
    price,
    discount,
    organic,
    existingImage,
  } = req.body;

  const image = req.file ? req.file.filename : existingImage;

  try {
    const result = await productmodel.updateProductSave(
      productId,
      name,
      image,
      subcategoryId,
      brand,
      description,
      stockUnit,
      stock,
      price,
      discount,
      organic
    );

    if (result) {
      const updatedProduct = await productmodel.getProductById(productId);
      res.render("ProductDetails.ejs", { product: updatedProduct });
    } else {
      res.status(500).send("Error updating product.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving updated product.");
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