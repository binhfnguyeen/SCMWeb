import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../configs/Context";
import { authApis, endpoints } from "../configs/Apis";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MySpinner from "./Layout/MySpinner";

const ChiTietDonHangNhap = () => {
    const { id } = useParams();
    const [user,] = useContext(MyUserContext);
    const [donHang, setDonHang] = useState({
        tenNhanVien: "",
        diaChiKho: "",
        tinhTrang: "",
        tinhTrangVanChuyen: "",
        tongTien: 0,
        thoiGianDuKien: "",
        thoiGianNhan: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadDonHang = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints['Chitiet-donhangnhap'](id));
            setDonHang(res.data);
            console.info(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const handleXuatHoaDon = async () => {
        try {
            let res = await authApis().post(endpoints['Xuat-hoadonnhap'](id));
            alert("Xuất hóa đơn nhập thành công!");
            console.info("Hóa đơn đã xuất:", res.data);
            navigate("/ds-donhangnhap");
        } catch (ex) {
            console.error(ex);
            alert("Có lỗi khi xuất hóa đơn!");
        }
    }

    useEffect(() => {
        loadDonHang();
        console.info(`Don hang id ${id}`)
    }, [])

    return (
        <Container className="mt-4">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/ds-donhangnhap")}
            >
                Quay lại
            </button>
            <h3 className="mb-4">Thông tin đơn hàng #{donHang.id}</h3>

            {loading ? <MySpinner /> : (
                <>
                    <Row className="mb-3">
                        <Col md={6}>
                            <strong>Nhân viên phụ trách:</strong>
                            <p>{donHang.tenNhanVien}</p>
                        </Col>
                        <Col md={6}>
                            <strong>Địa chỉ kho:</strong>
                            <p>{donHang.diaChiKho}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <strong>Tình trạng đơn:</strong>
                            <p>{donHang.tinhTrang}</p>
                        </Col>
                        <Col md={6}>
                            <strong>Vận chuyển:</strong>
                            <p>{donHang.tinhTrangVanChuyen}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <strong>Thời gian dự kiến:</strong>
                            <p>{donHang.thoiGianDuKien}</p>
                        </Col>
                        <Col md={6}>
                            <strong>Thời gian nhận:</strong>
                            <p>{donHang.thoiGianNhan}</p>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <strong>Tổng tiền:</strong>
                            <p>{donHang.tongTien.toLocaleString()} VNĐ</p>
                        </Col>
                    </Row>

                    <hr />
                    <h5>Chi tiết sản phẩm:</h5>

                    {donHang.chiTiet && donHang.chiTiet.map((item, idx) => (
                        <Row className="mb-2" key={idx}>
                            <Col md={8}>
                                <p><strong>{item.tenSanPham}</strong></p>
                            </Col>
                            <Col md={4}>
                                <p>Số lượng: {item.soLuong}</p>
                            </Col>
                        </Row>
                    ))}

                    <div className="mt-4">
                        <button className="btn btn-success" onClick={handleXuatHoaDon} disabled={loading}>
                            {loading ? "Đang xử lý..." : "Xuất hóa đơn"}
                        </button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default ChiTietDonHangNhap;