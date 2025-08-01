import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const ThemNhaCungCap = () => {
    const [ten, setTen] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [sdt, setSdt] = useState("");
    const [dieuKienThanhToan, setDieuKienThanhToan] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                ten,
                diaChi,
                sdt,
                dieuKienThanhToan
            };

            await authApis().post(endpoints['Them-nhacungcap'], payload);
            alert("Thêm nhà cung cấp thành công!");
            setTen("");
            setDiaChi("");
            setSdt("");
            setDieuKienThanhToan("");
            
        } catch (err) {
            console.error(err);
            alert("Lỗi khi thêm nhà cung cấp!");
        }
    };

    return (
         <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-nhacungcap" className="btn btn-outline-primary btn-sm">Quay lại</Link>
            </Nav>
            <h2 className="mb-4">Thêm nhà cung cấp</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formTen">
                            <Form.Label>Tên nhà cung cấp</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên"
                                value={ten}
                                onChange={(e) => setTen(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDiaChi">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ"
                                value={diaChi}
                                onChange={(e) => setDiaChi(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formSdt">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={sdt}
                                onChange={(e) => setSdt(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDieuKienThanhToan">
                            <Form.Label>Điều kiện thanh toán</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập điều kiện thanh toán"
                                value={dieuKienThanhToan}
                                onChange={(e) => setDieuKienThanhToan(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Thêm
                </Button>
            </Form>
        </Container>
    );
}

export default ThemNhaCungCap;