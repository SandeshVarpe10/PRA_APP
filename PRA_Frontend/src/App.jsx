import './App.css'
import AdminDashboard from './component/AdminDashboard';
import Home from './component/Home'
import Login from './component/Login'
import AddProduct from './component/AddProduct';
import Register from './component/Register';

import ReactDom from 'react-dom'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddCategory from './component/AddCategory';
import ViewProducts from './component/ViewProduct';
import ViewCategories from './component/ViewCategories';
import ProductByCat from './component/ProductByCat';
import ProductDetails from './component/ProductDetails';
import ViewSubcategory from './component/ViewSubCategory';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/adminDashboard' element={<AdminDashboard/>}></Route>
          <Route path='/add-product' element={<AddProduct/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/add-category' element={<AddCategory/>}></Route>
          <Route path='/view-product'  element={<ViewProducts/>}></Route>
          <Route path='/view-category'  element={<ViewCategories/>}></Route>
          <Route path='/products/:subcategoryId'  element={<ProductByCat/>}></Route>
          <Route path='/product/:product_id'  element={<ProductDetails/>}></Route>
          <Route path='/view-subcategories/:Cid'  element={<ViewSubcategory/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
