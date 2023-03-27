import axios from "axios";

const BASE_URL = "https://sellitwell.herokuapp.com/api/";
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
 const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGE4ZjA5MDJjMmIyMGUxMmYwZjE3ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTczODkzMywiZXhwIjoxNjc5OTk4MTMzfQ.o_BazSfIOt7BqJwMpJmngW7wkDaWFV9a37O6fud4YnM"

export const publicRequest = axios.create({
    baseURL:BASE_URL, 
})

export const userRequest = axios.create({
    baseURL:BASE_URL, 
    headers:{token: `Bearer ${TOKEN}`},
})