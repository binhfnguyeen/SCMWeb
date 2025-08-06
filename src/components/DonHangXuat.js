import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../configs/Context";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { Button, Card, Col, Container, Form, Nav, Row, Table } from "react-bootstrap";
import MySpinner from "./Layout/MySpinner";
import { Link } from "react-router-dom";

const DonHangXuat = () => {
    const [user,] = useContext(MyUserContext);
    const [donHangXuat, setDonHangXuat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [Dhx,setDhx]=useState({});

    const loadDsDonHangXuat = async () => {
        let url = `${endpoints['Ds-donhangxuat']}?page=${page}`;

        if (q) {
            url += `&kho=${q}`;
        }

        try {
            setLoading(true);
            let res = await authApis().get(url);
            if (res.data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                if (page <= 1) {
                    setDonHangXuat(res.data);
                } else {
                    setDonHangXuat([...donHangXuat, ...res.data]);
                }
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
            console.info(donHangXuat);
        }
    }

    const loadChiTietDonHangXuat= async (idDhx)=>{
        let url=`${endpoints['Chitiet-donhangxuat'](idDhx)}`;

        try{
            setLoading(true)
            let res =await authApis().get(url);
            setDhx(res.data)
        }catch(ex){
            console.info(ex)
        }finally{
            setLoading(false)
            console.info(Dhx)
        }
        

    }

    useEffect(() => {
        setLoading(true);
        let timer = setTimeout(() => {
            if (page > 0 && hasMore)
                loadDsDonHangXuat();
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
            <h2 className="text-center text-success mb-4">Danh sách Đơn hàng xuất</h2>
            <Nav className="ms-auto align-items-center gap-2 mb-2">
                <Link to="/ds-hoadonxuat" className="btn btn-outline-primary btn-sm">Danh sách hóa đơn xuất</Link>
            </Nav>
            <Form>
                <Form.Group className="mb-3 mt-2">
                    <Form.Control value={q} onChange={e => setQ(e.target.value)} type="text" placeholder="Tìm kiếm đơn hàng theo kho..." />
                </Form.Group>
            </Form>
            <Row xs={1} md={2} lg={2} className="g-4">
                {donHangXuat.map((d) => (
                    <Col key={d.id}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title className="text-primary">Mã đơn hàng: #{d.id}</Card.Title>
                                <Card.Text><strong>Nhân viên:</strong> {d.idnhanVien?.hoTen}</Card.Text>
                                <Card.Text><strong>Tên Khách Hàng:</strong> {d.idkhachHang?.ten}</Card.Text>
                                <Card.Text><strong>Tình trạng:</strong> {d.tinhTrang}</Card.Text>
                                <Card.Text><strong>Vận chuyển:</strong> {d.idvanChuyen?.tinhTrang}</Card.Text>
                                <Card.Text><strong>Tổng tiền:</strong> {d.tongTien.toLocaleString()} VNĐ</Card.Text>
                                <Card.Text><strong>Thời gian dự kiến:</strong> {d.thoiGianDuKien}</Card.Text>
                                <Card.Text><strong>Thời gian nhận:</strong> {d.thoiGianNhan}</Card.Text>
                                <Link to={`/ds-donhangxuat/${d.id}`} className="btn btn-primary btn-sm">Xem chi tiết</Link>
                                {/* {d.chiTiet && d.chiTiet.length > 0 ? (
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
                                )} */}
                                {/* <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => loadChiTietDonHangXuat(d.id)}
                                >
                                    Tải chi tiết
                                </Button> */}

                                {/* {Dhx.length > 0 ? (
                                    <>
                                        <h6 className="mt-3">Chi tiết sản phẩm:</h6>
                                        <Table bordered size="sm">
                                            <thead>
                                                <tr>

                                                    <th>Tên sản phẩm</th>
                                                    <th>Số lượng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Dhx.map((dh) => (
                                                    <tr key={dh.id}>
                                                        
                                                        <td>{c.tenSanPham}</td>
                                                        <td>{c.soLuong}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </>
                                ) : (
                                    <p className="text-muted mt-2">Chưa có chi tiết sản phẩm.</p>
                                )} */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {loading && <MySpinner />}

            {page > 0 && hasMore && <div className="mt-2 mb-2 text-center">
                <Button variant="primary" onClick={loadMore}>Xem thêm...</Button>
            </div>}
        </Container>
    );
}

export default DonHangXuat;