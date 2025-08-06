import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../configs/Context";
import { authApis, endpoints } from "../configs/Apis";
import MySpinner from "./Layout/MySpinner";
import ChatBox from "./ChatBox";
import { Alert } from "react-bootstrap";

const HoTroKhachhang = () => {
    const [user, ] = useContext(MyUserContext);
    const [cskh, setCskh] = useState({});
    const [roomId, setRoomId] = useState(""); 
    const loadCskh = async () => {
        try {
            let res = await authApis().get(endpoints['User-cskh']);
            setCskh(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(()=>{
        loadCskh();
    }, []);

    useEffect(()=>{
        setRoomId([user.id, cskh.id].sort().join('_'));
    }, [cskh]);

    if (!user || !cskh) return <MySpinner>Đang tải dữ liệu</MySpinner>;

    return (
        <div className="container mt-4">
            <h3>Hỗ trợ khách hàng</h3>
            <p>Chat với nhân viên:</p>
            <ChatBox roomId={roomId} senderId={user.id} />
        </div>
    );
}

export default HoTroKhachhang;