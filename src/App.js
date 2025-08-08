import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home";
import { MyCartContext, MyUserContext } from "./configs/Context";
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import DonHangNhap from "./components/DonHangNhap";
import ChiTietDonHangNhap from "./components/ChiTietDonHangNhap";
import ThemDonHangNhap from "./components/ThemDonHangNhap";
import HoaDonNhap from "./components/HoaDonNhap";
import ChiTietHoaDonNhap from "./components/ChiTietHoaDonNhap";
import Kho from "./components/Kho";
import ChiTietKho from "./components/ChiTietKho";
import VanChuyen from "./components/VanChuyen";
import ChiTietVanChuyen from "./components/ChiTietVanChuyen";
import ThemVanChuyen from "./components/ThemVanChuyen";
import UpdateVanChuyen from "./components/UpdateVanChuyen";
import NhaCungCap from "./components/NhaCungCap";
import ChiTietNhaCungCap from "./components/ChiTietNhaCungCap";
import ThemNhaCungCap from "./components/ThemNhaCungCap";
import UpdateNhaCungCap from "./components/UpdateNhaCungCap";
import DanhGia from "./components/DanhGia";
import ThemDanhGia from "./components/ThemDanhGia";
import DoiTacVanChuyen from "./components/DoiTacVanChuyen";
import ChiTietDoiTacVanChuyen from "./components/ChiTietDoiTacVanChuyen";
import ThemDoiTacVanChuyen from "./components/ThemDoiTacVanChuyen";
import UpdateDoiTacVanChuyen from "./components/UpdateDoiTacVanChuyen";
import DonHangXuat from "./components/DonHangXuat";
import ChiTietDonHangXuat from "./components/ChiTietDonHangXuat";
import Cart from "./components/Cart";
import MyCartReducer from "./reducers/MyCartReducer";
import HoaDonXuat from "./components/HoaDonXuat";
import ChiTietHoaDonXuat from "./components/ChiTietHoaDonXuat";
import HoTroKhachhang from "./components/HoTroKhachHang";
import DsChatCSKH from "./components/DsChatCSKH";
import CSKHChatPage from "./components/CSKHChatPage";
import NhanVienDonHang from "./components/NhanVienDonHang";
import NhanVienChiTietDonHangXuat from "./components/NhanVienChiTietDonHangXuat";
import KhachHangDonHang from "./components/KhachHangDonHang";
import KhachHangChiTietDonHang from "./components/KhachHangChiTietDonHang";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ThemSanPham from "./components/ThemSanPham";
import cookie from 'react-cookies';
import { authApis, endpoints } from "./configs/Apis";

const App = () => {
  let [user, dispatch] = useReducer(MyUserReducer, null);
  let [cartCounter, cartDispatch] = useReducer(MyCartReducer, 0);

  useEffect(()=>{
    const loadUser = async () =>{
      const token = cookie.load('token');
      if(token){
        try{
          let res = await authApis().get(endpoints["profile"]);
          dispatch({
            type: "login",
            payload: res.data
          })
        } catch (err) {
          console.error("Không thể load user từ token: ", err);
          cookie.remove('token');
        }
      }
    }

    loadUser();
  }, []);

  return (
    <PayPalScriptProvider options={{ "client-id": "AVWMIgje4DokV20FBQMA4K4342piZKJXpqCvwhlchvAoP_2Ag7evD1LLOAKcRUtDjNOv16s9nV-osDx8" }}>
      <MyUserContext.Provider value={[user, dispatch]}>
        <MyCartContext.Provider value={[cartCounter, cartDispatch]}>
          <BrowserRouter>
            <Header />

          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/ds-donhangnhap" element={<DonHangNhap />}/>
              <Route path="/ds-donhangnhap/:id" element={<ChiTietDonHangNhap />}/>
              <Route path="/ds-donhangnhap/them-donhang" element={<ThemDonHangNhap />}/>
              <Route path="/ds-hoadonnhap" element={<HoaDonNhap />} />
              <Route path="/ds-hoadonnhap/:id" element={<ChiTietHoaDonNhap />} />
              <Route path="/ds-kho" element={<Kho />} />
              <Route path="/ds-kho/:id" element={<ChiTietKho />} />
              <Route path="/ds-vanchuyen" element={<VanChuyen />} />
              <Route path="/ds-vanchuyen/:id" element={<ChiTietVanChuyen />} />
              <Route path="/ds-vanchuyen/them-vanchuyen" element={<ThemVanChuyen />} />
              <Route path="/ds-vanchuyen/:id/chinhsua-vanchuyen" element={<UpdateVanChuyen />} />
              <Route path="/ds-nhacungcap" element={<NhaCungCap />}/>
              <Route path="/ds-nhacungcap/:id" element={<ChiTietNhaCungCap />} />
              <Route path="/ds-nhacungcap/them-nhacungcap" element={<ThemNhaCungCap />} />
              <Route path="/ds-nhacungcap/:id/chinhsua-nhacungcap" element={<UpdateNhaCungCap/>} />
              <Route path="/ds-nhacungcap/:id/themsanpham" element={<ThemSanPham/>} />
              <Route path="/ds-nhacungcap/:id/ds-danhgia" element={<DanhGia />}/>
              <Route path="/ds-nhacungcap/:id/them-danhgia" element={<ThemDanhGia />}/>
              <Route path="/ds-doitacvanchuyen" element={<DoiTacVanChuyen />} />
              <Route path="/ds-doitacvanchuyen/:id" element={<ChiTietDoiTacVanChuyen/>}/>
              <Route path="/ds-doitacvanchuyen/them-doitacvanchuyen" element={<ThemDoiTacVanChuyen/>}/>
              <Route path="/ds-doitacvanchuyen/:id/chinhsua-doitacvanchuyen" element={<UpdateDoiTacVanChuyen/>}/>
              <Route path="/ds-donhangxuat" element={<DonHangXuat/>}/>
              <Route path="/ds-donhangxuat/:id" element={<ChiTietDonHangXuat/>}/>
              <Route path="/ds-hoadonxuat" element={<HoaDonXuat/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/ds-hoadonxuat/:id" element={<ChiTietHoaDonXuat/>}/>
              <Route path="/hotrokhachhang" element={<HoTroKhachhang />} />
              <Route path="/cskh/danhsach" element={<DsChatCSKH />} />
              <Route path="/cskh/danhsach/:id" element={<CSKHChatPage />} />
              <Route path="/Nhanvien/ds-donhang/vanchuyen" element={<NhanVienDonHang />} />
              <Route path="/Khachhang/ds-donhang/vanchuyen" element={<KhachHangDonHang />} />
              <Route path="/Khachhang/ds-donhang/vanchuyen/:id" element={<KhachHangChiTietDonHang />} />
              <Route path="/Nhanvien/ds-donhang/vanchuyen/:id" element={<NhanVienChiTietDonHangXuat />} />
            </Routes>
          </Container>

            <Footer />
          </BrowserRouter>
        </MyCartContext.Provider>
      </MyUserContext.Provider>
    </PayPalScriptProvider>
  );
}

export default App;