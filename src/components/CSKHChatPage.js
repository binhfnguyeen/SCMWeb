import { useNavigate, useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import { authApis, endpoints } from "../configs/Apis";
import { useEffect, useState } from "react";

const CSKHChatPage = () => {
    const { id } = useParams();
    const [cskh, setCskh] = useState({});
    const navigate = useNavigate();

    const loadCskh = async () => {
        try {
            let res = await authApis().get(endpoints['User-cskh']);
            setCskh(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadCskh();
    }, []);

    return (
        <div className="container mt-4">
            <button
                className="btn btn-info mt-2 mb-2"
                onClick={() => navigate("/cskh/danhsach")}
            >
                Quay lại
            </button>
            <h4>Hỗ trợ #{id}</h4>
            <ChatBox roomId={id} senderId={cskh.id} />
        </div>
    );
};

export default CSKHChatPage;