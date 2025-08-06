import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const ThemDoiTacVanChuyen = () => {
    const [ten, setTen] = useState("");
    const [hieuSuat, setHieuSuat] = useState(100);
    const [dieuKienHopTac, setDieuKienHopTac] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                ten,
                hieuSuat,
                dieuKienHopTac
            };

            await authApis().post(endpoints['Ds-doitacvanchuyen'], payload);
            alert("Thêm đối tác vận chuyển thành công!");
            setTen("");
            setHieuSuat(100);
            setDieuKienHopTac("");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi thêm đối tác vận chuyển!");
        }
    };

    return (
         <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-doitacvanchuyen" className="btn btn-outline-primary btn-sm">Quay lại</Link>
            </Nav>
            <h2 className="mb-4">Thêm đối tác vận chuyển</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formTen">
                            <Form.Label>Tên đối tác vận chuyển</Form.Label>
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
                        <Form.Group controlId="formHieuSuat">
                            <Form.Label>Hiệu suất đối tác vận chuyển</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập hiệu suất"
                                min={0}
                                max={100}
                                value={hieuSuat}
                                onChange={(e) => setHieuSuat(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDieuKienHopTac">
                            <Form.Label>Điều kiện hợp tác</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập điều kiện hợp tác"
                                value={dieuKienHopTac}
                                onChange={(e) => setDieuKienHopTac(e.target.value)}
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

export default ThemDoiTacVanChuyen;