let express = require("express");
let router = express.Router();
let userCtrl = require("../controller/userController");
let productCtrl = require("../controller/productController");
const cartController = require("../controller/cartController.js");

let upload = require("../middlware/PhotoUpload.js");
const { getUserFromToken } = require("../middlware/checkHomeToken.js");

//router.get("/", userCtrl.homePage);
//router.get("/login", userCtrl.LoginPage);
//router.get("/register", userCtrl.RegisterPage);
router.post("/registerdata", upload.single("photo"), userCtrl.SaveUserData);
router.post("/logindata", userCtrl.LoginUserData);
router.get("/Profile", getUserFromToken, userCtrl.getAdminProfile);
router.get("/UpdataAdminProfile/:uid",userCtrl.getAdminData)
router.put("/updatedData/:uid", userCtrl.saveUpdatedAdmin);

//router.get("/adminDashboard", getUserFromToken, userCtrl.adminDashboard);
router.get("/Adminlogout", userCtrl.logoutUser);
//router.get("/profile",getUserFromToken,userCtrl.ShowUserProfile);
router.get("/Profile", getUserFromToken, userCtrl.getAdminProfile);
router.get("/UpdataAdminProfile/:uid",userCtrl.getAdminData)
router.put("/updatedData/:uid", userCtrl.saveUpdatedAdmin);

//router.get("/adminDashboard", getUserFromToken, userCtrl.adminDashboard);
router.get("/Adminlogout", userCtrl.logoutUser);
//router.get("/profile",getUserFromToken,userCtrl.ShowUserProfile);


//user
router.get("/get-users",userCtrl.getAllUsers);

//category routes

router.get("/add-category", productCtrl.addCategoryPage);
router.post("/savecategory", productCtrl.saveCategory);
router.get("/view-category", productCtrl.viewCategory);
router.get("/searchProductByCategory", productCtrl.searchProductByCategory);
router.get("/deleteCategory/:Did", productCtrl.deleteCategory);
router.get("/updateCategory/:Uid", productCtrl.updateCategoryPage);
router.post("/updateSaveCategory", productCtrl.updateSaveCategory);
router.get("/viewCategoryDetails/:Cid", productCtrl.viewCategoryDetails);


//subcategory routes
router.get("/add-subcategory/:Cid", productCtrl.addSubCategoryPage);
router.get("/view-subcategory", productCtrl.getAllSubCat);
router.post("/subcategorysave",upload.single("image"), productCtrl.saveSubCategory);
router.get("/view-subcategories/:Cid", productCtrl.viewSubCategory);
router.get("/viewProBySubCat/:Sid",productCtrl.getProBySubCat);
router.get("/deleteSubCat/:Cid/:Sid",productCtrl.deleteSubCatByID);
router.get("/updatesubcategory/:Cid/:Sid", productCtrl.updateSubCategoryPage);
router.post("/subcategoryupdatesave/:Cid/:Sid", upload.single("image"), productCtrl.updateSubCategorySave);
router.get("/subcategorydetails/:Cid/:Sid", productCtrl.viewSubCategoryDetails);


//product routes
router.get("/add-product", productCtrl.addProductPage);
router.post("/productsave", upload.single("image"), productCtrl.saveProduct);
router.get("/view-products", productCtrl.viewProducts);
router.get('/products/:subcategoryId', productCtrl.viewProductsBySubcategory);
router.get('/product/:product_id', productCtrl.showProductDetails);
router.get('/search-live', productCtrl.liveSearch);
router.get("/updateProduct/:product_id", productCtrl.updateProductPage);
router.post("/productupdatesave/:product_id", upload.single("image"), productCtrl.updateProductSave);
router.get("/deleteProduct/:product_id", productCtrl.deleteProduct);


//cart routes
router.post("/cart/add", cartController.addToCart);
router.get("/cart/:userId", cartController.getCart);
router.delete("/cart/:userId/:productId", cartController.removeFromCart);
router.put("/cart/:userId/:productId", cartController.updateQuantity);

module.exports = router;
