import axios from "axios";
import cookie from 'react-cookies';

const BASE_URL = "http://localhost:8080/SupplyChainManagement/api/";

export const endpoints = {
    'register': '/users',
    'login': '/login',
    'profile': '/secure/profile',
    'Ds-donhangnhap': '/secure/ds-donhangnhap',
    'Chitiet-donhangnhap': (idDonHang)=>`/secure/ds-donhangnhap/${idDonHang}`,
    'Ds-kho': '/ds-kho',
    'Ds-vanchuyen': '/ds-vanchuyen',
    'Ds-nhacungcap': '/ds-nhacungcap',
    'Sanpham-Nhacungcap': (nccId)=>`/nhacungcap/${nccId}/sanpham`,
    'Them-donhangnhap': '/secure/donhangnhap',
    'Xuat-hoadonnhap': (dhID)=>`/secure/donhangnhap/${dhID}/xuat-hoadon`
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