import axios from "axios";
axios.defaults.withCredentials = true;
class Service{
    getCategory(){
        return axios.get("http://localhost:3000/view-category");
    }

    getSubCat(){
         return axios.get("http://localhost:3000/view-subcategory");
    }

    saveCategory(category){
        return axios.post("http://localhost:3000/savecategory",category);
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


    getLoginResult(credentials) {
        console.log("Sending login request with credentials:", credentials);
        return axios.post("http://localhost:3000/logindata", credentials,{ withCredentials: true });
    }

    getRegisterResult(userData) {
        return axios.post("http://localhost:3000/registerdata", userData);
    }

    getAdminProfile() {
       return axios.get("http://localhost:3000/Profile", { withCredentials: true });
   }
   
   getAdminData(uid){
    return axios.get(`http://localhost:3000/UpdataAdminProfile/${uid}`);
   }
   updateAdminData(uid, formData) {
      return axios.put(`http://localhost:3000/updatedData/${uid}`, formData);
   }

   handleLogout ()  {
    return axios.get("http://localhost:3000/Adminlogout", { withCredentials: true });
  }


  }


export default new Service()