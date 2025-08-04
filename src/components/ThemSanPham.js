import { useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { useParams } from "react-router-dom";

const ThemSanPham = () => {
    const tenRef = useRef();
    const hinhRef = useRef();
    const giaRef = useRef();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append("ten", tenRef.current.value);
            formData.append("hinh", hinhRef.current.files[0]);
            console.info(tenRef);
            console.info(hinhRef);

            // 1. Gọi API thêm sản phẩm
            const res1 = await authApis().post(endpoints["addsanpham"], formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const idSanPham = res1.data.id;
            console.log("ID sản phẩm vừa tạo:", idSanPham);
            console.info(id);
            console.info(giaRef.current.value);

            // 2. Gọi API gán sản phẩm cho nhà cung cấp
            const res2 = await authApis().post(endpoints["Them-sp-ncc"], {
                idSanPham: idSanPham,
                idNhaCungCap: id,
                gia: giaRef.current.value,
            });

            setMessage("Thêm sản phẩm mới thành công!");
            tenRef.current.value = "";
            hinhRef.current.value = null;
            giaRef.current.value = "";
        } catch (err) {
            console.error(err);
            setMessage("Đã xảy ra lỗi khi thêm sản phẩm.");
        } finally {
            setLoading(false);
            
        }
    };

    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control type="text" ref={tenRef} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control type="file" ref={hinhRef} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Giá sản phẩm</Form.Label>
                <Form.Control type="number" ref={giaRef} required />
            </Form.Group>

            <Button type="submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
            </Button>

            {message && <Alert className="mt-3">{message}</Alert>}
        </Form>
    );
};

export default ThemSanPham;
