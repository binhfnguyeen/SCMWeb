import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../configs/Context";
import { authApis, endpoints } from "../configs/Apis";
import { Button, Card, Col, Container, Form, Nav, Row, Table } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const DonHangNhap = () => {
    const [user,] = useContext(MyUserContext);
    const [donHangNhap, setDonHangNhap] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState();
    const [page, setPage] = useState(1);

    const loadDsDonHangNhap = async () => {
        let url = `${endpoints['Ds-donhangnhap']}?page=${page}`;

        if (q) {
            url += `&kho=${q}`;
        }

        try {
            setLoading(true);
            let res = await authApis().get(url);

            if (res.data.length == 0 && page > 1) {
                setPage(0);
            } else {
                if (page <= 1) {
                    setDonHangNhap(res.data);
                } else {
                    setDonHangNhap([...donHangNhap, ...res.data]);
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
            if (page > 0)
                loadDsDonHangNhap();
        }, 500);

        return () => clearTimeout(timer);
    }, [page, q]);

    useEffect(() => {
        setPage(1);
    }, [q]);

    const loadMore = () => {
        setPage(page + 1);
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center text-success mb-4">Danh sách Đơn hàng nhập</h2>
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-donhangnhap/them-donhang" className="btn btn-outline-primary btn-sm">Thêm đơn hàng nhập</Link>
            </Nav>
            <Form>
                <Form.Group className="mb-3 mt-2">
                    <Form.Control value={q} onChange={e => setQ(e.target.value)} type="text" placeholder="Tìm kiếm đơn hàng theo kho..." />
                </Form.Group>
            </Form>
            <Row xs={1} md={2} lg={2} className="g-4">
                {donHangNhap.map((d) => (
                    <Col key={d.id}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title className="text-primary">Mã đơn hàng: #{d.id}</Card.Title>
                                <Card.Text><strong>Nhân viên:</strong> {d.tenNhanVien}</Card.Text>
                                <Card.Text><strong>Địa chỉ kho:</strong> {d.diaChiKho}</Card.Text>
                                <Card.Text><strong>Tình trạng:</strong> {d.tinhTrang}</Card.Text>
                                <Card.Text><strong>Vận chuyển:</strong> {d.tinhTrangVanChuyen}</Card.Text>
                                <Card.Text><strong>Tổng tiền:</strong> {d.tongTien.toLocaleString()} VNĐ</Card.Text>
                                <Card.Text><strong>Thời gian dự kiến:</strong> {d.thoiGianDuKien}</Card.Text>
                                <Card.Text><strong>Thời gian nhận:</strong> {d.thoiGianNhan}</Card.Text>
                                <Link to={`/ds-donhangnhap/${d.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                                {d.chiTiet && d.chiTiet.length > 0 ? (
                                    <>
                                        <h6 className="mt-3">Chi tiết sản phẩm:</h6>
                                        <Table bordered size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Số lượng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {d.chiTiet.map((c, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{c.tenSanPham}</td>
                                                        <td>{c.soLuong}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </>
                                ) : (
                                    <p className="text-muted mt-2">Không có sản phẩm nào.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {loading && <MySpinner />}

            {page > 0 && <div className="mt-2 mb-2 text-center">
                <Button variant="primary" onClick={loadMore}>Xem thêm...</Button>
            </div>}
        </Container>
    );
}

export default DonHangNhap;