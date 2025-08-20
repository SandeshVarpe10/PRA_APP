import ReactDom from 'react-dom'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'

import AdminDashboard from './component/AdminDashboard';
import Home from './component/Home'
import Login from './component/Login'
import AddProduct from './component/AddProduct';
import Register from './component/Register';
import AddCategory from './component/AddCategory';
import ViewProducts from './component/ViewProduct';
import ViewCategories from './component/ViewCategories';
import ProductByCat from './component/ProductByCat';
import ProductDetails from './component/ProductDetails';
import ViewSubcategory from './component/ViewSubCategory';
import UserDashboard from './component/UserDashboard';
import EditAdminProfile from './component/EditAdminProfile';
import ViewUsers from './component/ViewUsers';
import ViewCatDetail from './component/viewCatDetail';
import UpdateCategory from './component/UpdateCategory';
import UserProfile from './component/UserProfile';
import Cart from './component/Cart';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/adminDashboard' element={<AdminDashboard/>}></Route>
          <Route path='/userDashboard' element={<UserDashboard/>}></Route>
          <Route path='/edit-profile/:uid' element={<EditAdminProfile/>}></Route>
          <Route path='/add-product' element={<AddProduct/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/add-category' element={<AddCategory/>}></Route>
          <Route path='/view-product'  element={<ViewProducts/>}></Route>
          <Route path='/view-category'  element={<ViewCategories/>}></Route>
          <Route path='/products/:subcategoryId'  element={<ProductByCat/>}></Route>
          <Route path='/product/:product_id'  element={<ProductDetails/>}></Route>
          <Route path='/view-subcategories/:Cid'  element={<ViewSubcategory/>}></Route>
          <Route path='/get-users'  element={<ViewUsers/>}></Route>
          <Route path='/viewCategoryDetails/:id'  element={<ViewCatDetail/>}></Route>
          <Route path='/updateCategory/:id'  element={<UpdateCategory/>}></Route>
          <Route path='/user-profile'  element={<UserProfile/>}></Route>
          <Route path='/cart'  element={<Cart/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
