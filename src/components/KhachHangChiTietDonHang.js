import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authApis, endpoints } from "../configs/Apis";
import { Col, Container, Row, Card, Alert } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";

const KhachHangChiTietDonHang = () => {
    const { id } = useParams();
    const [donHang, setDonHang] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadDonHang = async () => {
        try {
            setLoading(true);
            const res = await authApis().get(endpoints["Chitiet-donhangxuat"](id));
            setDonHang(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDonHang();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return "Chưa cập nhật";
        const [year, month, day] = dateString.split("T")[0].split("-");
        return `${day}/${month}/${year}`;
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <MySpinner />
            </Container>
        );
    }

    if (!donHang) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">Không tìm thấy chi tiết đơn hàng #{id}</Alert>
                <Link to="/Khachhang/ds-donhang/vanchuyen" className="btn btn-outline-secondary">
                    Quay lại danh sách
                </Link>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Link to="/Khachhang/ds-donhang/vanchuyen" className="btn btn-outline-secondary mb-3">
                Quay lại danh sách
            </Link>

            <Card className="shadow-sm rounded-4 border-0">
                <Card.Body>
                    <h4 className="mb-4">Chi tiết Đơn hàng #{donHang.id}</h4>

                    <Row>
                        <Col md={6}>
                            <p>
                                <strong>Tổng tiền:</strong> {donHang.tongTien.toLocaleString()} VND
                            </p>
                            <p>
                                <strong>Trạng thái:</strong> {donHang.tinhTrang || "Chưa cập nhật"}
                            </p>
                            <p>
                                <strong>Thời gian dự kiến:</strong> {formatDate(donHang.thoiGianDuKien)}
                            </p>
                            <p>
                                <strong>Thời gian nhận:</strong> {formatDate(donHang.thoiGianNhan)}
                            </p>
                        </Col>
                        <Col md={6}>
                            <h5 className="mb-2">Thông tin khách hàng</h5>
                            <p>
                                <strong>Tên:</strong> {donHang.idkhachHang.ten}
                                <br />
                                <strong>Địa chỉ:</strong> {donHang.idkhachHang.diaChi}
                                <br />
                                <strong>Điện thoại:</strong> {donHang.idkhachHang.sdt}
                                <br />
                                <strong>Liên hệ:</strong> {donHang.idkhachHang.thongTinLienHe}
                            </p>

                            {donHang.idvanChuyen && (
                                <>
                                    <h5 className="mb-2">Thông tin vận chuyển</h5>
                                    <p>
                                        <strong>Đối tác:</strong>{" "}
                                        {donHang.idvanChuyen.iddoiTacVanChuyen.ten}
                                        <br />
                                        <strong>Trạng thái VC:</strong> {donHang.idvanChuyen.tinhTrang}
                                        <br />
                                        <strong>Phí VC:</strong>{" "}
                                        {donHang.idvanChuyen.soTien.toLocaleString()} VND
                                    </p>
                                </>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default KhachHangChiTietDonHang;