
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { useSearchParams } from "react-router-dom";
import cookie from 'react-cookies'
import MySpinner from "./Layout/MySpinner";
import { MyCartContext } from "../configs/Context";


const Home = () => {
    const [sanpham, setSanPham] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState();
    const [page, setPage] = useState(1);
    const [params] = useSearchParams();
    const [, cartDispatch] = useContext(MyCartContext);

    const loadProducts = async () => {
        let url = `${endpoints['sanpham']}?page=${page}`;

        if (q)
            url  = `${url}&ten=${q}`;

        let cateId = params.get("cateId");
        if (cateId)
            url  = `${url}&categoryId=${cateId}`;

        console.info(url);

        try {
            

            let res = await Apis.get(url);

            if (res.data.length == 0 && page > 1)
                page = 0;
            else {
                if (page <= 1)
                    setSanPham(res.data);
                else
                    setSanPham([...sanpham, ...res.data]);
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
                loadProducts();
        }, 500);
        
        return () => clearTimeout(timer);
    }, [page, q, params]);

    useEffect(() => {
        setPage(1);
    }, [q, params]);

    const loadMore = () => {
        setPage(page + 1);
    }

    const order=(sanpham)=>{
        let carts=cookie.load('carts') || null;
        if(carts===null){
            carts={};
        }
        
        if(sanpham.idSpNcc in carts){
            carts[sanpham.idSpNcc]["quantity"]++;
        }else{
            carts[sanpham.idSpNcc]={
                "id":sanpham.idSp,
                "name":sanpham.tenSanPham,
                "price":sanpham.gia,
                "idNhaCungCap":sanpham.idNcc,
                "quantity":1
            }
        }

        cookie.save("carts", carts);
        console.info(carts);

         cartDispatch({
            "type": "update"
        })
    
    }

    

    return (
        <>
            <Form>
                <Form.Group className="mb-3 mt-2">
                    <Form.Control value={q} onChange={e => setQ(e.target.value)} type="text" placeholder="Tìm kiếm sản phẩm..." />
                </Form.Group>
            </Form>

            {(!sanpham || sanpham.length === 0) && <Alert variant="info" className="mt-2">Không có sản phẩm nào!</Alert>}

            <Row>
                {sanpham.map(s => <Col key={s.idSpNcc} md={3} xs={6} className="p-1">
                    <Card>
                        <Card.Img variant="top" src={s.hinh} />
                        <Card.Body>
                            <Card.Title>{s.tenSanPham}</Card.Title>
                            <Card.Text>{s.gia} VNĐ</Card.Text>
                            <Card.Text>{s.tenNhaCungCap}</Card.Text>
                            <Button variant="primary me-1">Xem chi tiết</Button>
                            <Button variant="danger" onClick={() => order(s)}>Đặt hàng</Button>
                        </Card.Body>
                    </Card>
                </Col>)}
            </Row>

            {loading && <MySpinner />}

            {page > 0 && <div className="mt-2 mb-2 text-center">
                <Button variant="primary" onClick={loadMore}>Xem thêm...</Button>
            </div>}
        </>
    );
}
export default Home;
