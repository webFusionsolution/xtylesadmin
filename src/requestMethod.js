import axios from "axios";
const BASE_URL = "http://api.xtyles.in/api/";
const root = JSON.parse(localStorage.getItem("persist:root"));
 const getToken = () => {    
    let TOKEN = process.env.REACT_APP_TOKEN;
    return TOKEN;
}

export const publicRequest = axios.create({
    baseURL:BASE_URL, 
})

export const userRequest = axios.create({
    baseURL:BASE_URL, 
    headers:{token: `Bearer ${getToken()}`},
})

