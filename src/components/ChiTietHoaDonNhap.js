import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authApis, endpoints } from "../configs/Apis";
import { Card, Container } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";

const ChiTietHoaDonNhap = () => {
    const { id } = useParams();
    const [hoaDon, setHoaDon] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadHoaDon = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints['Chitiet-hoadonnhap'](id));
            setHoaDon(res.data);
            console.info(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadHoaDon();
    }, [id])

    return (
        <Container className="mt-4">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/ds-hoadonnhap")}
            >
                Quay lại
            </button>
            <h2>Chi tiết hóa đơn nhập #{id}</h2>
            {loading ? (
                <div className="text-center mt-4">
                    <MySpinner />
                </div>
            ) : (
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Hóa đơn #{hoaDon.id}</Card.Title>
                        <Card.Text>
                            <strong>Đơn hàng:</strong> #{hoaDon.idDonHang}<br />
                            <strong>Tổng chi phí:</strong> {hoaDon.tongChiPhi?.toLocaleString()} VNĐ
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default ChiTietHoaDonNhap;