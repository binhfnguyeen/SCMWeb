
import { use, useContext, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import cookie from 'react-cookies'
// import { MyUserContext } from "../configs/Contexts";
import { Link } from "react-router-dom";
import Apis, { authApis, endpoints } from "../configs/Apis";
import MySpinner from "./Layout/MySpinner";
import { MyCartContext, MyUserContext } from "../configs/Context";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
    const [carts, setCarts] = useState(cookie.load('carts') || null);
    const [user, ] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);
    const [dhx,setDhx]=useState({});
    const [, cartDispatch] = useContext(MyCartContext);

    const order = async () => {
        
        try {
            setLoading(true);
            const payload = {
            idNhanVien: 4,
            carts: Object.values(carts)
        };

        let res = await authApis().post(endpoints['order'], payload);
        
        if(res.status ===403){
            alert("bạn không có quyền thực hiện chức năng này")
        }

        if (res.status === 201) {
            alert("đặt hàng thành công"); 
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

    const remove=(key)=>{
        let carts=cookie.load('carts');
        

        let newCarts = { ...carts };
        delete newCarts[key];
        cookie.save("carts", newCarts);
        console.info(newCarts);
        setCarts(newCarts);

        cartDispatch({
            "type": "update"
        })
    }

    const pay= async ()=>{
         try {
            setLoading(true);
            const payload = {
            idNhanVien: 4,
            carts: Object.values(carts)
        };

        let res = await authApis().post(endpoints['order'], payload);
        
        if(res.status ===403){
            alert("bạn không có quyền thực hiện chức năng này")
        }
        console.info(res.data)
        if (res.status === 201) {
            cookie.remove('carts');
            setCarts(null);
        }
        console.info(res.data)
        const bill = await axios.get(`http://localhost:8080/SupplyChainManagement/api/paypal/create-payment/${res.data}`);
        window.location.href = bill.data;
        
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
                        {Object.entries(carts).map(([key, c]) => (
                            <tr key={key}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.price}</td>
                                <td>{c.quantity}</td>
                                <td>
                                    <Button variant="danger" onClick={() => remove(key)}>
                                        &times;
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </Table>
            
                {user === null?<Alert>Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán!</Alert>:<div className="mt-1 mb-1">
                    {loading?<MySpinner />: <><Button variant="success" onClick={order}>Đặt hàng</Button>
                    <PayPalButtons
                        style={{ layout: "horizontal" }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: Object.values(carts).reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2),
                                    },
                                }],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            alert("Thanh toán thành công bởi " + details.payer.name.given_name);

                            // Gửi đơn hàng về server
                            try {
                                const payload = {
                                    idNhanVien: 4,
                                    carts: Object.values(carts),
                                    tinhTrang:"Đã thanh toán",
                                    iDVanChuyen:6
                                };
                                let res = await authApis().post(endpoints['order'], payload);

                                if (res.status === 201) {
                                    cookie.remove('carts');
                                    setCarts(null);
                                }
                                console.info(res.data)
                                let bill=await authApis().post(endpoints['HoadonPaypal'], res.data)
                            } catch (err) {
                                console.error("Lỗi khi gửi đơn hàng sau thanh toán:", err);
                            }
                        }}
                        onError={(err) => {
                            console.error("Lỗi khi xử lý PayPal:", err);
                            alert("Có lỗi xảy ra khi thanh toán qua PayPal!");
                        }}
                    /></>}

                </div>}
                
                
            </>}
            
        </>
    );
}

export default Cart;
