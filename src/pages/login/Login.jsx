import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/apiCalls';
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);
   


    const handleClick =(e)=>{
         e.preventDefault();
         if(username === '' || password === ''){
            setError(true);
         }
         login(dispatch,{username, password});
         
   }
   useEffect(() => {
    if(user && user.username) {
      setError(false);
      navigate("/")
    }
   }, [user])
   

  return (
    <div style={
      {display: "flex", 
      alignItems:"center",
       justifyContent:"center",
        height:"100vh",
        flexDirection:"column"
        }}>
      <input style={{padding:10, marginBottom:20}} type="text" placeholder="username" onChange={e =>setUsername(e.target.value)}/>
      <input style={{padding:10, marginBottom:20}} type="password" placeholder="password" onChange={e =>setPassword(e.target.value)}/>
      {error && <p className='error'>Username or Password is incorrect</p>}
      <button style={{padding:10, marginTop:20, width:100, cursor:"pointer"}}  onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login
