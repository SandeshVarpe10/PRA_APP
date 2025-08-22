import axios from "axios";
axios.defaults.withCredentials = true;
class Service {
  getCategory() {
    return axios.get("http://localhost:3000/view-category");
  }
  getAllSubcategories() {
    return axios.get("http://localhost:3000/view-subcategory"); 
  }
  getSubCat() {
    return axios.get("http://localhost:3000/view-subcategory");
  }
  updSubCategoryById(Cid, Sid, formData) {
  return axios.post(`http://localhost:3000/updatesubcategory/${Cid}/${Sid}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

}

getSubCatBySid(Sid) {
  return axios.get(`http://localhost:3000/view-subcategory/${Sid}`);
}

  
  saveSubCategory(subcategory) {
  return axios.post("http://localhost:3000/subcategorysave", subcategory, {
    headers: { "Content-Type": "multipart/form-data" },
  });
} 
  deleteSubCat(Cid, Sid){
    return axios.get(`http://localhost:3000/deleteSubCat/${Cid}/${Sid}`);
  }
 getSubCatById(Sid) {
    return axios.get(`http://localhost:3000/view-subcategories/${Sid}`);
  }

  saveProduct(product) {
    return axios.post("http://localhost:3000/productsave", product, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  saveCategory(category) {
    return axios.post("http://localhost:3000/savecategory", category);
  }
  deleteCategory(cid) {
    return axios.get(`http://localhost:3000/deleteCategory/${cid}`);
  }

  getProduct() {
    return axios.get("http://localhost:3000/view-products");
  }
  getProductBySubCat(subcategoryId) {
    return axios.get(`http://localhost:3000/products/${subcategoryId}`);
  }
  deleteProduct(product_id) {
    return axios.get(`http://localhost:3000/deleteProduct/${product_id}`);
  }
  updateProduct(product_id,data){
    return axios.post(`http://localhost:3000/productupdatesave/${product_id}`,data);
  }
  getProductById(product_id) {
    return axios.get(`http://localhost:3000/product/${product_id}`);
  }
  getAllUsers() {
    return axios.get("http://localhost:3000/get-users");
  }
  getSingleCategory(cid) {
    return axios.get(`http://localhost:3000/viewCategoryDetails/${cid}`);
  }
  // get category by id
  getCategoryById(id) {
    return axios.get(`http://localhost:3000/updateCategory/${id}`);
  }

  // update category
  updateCategory(data) {
    return axios.post("http://localhost:3000/updateSaveCategory", data);
  }

  getLoginResult(credentials) {
    console.log("Sending login request with credentials:", credentials);
    return axios.post("http://localhost:3000/logindata", credentials, {
      withCredentials: true,
    });
  }

    getRegisterResult(userData) {
  return axios.post("http://localhost:3000/registerdata", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

  getAdminProfile() {
    return axios.get("http://localhost:3000/Profile", {
      withCredentials: true,
    });
  }

  getAdminData(uid) {
    return axios.get(`http://localhost:3000/UpdataAdminProfile/${uid}`);
   }
   updateAdminData(uid, formData) {
    return axios.put(`http://localhost:3000/updatedData/${uid}`, formData,{
       headers: {
      "Content-Type": "multipart/form-data",
    },
    });
   }

  handleLogout() {
    return axios.get("http://localhost:3000/Adminlogout", {
      withCredentials: true,
    });
  }

  getUserHistory(userId) {
    let promise= axios.get(`http://localhost:3000/userHistory/${userId}`);
    console.log("ppp",promise);
    return promise;
  }
  deleteUser(userId){
      return axios.get(`http://localhost:3000/delete-user/${userId}`);
  }

  // 2️⃣ Recommendations based on CBF
  getRecommendations(userId) {
  
    return axios.get(`http://localhost:3000/recommendations/${userId}`);
  }
  searchProducts(query){
    return axios.get(`http://localhost:3000/searchProduct/${query}`);
  }

  }


export default new Service();
