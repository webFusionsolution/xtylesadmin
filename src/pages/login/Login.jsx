import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/apiCalls';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();


    const handleChange =(e)=>{
         e.preventDefault();
         login(dispatch,{username, password})
    }

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
      <button style={{padding:10, width:100, cursor:"pointer"}}  onClick={handleChange}>Login</button>
    </div>
  )
}

export default Login
