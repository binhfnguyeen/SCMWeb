import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../configs/firebaseConfig";
import { authApis, endpoints } from "../configs/Apis";
import { ListGroup, Card } from "react-bootstrap";

const DsChatCSKH = () => {
    const [roomIds, setRoomIds] = useState([]);
    const navigate = useNavigate();
    const [cskh, setCskh] = useState({});

    const loadCskh = async () => {
        try {
            let res = await authApis().get(endpoints['User-cskh']);
            setCskh(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    useEffect(() => {
        loadCskh();
    }, []);

    useEffect(() => {
        const chatsRef = ref(db, "chats");
        const unsubscribe = onValue(chatsRef, (snapshot) => {
            const data = snapshot.val();
            if (data && cskh?.id) {
                const rooms = Object.keys(data).filter(roomId =>
                    roomId.includes(`_${cskh.id}`) || roomId.startsWith(`${cskh.id}_`)
                );
                setRoomIds(rooms);
            }
        });

        return () => unsubscribe();
    }, [cskh]);

    return (
        <div className="container mt-4">
            <h4 className="mb-4">Danh sách cuộc trò chuyện</h4>
            <Card className="shadow-sm">
                <ListGroup variant="flush">
                    {roomIds.length > 0 ? (
                        roomIds.map(roomId => (
                            <ListGroup.Item
                                key={roomId}
                                action
                                onClick={() => navigate(`/cskh/danhsach/${roomId}`)}
                                style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    transition: "background-color 0.2s"
                                }}
                            >
                                <div>
                                    Hỗ trợ #{roomId}
                                </div>
                                <span className="text-muted small">Bấm để xem</span>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item className="text-center text-muted">Không có cuộc trò chuyện nào.</ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </div>
    );
};

export default DsChatCSKH;