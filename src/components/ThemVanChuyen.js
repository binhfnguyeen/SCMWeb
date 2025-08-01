import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const ThemVanChuyen = () => {
    const [tinhTrang, setTinhTrang] = useState("");
    const [soTien, setSoTien] = useState(0);
    const [iddoiTacVanChuyen, setIdDoiTacVanChuyen] = useState({});
    const [dsDoiTacVanChuyen, setDsDoiTacVanChuyen] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadDsDoiTacVanChuyen = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints['Ds-doitacvanchuyen']);
            setDsDoiTacVanChuyen(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                tinhTrang,
                soTien,
                iddoiTacVanChuyen: {
                    id: parseInt(iddoiTacVanChuyen)
                }
            };

            await authApis().post(endpoints['Them-vanchuyen'], payload);
            alert("Thêm vận chuyển thành công!");
            setTinhTrang("");
            setSoTien(0);
            setIdDoiTacVanChuyen("");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi thêm vận chuyển!");
        }
    };

    useEffect(()=>{
        loadDsDoiTacVanChuyen();
    }, []);

    return (
         <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-vanchuyen" className="btn btn-outline-primary btn-sm">Quay lại</Link>
            </Nav>
            <h2 className="mb-4">Thêm vận chuyển</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formTinhTrang">
                            <Form.Label>Tình trạng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tình trạng"
                                value={tinhTrang}
                                onChange={(e) => setTinhTrang(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formSoTien">
                            <Form.Label>Số tiền</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập số tiền"
                                value={soTien}
                                onChange={(e) => setSoTien(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formDoiTac">
                    <Form.Label>Đối tác vận chuyển</Form.Label>
                    {loading ? (
                        <MySpinner />
                    ) : (
                        <Form.Select
                            value={iddoiTacVanChuyen}
                            onChange={(e) => setIdDoiTacVanChuyen(e.target.value)}
                            required
                        >
                            <option value="">-- Chọn đối tác --</option>
                            {dsDoiTacVanChuyen.map(dt => (
                                <option key={dt.id} value={dt.id}>
                                    {`${dt.ten} - ${dt.hieuSuat}% - ${dt.dieuKienHopTac}`}
                                </option>
                            ))}
                        </Form.Select>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Thêm
                </Button>
            </Form>
        </Container>
    );
}

export default ThemVanChuyen;