import axios from "axios";

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
}

export default new Service()