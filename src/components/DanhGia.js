import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authApis, endpoints } from "../configs/Apis";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";

const DanhGia = () => {
    const {id} = useParams();
    const [dsDanhGia, setDsDanhGia] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadDsDanhGia = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints['Ds-danhgia-nhacungcap'](id));
            setDsDanhGia(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        loadDsDanhGia();
    }, [id])

    return (
        <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-nhacungcap" className="btn btn-outline-primary btn-sm">Quay lại</Link>
            </Nav>
            <h3 className="text-center mb-4">Đánh giá Nhà cung cấp</h3>
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to={`/ds-nhacungcap/${id}/them-danhgia`} className="btn btn-outline-primary btn-sm">Đánh giá nhà cung cấp</Link>
            </Nav>
            {loading ? (
                <div className="text-center">
                    <MySpinner />
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {dsDanhGia.map((dg) => (
                        <Col key={dg.id}>
                            <Card className="h-100 shadow border-success">
                                <Card.Body>
                                    <Card.Title className="fw-bold">Đánh giá #{dg.id}</Card.Title>
                                    <Card.Text>
                                        <strong>Chất lượng:</strong> {dg.chatLuong}/5<br />
                                        <strong>Giao hàng đúng hạn:</strong>{" "}
                                        {dg.giaoHangDungHan ? "Có" : "Không"}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default DanhGia;