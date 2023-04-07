import axios from "axios";

const BASE_URL = "http://api.xtyles.in/api/";
const isLocalStorage = localStorage.getItem("persist:root");
let TOKEN = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGE4ZjA5MDJjMmIyMGUxMmYwZjE3ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDcwNzM0MCwiZXhwIjoxNjgwOTY2NTQwfQ.i3IY_EC9imQoKc1rbHSA4fYAhF6ej5Xv2LmfUkx0EFs"

if(isLocalStorage) {
   const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
   if(user.currentUser && user.currentUser.accessToken)
     TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
}


export const publicRequest = axios.create({
    baseURL:BASE_URL, 
})

export const userRequest = axios.create({
    baseURL:BASE_URL, 
    headers:{token: `Bearer ${TOKEN}`},
})