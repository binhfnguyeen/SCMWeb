import { useEffect, useState } from "react";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateVanChuyen = () => {
    const { id } = useParams();
    const [tinhTrang, setTinhTrang] = useState("");
    const [soTien, setSoTien] = useState(0);
    const [iddoiTacVanChuyen, setIdDoiTacVanChuyen] = useState({});
    const [dsDoiTacVanChuyen, setDsDoiTacVanChuyen] = useState([]);
    const [vanChuyen, setVanChuyen] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadVanChuyen = async () => {
        try {
            setLoading(true)
            let res = await Apis.get(endpoints['Chitiet-vanchuyen'](id));
            setVanChuyen(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

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

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                id,
                tinhTrang,
                soTien,
                iddoiTacVanChuyen: {
                    id: parseInt(iddoiTacVanChuyen)
                }
            };

            await authApis().post(endpoints['Them-vanchuyen'], payload);
            alert(`Chỉnh sửa vận chuyển id ${id} thành công!`);
            navigate(`/ds-vanchuyen/${id}`)
        } catch (err) {
            console.error(err);
            alert("Lỗi khi chỉnh sửa vận chuyển!");
        }
    };

    useEffect(() => {
        loadVanChuyen();
        loadDsDoiTacVanChuyen();
    }, []);

    useEffect(() => {
        if (vanChuyen && vanChuyen.id) {
            setTinhTrang(vanChuyen.tinhTrang || "");
            setSoTien(vanChuyen.soTien || 0);
            setIdDoiTacVanChuyen(vanChuyen.iddoiTacVanChuyen?.id || "");
        }
    }, [vanChuyen]);

    return (
        <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to={`/ds-vanchuyen/${id}`} className="btn btn-outline-primary btn-sm">Quay lại</Link>
            </Nav>
            <h2 className="mb-4">Chỉnh sửa vận chuyển #{vanChuyen.id}</h2>
            <Form onSubmit={handleUpdate}>
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
                    Chỉnh sửa
                </Button>
            </Form>
        </Container>
    );
}

export default UpdateVanChuyen;