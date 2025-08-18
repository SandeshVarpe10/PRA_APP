import axios from "axios";

class Service{
    getCategory(){
        return axios.get("http://localhost:3000/view-category");
    }
    getAllSubcategories() {
        return axios.get("http://localhost:3000/view-subcategory"); // or your actual endpoint
    }
    getSubCat(){
        return axios.get("http://localhost:3000/view-subcategory");
    }
    saveProduct(product){
        return axios.post("http://localhost:3000/productsave", product, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    }
    saveCategory(category){
        return axios.post("http://localhost:3000/savecategory",category);
    }
    deleteCategory(cid){
        return axios.get(`http://localhost:3000/deleteCategory/${cid}`);
    }

    getProduct(){
        return axios.get("http://localhost:3000/view-products");
    }
    getProductBySubCat(subcategoryId) {
        return axios.get(`http://localhost:3000/products/${subcategoryId}`);
    }
    getProductById(product_id) {
        return axios.get(`http://localhost:3000/product/${product_id}`);
    }
    getSubCatById(Cid){
        return axios.get(`http://localhost:3000/view-subcategories/${Cid}`);
    }
    getAllUsers(){
        return axios.get("http://localhost:3000/get-users");
    }
    getSingleCategory(cid){
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

}

export default new Service()