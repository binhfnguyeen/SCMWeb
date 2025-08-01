import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link, useParams } from "react-router-dom";

const ThemDanhGia = () => {
    const {id} = useParams();
    const [chatLuong, setChatLuong] = useState(5);
    const [giaoHangDungHan, setGiaoHangDungHan] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                chatLuong,
                giaoHangDungHan,
                idnhaCungCap: {id: parseInt(id)}
            };

            await authApis().post(endpoints['Them-danhgia-nhacungcap'], payload);
            alert("Đánh giá nhà cung cấp thành công!");
            
            setChatLuong(5);
            setGiaoHangDungHan(false);
        } catch (err) {
            console.error(err);
            alert("Lỗi khi đánh giá nhà cung cấp!");
        }
    };

    return (
         <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to={`/ds-nhacungcap/${id}/ds-danhgia`} className="btn btn-outline-primary btn-sm">Quay lại</Link>
            </Nav>
            <h2 className="mb-4">Thêm đánh giá cho nhà cung cấp #{id}</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formChatLuong">
                            <Form.Label>Chất lượng (1 đến 5)</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                max={5}
                                value={chatLuong}
                                onChange={(e) => setChatLuong(parseInt(e.target.value))}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formGiaoHangDungHan">
                            <Form.Label>Giao hàng đúng hạn</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Có"
                                checked={giaoHangDungHan}
                                onChange={(e) => setGiaoHangDungHan(e.target.checked)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Gửi đánh giá
                </Button>
            </Form>
        </Container>
    );
}

export default ThemDanhGia;