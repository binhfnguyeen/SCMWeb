import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "./Layout/MySpinner";
import { Card, Container, Nav } from "react-bootstrap";

const ChiTietVanChuyen = () => {
    const {id} = useParams();
    const [vanChuyen, setVanChuyen] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const loadVanChuyen = async () => {
        try {
            setLoading(true)
            let res = await Apis.get(endpoints['Chitiet-vanchuyen'](id));
            setVanChuyen(res.data);
        } catch (e){
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadVanChuyen();
    }, [id])

    return (
        <Container className="mt-4">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/ds-vanchuyen")}
            >
                Quay lại
            </button>
            <h2 className="mb-4">Chi tiết vận chuyển</h2>
            {loading ? (
                <div className="text-center">
                    <MySpinner />
                </div>
            ) : vanChuyen ? (
                <Card border="info" className="text-start">
                    <Card.Body>
                        <Card.Title>Vận chuyển #{vanChuyen.id}</Card.Title>
                        <Card.Text>
                            <strong>Tình trạng:</strong> {vanChuyen.tinhTrang} <br />
                            <strong>Số tiền:</strong> {vanChuyen.soTien?.toLocaleString()} VND <br />
                            <strong>Đối tác:</strong> {vanChuyen.iddoiTacVanChuyen?.ten} <br />
                            <strong>Hiệu suất:</strong> {vanChuyen.iddoiTacVanChuyen?.hieuSuat}% <br />
                            <strong>Điều kiện hợp tác:</strong> {vanChuyen.iddoiTacVanChuyen?.dieuKienHopTac}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>Không tìm thấy dữ liệu.</p>
            )}
            <Nav className="ms-auto align-items-center gap-2 mb-2 mt-2">
                <Link to={`/ds-vanchuyen/${id}/chinhsua-vanchuyen`} className="btn btn-success btn-sm">Chỉnh sửa chi tiết</Link>
            </Nav>
        </Container>
    );
}

export default ChiTietVanChuyen;