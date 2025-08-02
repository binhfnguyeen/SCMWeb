
import { use, useContext, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import cookie from 'react-cookies'
// import { MyUserContext } from "../configs/Contexts";
import { Link } from "react-router-dom";
import { authApis, endpoints } from "../configs/Apis";
import MySpinner from "./Layout/MySpinner";
import { MyUserContext } from "../configs/Context";

const Cart = () => {
    const [carts, setCarts] = useState(cookie.load('carts') || null);
    const [user, ] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);
    const [dhx,setDhx]=useState({});

    const order = async () => {
        
        try {
            setLoading(true);
            const payload = {
            idNhanVien: 4,
            carts: Object.values(carts)
        };

        let res = await authApis().post(endpoints['order'], payload);

        if (res.status === 200) {
            cookie.remove('carts');
            setCarts(null);
        }
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
            console.info(dhx)
        }
    }

    return (
        <>
            <h1 className="text-center text-success mt-2">GIỎ HÀNG</h1>

            {carts === null ? <Alert variant="warning">KHÔNG có sản phẩm trong giỏ!</Alert>:<>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(carts).map(c => <tr>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.price}</td>
                            <td>{c.quantity}</td>
                            <td>
                                <Button variant="danger">&times;</Button>
                            </td>
                        </tr>)}
                        
                    </tbody>
                </Table>
            
                {user === null?<Alert>Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán!</Alert>:<div className="mt-1 mb-1">
                    {loading?<MySpinner />: <Button variant="success" onClick={order}>Đặt hàng</Button>}
                </div>}
                
                
            </>}
            
        </>
    );
}

export default Cart;
