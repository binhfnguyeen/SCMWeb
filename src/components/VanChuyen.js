import { useEffect, useState } from "react";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const VanChuyen = () => {
    const [dsVanChuyen, setDsVanChuyen] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadDsVanChuyen = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Ds-vanchuyen']);
            setDsVanChuyen(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadDsVanChuyen();
    }, [])

    const handleXoaVanChuyen = async (e, id) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa kho này?");
        if (!confirmDelete) return;

        try {
            let res = await authApis().delete(endpoints['Xoa-vanchuyen'](id));
            alert(`Xóa vận chuyển ${id} thành công!`);
            loadDsVanChuyen();
        } catch (e) {
            console.error(e);
            alert(`Xóa vận chuyển ${id} thất bại!`);
        }
    }

    return (
        <Container className="mt-4">
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-vanchuyen/them-vanchuyen" className="btn btn-outline-primary btn-sm">Thêm vận chuyển</Link>
            </Nav>
            <h2 className="mb-4">Danh sách vận chuyển</h2>
            {loading ? (
                <div className="text-center">
                    <MySpinner />
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {dsVanChuyen.map((vc) => (
                        <Col key={vc.id}>
                            <Card border="primary" className="h-100">
                                <Card.Body className="text-start">
                                    <Card.Title>Đối tác: {vc.iddoiTacVanChuyen.ten}</Card.Title>
                                    <Card.Text>
                                        <strong>Tình trạng:</strong> {vc.tinhTrang}<br />
                                        <strong>Số tiền:</strong> {vc.soTien.toLocaleString()} VND<br />
                                        <strong>Hiệu suất:</strong> {vc.iddoiTacVanChuyen.hieuSuat}%<br />
                                        <strong>Điều kiện hợp tác:</strong> {vc.iddoiTacVanChuyen.dieuKienHopTac}
                                    </Card.Text>
                                </Card.Body>
                                <Link to={`/ds-vanchuyen/${vc.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                                <button
                                    className="btn btn-danger mt-2 mb-2"
                                    onClick={(e)=>handleXoaVanChuyen(e, vc.id)}
                                >
                                    Xóa vận chuyển
                                </button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default VanChuyen;