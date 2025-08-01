import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Apis, { authApis, endpoints } from "../configs/Apis";
import MySpinner from "./Layout/MySpinner";
import { Card, Container, Nav } from "react-bootstrap";
import ChiTietVanChuyen from "./ChiTietVanChuyen";

const ChiTietDoiTacVanChuyen = () => {
    const {id} = useParams();
    const [doiTacVanChuyen, setDoiTacVanChuyen] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const loadDoiTacVanChuyen = async () => {
        try {
            setLoading(true)
            let res = await authApis().get(endpoints['Chitiet-doitacvanchuyen'](id));
            setDoiTacVanChuyen(res.data);
        } catch (e){
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadDoiTacVanChuyen();
    }, [id])

    return (
        <Container className="mt-4">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/ds-doitacvanchuyen")}
            >
                Quay lại
            </button>
            <h2 className="mb-4">Chi tiết đối tác: #{id}</h2>
            {loading ? (
                <div className="text-center">
                    <MySpinner />
                </div>
            ) : doiTacVanChuyen ? (
                <Card border="info" className="text-start">
                    <Card.Body>
                        <Card.Title>Đối tác vận chuyển #{doiTacVanChuyen.ten}</Card.Title>
                        <Card.Text>
                            <strong>Hiệu suất:</strong> {doiTacVanChuyen.hieuSuat}% <br />
                            <strong>Điều kiện hợp tác:</strong> {doiTacVanChuyen.dieuKienHopTac}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>Không tìm thấy dữ liệu.</p>
            )}
            <Nav className="ms-auto align-items-center gap-2 mb-2 mt-2">
                <Link to={`/ds-doitacvanchuyen/${id}/chinhsua-doitacvanchuyen`} className="btn btn-success btn-sm">Chỉnh sửa chi tiết</Link>
            </Nav>
        </Container>
    );
}

export default ChiTietDoiTacVanChuyen;