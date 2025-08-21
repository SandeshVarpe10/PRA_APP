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
import ProductList from './component/ProductList';
import UpdateSubCategory from './component/UpdateSubCategory';
import AddSubCategory from './component/AddSubCategory';
import ProtectedRoute from './component/ProtectedRoute';
import SearchPage from './component/SearchPage';
import UpdateProduct from './component/UpdateProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/adminDashboard' element={ <ProtectedRoute allowedTypes={["admin"]}><AdminDashboard /></ProtectedRoute>}/>
          <Route path='/userDashboard' element={ <ProtectedRoute allowedTypes={["user"]}><UserDashboard /></ProtectedRoute>}></Route>
          <Route path='/edit-profile/:uid' element={<EditAdminProfile/>}></Route>
          <Route path='/add-product' element={ <ProtectedRoute allowedTypes={["admin"]}><AddProduct /></ProtectedRoute>}/>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/add-category' element={<ProtectedRoute allowedTypes={["admin"]}><AddCategory/></ProtectedRoute>}></Route>
          <Route path='/view-product'  element={<ProtectedRoute allowedTypes={["admin"]}><ViewProducts/></ProtectedRoute>}></Route>
          <Route path='/view-category'  element={<ProtectedRoute allowedTypes={["admin"]}><ViewCategories/></ProtectedRoute>}></Route>
          <Route path='/products/:subcategoryId'  element={<ProductByCat/>}></Route>
          <Route path='/product/:product_id'  element={<ProductDetails/>}></Route>
          <Route path='/upd-product/:id'  element={<UpdateProduct/>}></Route>
          <Route path='/view-subcategories/:categoryId'  element={<ViewSubcategory/>}></Route>
          {/* <Route path='/get-users'  element={<ViewUsers/>}></Route> */}
          <Route path='/viewCategoryDetails/:id'  element={<ViewCatDetail/>}></Route>
          <Route path='/updateCategory/:id'  element={<UpdateCategory/>}></Route>
          <Route path='/product/:product_id'  element={<ProtectedRoute allowedTypes={["admin"]}><ProductDetails/></ProtectedRoute>}></Route>
          <Route path='/view-subcategories/:Cid'  element={<ProtectedRoute allowedTypes={["admin"]}><ViewSubcategory/></ProtectedRoute>}></Route>
          <Route path='/get-users'  element={<ProtectedRoute allowedTypes={["admin"]}><ViewUsers/></ProtectedRoute>}></Route>
          <Route path='/viewCategoryDetails/:id'  element={<ProtectedRoute allowedTypes={["admin"]}><ViewCatDetail/></ProtectedRoute>}></Route>
          <Route path='/updateCategory/:id'  element={<ProtectedRoute allowedTypes={["admin"]}><UpdateCategory/></ProtectedRoute>}></Route>
          <Route path='/user-profile'  element={<UserProfile/>}></Route>
          <Route path='/viewProBySubCat/:subCatId'  element={<ProductList/>}></Route>
          <Route path='/updatesubcategory/:Cid/:Sid'  element={<UpdateSubCategory/>}></Route>
          <Route path='/add-subcategory'  element={<AddSubCategory/>}></Route>
          <Route path='/cart'  element={<ProtectedRoute allowedTypes={["user"]}><Cart/></ProtectedRoute>}></Route>
          <Route path='/search-live' element={<SearchPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
