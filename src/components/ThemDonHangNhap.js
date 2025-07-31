import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../configs/Context";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ThemDonHangNhap = () => {
    const [user,] = useContext(MyUserContext);
    const [dsKho, setDsKho] = useState([]);
    const [dsNhaCungCap, setDsNhaCungCap] = useState([]);
    const [dsSanPham, setDsSanPham] = useState([]);
    const [dsVanChuyen, setDsVanChuyen] = useState([]);
    const [idKho, setIdKho] = useState(0);
    const [idNhaCungCap, setIdNhaCungCap] = useState(0);
    const [idVanChuyen, setIdVanChuyen] = useState(0);
    const [chiTietDonHangNhap, setChiTietDonHangNhap] = useState([]);
    const [tinhTrang, setTinhTrang] = useState("");
    const [thoiGianDuKien, setThoiGianDuKien] = useState("");
    const [thoiGianNhan, setThoiGianNhan] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadDsKho = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Ds-kho']);
            setDsKho(res.data);
            console.info(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const loadNhaCungCap = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Ds-nhacungcap']);
            setDsNhaCungCap(res.data);
            console.info(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const loadSanPhamTheoNcc = async () => {
        if (idNhaCungCap) {
            try {
                let res = await Apis.get(endpoints['Sanpham-Nhacungcap'](idNhaCungCap));
                setDsSanPham(res.data);
                console.info("SP theo NCC:", res.data);
            } catch (ex) {
                console.error(ex);
            }
        }
    };

    const loadDsVanChuyen = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['Ds-vanchuyen']);
            setDsVanChuyen(res.data);
            console.info(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const handleSoLuongChange = (idSanPham, soLuong) => {
        setChiTietDonHangNhap(prev => {
            const index = prev.findIndex(item => item.idSanPham === idSanPham);
            if (index !== -1) {
                const updated = [...prev];
                updated[index].soLuong = soLuong;
                return updated;
            } else {
                return [...prev, { idSanPham, soLuong }];
            }
        });
    };

    const handleTaoDonHang = async () => {
        const payload = {
            "idNhanVien": user.id,
            "idKho": idKho,
            "idVanChuyen": idVanChuyen,
            "idNhaCungCap": idNhaCungCap,
            "tinhTrang": tinhTrang,
            "thoiGianDuKien": thoiGianDuKien,
            "thoiGianNhan": thoiGianNhan,
            "chiTietDonHangNhap": chiTietDonHangNhap
        }

        try {
            let res = await authApis().post(endpoints['Them-donhangnhap'], payload);
            alert("Tạo đơn hàng thành công!");
            console.info("Đơn hàng đã gửi:", res.data);

            setIdKho(0);
            setIdVanChuyen(0);
            setIdNhaCungCap(0);
            setTinhTrang("");
            setThoiGianDuKien("");
            setThoiGianNhan("");
            setChiTietDonHangNhap([]);
            setDsSanPham([]);
        } catch (ex) {
            console.error(ex);
            alert("Có lỗi khi tạo đơn hàng!");
        }
    }

    useEffect(() => {
        loadDsKho();
        loadNhaCungCap();
        loadDsVanChuyen();
    }, [])

    useEffect(() => {
        loadSanPhamTheoNcc();
    }, [idNhaCungCap]);

    return (
        <Container className="my-4">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/ds-donhangnhap")}
            >
                Quay lại
            </button>
            <h3 className="mb-4">Tạo đơn hàng nhập</h3>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Kho</Form.Label>
                        <Form.Select onChange={(e) => setIdKho(parseInt(e.target.value))}>
                            <option value="">-- Chọn Kho --</option>
                            {dsKho.map(k => (
                                <option key={k.id} value={k.id}>{k.diaChi}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Loại vận chuyển</Form.Label>
                        <Form.Select onChange={(e) => setIdVanChuyen(parseInt(e.target.value))}>
                            <option value="">-- Chọn vận chuyển --</option>
                            {dsVanChuyen.map(vc => (
                                <option key={vc.id} value={vc.id}>
                                    {vc.iddoiTacVanChuyen.ten} - {vc.soTien.toLocaleString()}đ
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Nhà cung cấp</Form.Label>
                        <Form.Select onChange={(e) => setIdNhaCungCap(parseInt(e.target.value))}>
                            <option value="">-- Chọn Nhà cung cấp --</option>
                            {dsNhaCungCap.map(ncc => (
                                <option key={ncc.id} value={ncc.id}>{ncc.ten}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Tình trạng</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tình trạng"
                            value={tinhTrang}
                            onChange={(e) => setTinhTrang(e.target.value)}
                        />
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Thời gian dự kiến</Form.Label>
                        <Form.Control
                            type="date"
                            value={thoiGianDuKien}
                            onChange={(e) => setThoiGianDuKien(e.target.value)}
                        />
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Thời gian nhận</Form.Label>
                        <Form.Control
                            type="date"
                            value={thoiGianNhan}
                            onChange={(e) => setThoiGianNhan(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <hr />
            <h5 className="mt-4">Danh sách sản phẩm</h5>

            <Row>
                {dsSanPham.map(sp => (
                    <Col md={4} className="mb-4" key={sp.id}>
                        <Card>
                            <Card.Img variant="top" src={sp.idsanPham.hinh} height="160" style={{ objectFit: "cover" }} />
                            <Card.Body>
                                <Card.Title>{sp.idsanPham.ten}</Card.Title>
                                <Card.Text>Giá: {sp.gia.toLocaleString()}đ</Card.Text>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    placeholder="Số lượng"
                                    onChange={(e) =>
                                        handleSoLuongChange(sp.idsanPham.id, parseInt(e.target.value))}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <hr />
            <h5 className="mt-4">Chi tiết đơn hàng nhập</h5>
            {chiTietDonHangNhap.map((ct, idx) => (
                <p key={idx}>
                    Sản phẩm ID: <b>{ct.idSanPham}</b> – Số lượng: <b>{ct.soLuong}</b>
                </p>
            ))}

            <div className="text-center mt-4">
                <button
                    className="btn btn-success px-4 py-2"
                    onClick={handleTaoDonHang}
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : "Tạo Đơn Hàng Nhập"}
                </button>
            </div>
        </Container>
    );
}

export default ThemDonHangNhap;