import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import { Card, Container, Nav } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";

const ChiTietNhaCungCap = () => {
    const { id } = useParams();
    const [nhaCungCap, setNhaCungCap] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadNhaCungCap = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Chitiet-nhacungcap'](id));
            setNhaCungCap(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadNhaCungCap();
    }, [id])

    return (
        <Container className="mt-5">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/ds-nhacungcap")}
            >
                Quay lại
            </button>
            <h2 className="text-center mb-4">Chi tiết Nhà cung cấp</h2>
            {loading ? (
                <div className="text-center">
                    <MySpinner />
                </div>
            ) : (
                <Card border="info" className="shadow-lg">
                    <Card.Body>
                        <Card.Title className="fw-bold fs-3 mb-3 text-primary">{nhaCungCap.ten}</Card.Title>
                        <Card.Text className="fs-5">
                            <strong>Địa chỉ:</strong> {nhaCungCap.diaChi}<br />
                            <strong>Số điện thoại:</strong> {nhaCungCap.sdt}<br />
                            <strong>Điều kiện thanh toán:</strong> {nhaCungCap.dieuKienThanhToan}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <Nav className="ms-auto align-items-center gap-2 mb-2 mt-2">
                <Link to={`/ds-nhacungcap/${id}/chinhsua-nhacungcap`} className="btn btn-success btn-sm">Chỉnh sửa chi tiết</Link>
            </Nav>
        </Container>
    );
}

export default ChiTietNhaCungCap;