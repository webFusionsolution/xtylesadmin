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
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const [admin, setAdmin] = useState(false);
  const user = useSelector(state => state.user.currentUser);


  useEffect(() => {
    if(user){
        user.isAdmin ? setAdmin(true) : setAdmin(false);
    }
  }, [user])


  return (
    <Routes>
    { console.log(admin)}
      {!admin ?
        <>
           <Route exact path="/" element={<Login />} />
           <Route path="/login" element={<Login />} />
        </>       
        :
        <>
        <Route exact path="/" element={<Home />} />
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
