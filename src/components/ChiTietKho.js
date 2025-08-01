import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";

const ChiTietKho = () => {
    const { id } = useParams();
    const [kho, setKho] = useState({});
    const [loading, setLoading] = useState(false);
    const [sanPham, setSanPham] = useState([]);
    const navigate = useNavigate();

    const loadKho = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Chitiet-kho'](id));
            setKho(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const loadKhoSanPham = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Kho-chitiet-sanpham'](id));
            setSanPham(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useState(() => {
        loadKho();
        loadKhoSanPham();
    }, [id])

    return (
        <Container className="mt-4">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/ds-kho")}
            >
                Quay lại
            </button>
            <h2>Chi tiết kho</h2>

            {loading ? (
                <div className="text-center my-5">
                    <MySpinner />
                </div>
            ) : (
                <>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Kho #{kho.id}</Card.Title>
                            <Card.Text>
                                <strong>Địa chỉ:</strong> {kho.diaChi}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <h4>Sản phẩm trong kho</h4>
                    <Row>
                        {sanPham.map((sp) => (
                            <Col key={sp.id} md={6} lg={4} className="mb-4">
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={sp.idsanPham.hinh}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{sp.idsanPham.ten}</Card.Title>
                                        <Card.Text>
                                            <strong>Số lượng:</strong> {sp.soLuong}<br />
                                            <strong>Hạn sử dụng:</strong> {sp.hanSuDung}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
}

export default ChiTietKho;