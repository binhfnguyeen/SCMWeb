import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authApis, endpoints } from "../configs/Apis";
import { Button, Col, Container, Form, Nav, Row, Spinner } from "react-bootstrap";

const NhanVienChiTietDonHangXuat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [donHang, setDonHang] = useState({});
    const [tinhTrang, setTinhTrang] = useState("");
    const [thoiGianDuKien, setThoiGianDukien] = useState("");
    const [thoiGianNhan, setThoiGianNhan] = useState("");
    const [loading, setLoading] = useState(false);

    const loadDonHang = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints["Chitiet-donhangxuat"](id));
            setDonHang(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDonHang();
    }, []);

    useEffect(() => {
        if (donHang && donHang.id) {
            setTinhTrang(donHang.tinhTrang || "");
            setThoiGianDukien(donHang.thoiGianDuKien || "");
            setThoiGianNhan(donHang.thoiGianNhan || "");
        }
    }, [donHang]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                id,
                tinhTrang,
                thoiGianDuKien,
                thoiGianNhan,
            };

            await authApis().post(endpoints['Update-donhangxuat'], payload);
            alert(`Cập nhật trạng thái đơn hàng ID ${id} thành công!`);
            navigate(`/Nhanvien/ds-donhang/vanchuyen`);
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật đơn hàng!");
        }
    };

    const tinhTrangOptions = [
        "Đang chuẩn bị",
        "Đang giao",
        "Đã giao",
        "Hủy đơn"
    ];

    return (
        <Container className="mt-5">
            <Nav className="justify-content-end mb-3">
                <Link to="/Nhanvien/ds-donhang/vanchuyen" className="btn btn-outline-secondary">Quay lại</Link>
            </Nav>

            <h3 className="text-center mb-4">Cập nhật trạng thái Đơn hàng #{id}</h3>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Form onSubmit={handleUpdate} className="shadow p-4 rounded bg-light">
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formTinhTrang">
                                <Form.Label><strong>Trạng thái giao</strong></Form.Label>
                                <Form.Select
                                    value={tinhTrang}
                                    onChange={(e) => setTinhTrang(e.target.value)}
                                    required
                                >
                                    <option value="">-- Chọn tình trạng --</option>
                                    {tinhTrangOptions.map((tt, idx) => (
                                        <option key={idx} value={tt}>{tt}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formThoiGianDuKien">
                                <Form.Label><strong>Thời gian dự kiến</strong></Form.Label>
                                <Form.Control
                                    type="date"
                                    value={thoiGianDuKien}
                                    onChange={(e) => setThoiGianDukien(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formThoiGianNhan">
                                <Form.Label><strong>Thời gian nhận</strong></Form.Label>
                                <Form.Control
                                    type="date"
                                    value={thoiGianNhan}
                                    onChange={(e) => setThoiGianNhan(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center mt-4">
                        <Button variant="primary" type="submit">
                            Lưu thay đổi
                        </Button>
                    </div>
                </Form>
            )}
        </Container>
    );
};

export default NhanVienChiTietDonHangXuat;
