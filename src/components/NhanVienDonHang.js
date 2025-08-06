import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../configs/Context";
import { authApis, endpoints } from "../configs/Apis";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const NhanVienDonHang = () => {
    const [user] = useContext(MyUserContext);
    const [dsDonHang, setDsDonHang] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadDsDonHang = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints["Nhanvien-donhang"](user.nhanvien?.id));
            setDsDonHang(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDsDonHang();
    }, []);

    const formatDate = (dateValue) => {
        try {
            if (!dateValue) return "Chưa cập nhật";
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) return "Định dạng sai";
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch {
            return "Lỗi định dạng";
        }
    };

    return (
        <Container className="mt-4">
            <h3 className="text-center mb-4">Danh sách đơn hàng</h3>

            {loading ? (
                <div className="text-center my-5">
                    <MySpinner />
                </div>
            ) : (
                <>
                    {(!dsDonHang || dsDonHang.length === 0) ? (
                        <Alert variant="info" className="text-center">
                            Không có đơn hàng nào!
                        </Alert>
                    ) : (
                        <Row className="g-4">
                            {dsDonHang.map((dh) => (
                                <Col md={6} lg={4} key={dh.id}>
                                    <Card className="shadow-sm h-100 border-0 rounded-4">
                                        <Card.Body>
                                            <Card.Title className="mb-3">
                                                <strong>Đơn hàng #{dh.id}</strong>
                                            </Card.Title>

                                            <div className="mb-2">
                                                <strong>Tổng tiền:</strong> {dh.tongTien.toLocaleString()} VND
                                            </div>
                                            <div className="mb-2">
                                                <strong>Trạng thái giao:</strong> {dh.tinhTrang}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Thời gian nhận:</strong> {formatDate(dh.thoiGianNhan)}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Dự kiến giao:</strong> {formatDate(dh.thoiGianDuKien)}
                                            </div>
                                            <hr />
                                            <div className="mb-2">
                                                <strong>Khách hàng:</strong><br />
                                                {dh.idkhachHang.ten}<br />
                                                {dh.idkhachHang.diaChi}<br />
                                                SĐT: {dh.idkhachHang.sdt}<br />
                                                {dh.idkhachHang.thongTinLienHe}
                                            </div>

                                            <div className="text-end mt-3">
                                                <Link
                                                    to={`/Nhanvien/ds-donhang/vanchuyen/${dh.id}`}
                                                    className="btn btn-outline-primary"
                                                >
                                                    Cập nhật trạng thái đơn hàng
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
        </Container>
    );
};

export default NhanVienDonHang;
