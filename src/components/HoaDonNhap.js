import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link, useNavigate } from "react-router-dom";

const HoaDonNhap = () => {
    const [dsHoaDon, setDsHoaDon] = useState([]);
    const [idHoaDon, setIdHoaDon] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [fromPrice, setFromPrice] = useState();
    const [toPrice, setToPrice] = useState();
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    const loadDsHoaDon = async () => {
        let url = `${endpoints['Ds-hoadonnhap']}?page=${page}`;

        if (toPrice) {
            url += `&toPrice=${toPrice}`;
        }

        if (fromPrice) {
            url += `&fromPrice=${fromPrice}`;
        }

        try {
            setLoading(true);
            let res = await authApis().get(url);

            if (res.data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                if (page <= 1) {
                    setDsHoaDon(res.data);
                } else {
                    setDsHoaDon([...dsHoaDon, ...res.data]);
                }
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        let timer = setTimeout(() => {
            if (page > 0 && hasMore)
                loadDsHoaDon();
        }, 500);

        return () => clearTimeout(timer);
    }, [page, fromPrice, toPrice]);

    useEffect(() => {
        setPage(1);
    }, [fromPrice, toPrice]);

    const loadMore = () => {
        setPage(page + 1);
    }

    return (
        <Container className="mt-4">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/ds-donhangnhap")}
            >
                Quay lại
            </button>
            <h2 className="mb-4">Danh sách hóa đơn nhập</h2>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Control
                        type="number"
                        placeholder="Từ giá..."
                        value={fromPrice || ""}
                        onChange={e => setFromPrice(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        type="number"
                        placeholder="Đến giá..."
                        value={toPrice || ""}
                        onChange={e => setToPrice(e.target.value)}
                    />
                </Col>
            </Row>

            {loading && <MySpinner />}

            <Row>
                {dsHoaDon.length > 0 ? dsHoaDon.map((hd, idx) => (
                    <Col md={4} className="mb-3" key={idx}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Hóa đơn #{hd.id}</Card.Title>
                                <Card.Text>
                                    <strong>Đơn hàng:</strong> #{hd.idDonHang}<br />
                                    <strong>Tổng chi phí:</strong> {hd.tongChiPhi.toLocaleString()} VNĐ
                                </Card.Text>
                            </Card.Body>
                            <Link to={`/ds-hoadonnhap/${hd.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                        </Card>
                    </Col>
                )) : !loading && (
                    <Col>
                        <p className="text-muted">Không có hóa đơn nào.</p>
                    </Col>
                )}
            </Row>

            {dsHoaDon.length > 0 && hasMore > 0 && (
                <div className="text-center mt-3">
                    <Button onClick={loadMore} disabled={loading}>
                        {loading ? "Đang tải..." : "Tải thêm"}
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default HoaDonNhap;