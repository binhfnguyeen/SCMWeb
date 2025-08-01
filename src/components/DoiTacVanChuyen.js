import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import MySpinner from "./Layout/MySpinner";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const DoiTacVanChuyen = () => {
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

    useEffect(()=>{
        loadDsDoiTacVanChuyen();
    }, [])

    return (
        <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-doitacvanchuyen/them-doitacvanchuyen" className="btn btn-outline-primary btn-sm">Thêm đối tác vận chuyển</Link>
            </Nav>
            <h2 className="mb-4">Danh sách đối tác vận chuyển</h2>
            {loading ? (
                <div className="text-center">
                    <MySpinner />
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {dsDoiTacVanChuyen.map((dt) => (
                        <Col key={dt.id}>
                            <Card border="primary" className="h-100">
                                <Card.Body className="text-start">
                                    <Card.Title>Đối tác: {dt.ten}</Card.Title>
                                    <Card.Text>
                                        <strong>Hiệu suất:</strong> {dt.hieuSuat}%<br />
                                        <strong>Điều kiện hợp tác:</strong> {dt.dieuKienHopTac}
                                    </Card.Text>
                                </Card.Body>
                                <Link to={`/ds-doitacvanchuyen/${dt.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default DoiTacVanChuyen;