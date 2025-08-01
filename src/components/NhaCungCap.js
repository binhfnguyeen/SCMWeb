import { useEffect, useState } from "react";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const NhaCungCap = () => {
    const [dsNhaCungCap, setDsNhaCungCap] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadDsNhaCungCap = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Ds-nhacungcap']);
            setDsNhaCungCap(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const handleDelNhaCungCap = async (e, id) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?");
        if (!confirmDelete) return;

        try {
            let res = await authApis().delete(endpoints['Xoa-nhacungcap'](id));
            alert("Xóa nhà cung cấp thành công!");
            loadDsNhaCungCap();
        } catch (ex) {
            console.error(ex);
            alert("Xóa nhà cung cấp thất bại!");
        }
    };

    useEffect(() => {
        loadDsNhaCungCap();
    }, []);

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">Danh sách Nhà cung cấp</h2>
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-nhacungcap/them-nhacungcap" className="btn btn-outline-primary btn-sm">Thêm nhà cung cấp</Link>
            </Nav>
            {loading ? (
                <div className="text-center">
                    <MySpinner />
                </div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={3} className="g-4">
                    {dsNhaCungCap.map((ncc) => (
                        <Col key={ncc.id}>
                            <Card border="primary" className="h-100 shadow">
                                <Card.Body>
                                    <Card.Title className="fw-bold">{ncc.ten}</Card.Title>
                                    <Card.Text>
                                        <strong>Địa chỉ:</strong> {ncc.diaChi}<br />
                                        <strong>SĐT:</strong> {ncc.sdt}<br />
                                        <strong>Thanh toán:</strong> {ncc.dieuKienThanhToan}
                                    </Card.Text>
                                </Card.Body>
                                <Link to={`/ds-nhacungcap/${ncc.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                                <Link to={`/ds-nhacungcap/${ncc.id}/ds-danhgia`} className="btn btn-success btn-sm mt-2">Xem đánh giá</Link>
                                <button
                                    className="btn btn-danger mt-2 mb-2"
                                    onClick={(e)=>handleDelNhaCungCap(e, ncc.id)}
                                >
                                    Xóa nhà cung cấp
                                </button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default NhaCungCap;