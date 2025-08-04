import axios from "axios";
import cookie from 'react-cookies';

const BASE_URL = "http://localhost:8080/SupplyChainManagement/api/";

export const endpoints = {
    'register': '/users',
    'login': '/login',
    'profile': '/secure/profile',
    'sanpham':'/ds-sanpham',
    'order':"/secure/DonHangXuat",
    'Ds-donhangnhap': '/secure/ds-donhangnhap',
    'Ds-donhangxuat':'/secure/DonHangXuat',
    'Chitiet-donhangxuat':(idDonHang)=>`/secure/DonHangXuat/${idDonHang}`,
    'Chitiet-donhangnhap': (idDonHang)=>`/secure/ds-donhangnhap/${idDonHang}`,
    'Sanpham-donhangxuat':(idDonHang)=>`/secure/SpDonHangXuat/${idDonHang}`,
    'Ds-kho': '/ds-kho',
    'Them-kho': '/secure/ds-kho',
    'Chitiet-kho': (idKho)=>`/ds-kho/${idKho}`,
    'Xoa-kho': (idKho)=>`/secure/ds-kho/${idKho}`,
    'Kho-chitiet-sanpham': (idKho)=>`/kho/${idKho}/sanpham`,
    'Ds-vanchuyen': '/ds-vanchuyen',
    'Chitiet-vanchuyen': (vcId) => `/ds-vanchuyen/${vcId}`,
    'Them-vanchuyen': '/secure/ds-vanchuyen',
    'Xoa-vanchuyen': (vcId) => `/secure/ds-vanchuyen/${vcId}`,
    'Ds-nhacungcap': '/ds-nhacungcap',
    'Chitiet-nhacungcap': (nccId) => `/ds-nhacungcap/${nccId}`,
    'Them-nhacungcap': '/secure/ds-nhacungcap',
    'Ds-danhgia-nhacungcap': (nccId) => `/secure/nhacungcap/${nccId}/danhgia`,
    'Them-danhgia-nhacungcap': "/secure/danhgia",
    'Xoa-nhacungcap': (nccId)=>`/secure/ds-nhacungcap/${nccId}`,
    'Sanpham-Nhacungcap': (nccId)=>`/nhacungcap/${nccId}/sanpham`,
    'Them-donhangnhap': '/secure/donhangnhap',
    'Xuat-hoadonnhap': (dhID)=>`/secure/donhangnhap/${dhID}/xuat-hoadon`,
    'Xuat-hoadonxuat': (dhID)=>`/secure/donhangxuat/${dhID}/xuat-hoadon`,
    'Ds-hoadonnhap': '/secure/ds-hoadonnhap',
    'Chitiet-hoadonnhap': (hdID) => `/secure/ds-hoadonnhap/${hdID}`,
    'Ds-doitacvanchuyen': '/secure/DoiTacVanChuyen',
    'Chitiet-doitacvanchuyen': (dtId) => `/DoiTacVanChuyen/${dtId}`,
    'Ds-hoadonxuat':`/secure/ds-hoadonxuat`,
    'Chitiet-hoadonxuat':(hdID)=>`/secure/ds-hoadonxuat/${hdID}`,
    'HoadonPaypal':(dhID)=>`/secure/hoadonxuat/${dhID}`,
    "Them-sp-ncc":'/secure/nhacungcap/sanpham',
    'addsanpham':'/secure/ds-sanpham',
    'User-cskh': "/users/cskh",
    'Nhanvien-donhang': (nvId) => `/secure/Nhanvien/${nvId}/don-hang`,
    'Khachhang-donhang': (khId) => `/secure/Khachhang/${khId}/don-hang`,
    'Chitiet-donhangxuat': (dhId) => `secure/DonHangXuat/${dhId}`,
    'Update-donhangxuat': "secure/donhangxuat/part-update"
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