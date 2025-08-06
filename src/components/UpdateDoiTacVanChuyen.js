import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link, useParams } from "react-router-dom";

const UpdateDoiTacVanChuyen = () => {
    const { id } = useParams();
    const [ten, setTen] = useState("");
    const [hieuSuat, setHieuSuat] = useState(100);
    const [dieuKienHopTac, setDieuKienHopTac] = useState("");
    const [loading, setLoading] = useState(false);

    const [doiTacVanChuyen, setDoiTacVanChuyen] = useState({});

    const loadDoiTacVanChuyen = async () => {
        try {
            setLoading(true)
            let res = await authApis().get(endpoints['Chitiet-doitacvanchuyen'](id));
            setDoiTacVanChuyen(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                id,
                ten,
                hieuSuat,
                dieuKienHopTac
            };

            await authApis().post(endpoints['Ds-doitacvanchuyen'], payload);
            alert("Cập nhật đối tác vận chuyển thành công!");
            setTen("");
            setHieuSuat(100);
            setDieuKienHopTac("");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật đối tác vận chuyển!");
        }
    };

    useEffect(()=>{
        loadDoiTacVanChuyen();
    }, [id])

    useEffect(() => {
        if (doiTacVanChuyen && doiTacVanChuyen.id) {
            setTen(doiTacVanChuyen.ten || "");
            setHieuSuat(doiTacVanChuyen.hieuSuat || 0);
            setDieuKienHopTac(doiTacVanChuyen.dieuKienHopTac || "");
        }
    }, [doiTacVanChuyen]);

    return (
        <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to={`/ds-doitacvanchuyen/${id}`} className="btn btn-outline-primary btn-sm">Quay lại</Link>
            </Nav>
            <h2 className="mb-4">Cập nhật đối tác vận chuyển</h2>
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
                    Cập nhật
                </Button>
            </Form>
        </Container>
    );
}

export default UpdateDoiTacVanChuyen;