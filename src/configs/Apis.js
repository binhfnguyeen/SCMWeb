import axios from "axios";
import cookie from 'react-cookies';

const BASE_URL = "http://localhost:8080/SupplyChainManagement/api/";

export const endpoints = {
    'register': '/users',
    'login': '/login',
    'profile': '/secure/profile'
}

export const authApis = () => axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${cookie.load('token')}`
    }
})

export default axios.create({
    baseURL: BASE_URL
})