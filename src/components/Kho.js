import { useEffect, useState } from "react";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const Kho = () => {
    const [dsKho, setDsKho] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [diaChi, setDiaChi] = useState("");


    const loadDsKho = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Ds-kho']);
            setDsKho(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const handleAddKho = async (e) => {
        e.preventDefault();
        try {
            let res = await authApis().post(endpoints['Them-kho'], { diaChi });
            setDiaChi("");
            showForm(false);
        } catch (ex) {
            console.error(ex);
        }
    }

    const handleDelKho = async (e, id) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa kho này?");
        if (!confirmDelete) return;

        try {
            let res = await authApis().delete(endpoints['Xoa-kho'](id));
            alert("Xóa kho thành công!");
            loadDsKho();
        } catch (ex) {
            console.error(ex);
            alert("Xóa kho thất bại!");
        }
    };

    useEffect(() => {
        loadDsKho();
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => {
            loadDsKho();
        }, 3000);
        return () => clearTimeout(timer);
    }, [diaChi]);

    return (
        <Container className="mt-4">
            <h2>Danh sách kho</h2>
            <Nav className="ps-2 mt-2 mb-2">
                <Button variant="outline-primary" size="sm" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Đóng lại" : "Thêm kho"}
                </Button>
            </Nav>

            {showForm && (
                <Form onSubmit={handleAddKho} className="mb-4 ps-2">
                    <Form.Group className="mb-2" controlId="formDiaChi">
                        <Form.Label>Địa chỉ kho</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa chỉ kho"
                            value={diaChi}
                            onChange={(e) => setDiaChi(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">Lưu</Button>
                </Form>
            )}

            {loading ? (
                <div className="text-center my-5">
                    <MySpinner />
                </div>
            ) : (
                <Row>
                    {dsKho.map((kho) => (
                        <Col md={6} lg={4} className="mb-4" key={kho.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Kho #{kho.id}</Card.Title>
                                    <Card.Text>
                                        <strong>Địa chỉ:</strong> {kho.diaChi}
                                    </Card.Text>
                                </Card.Body>
                                <Link to={`/ds-kho/${kho.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                                <button
                                    className="btn btn-danger mt-2 mb-2"
                                    onClick={(e)=>handleDelKho(e, kho.id)}
                                >
                                    Xóa kho
                                </button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Kho;