import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useState, useEffect } from "react";

function App() {
  const [admin, setAdmin] = useState(false);
  const isLocalStorage = localStorage.getItem("persist:root");


  useEffect(() => {
    if (isLocalStorage) {
      const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
      if(user.currentUser && user.currentUser.isAdmin) {
         user.currentUser.isAdmin ? setAdmin(true) : setAdmin(false);
      }
      
    }
  }, [isLocalStorage])


  return (
    <Routes>
      {!admin ?
        <>
           <Route path="/" element={<Login />} />
           <Route path="/login" element={<Login />} />
        </>       
        :
        <>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/users" element={ <UserList/> } />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/newproduct" element={<NewProduct />} />
        <Route path="/editproduct/:productId" element={<NewProduct />} />
        </>
     }
        
    </Routes>

    
  );
}

export default App;
