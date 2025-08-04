import { useEffect, useRef, useState } from "react";
import { db } from "../configs/firebaseConfig";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { ref, onValue, push } from "firebase/database";

const ChatBox = ({ roomId, senderId }) => {
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const chatRef = useRef();

    useEffect(() => {
        const messagesRef = ref(db, `chats/${roomId}/messages`);
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const arr = data ? Object.values(data) : [];
            setMessages(arr.sort((a, b) => a.timestamp - b.timestamp));
        });

        return () => unsubscribe();
    }, [roomId]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMsg.trim()) return;

        const msgRef = ref(db, `chats/${roomId}/messages`);
        await push(msgRef, {
            senderId,
            content: newMsg,
            timestamp: Date.now()
        });

        setNewMsg("");
        setTimeout(() => {
            chatRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <Card className="shadow-sm" style={{ height: "450px", display: "flex", flexDirection: "column", borderRadius: "12px" }}>
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "1rem",
                    background: "#f8f9fa",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    scrollbarWidth: "none"
                }}
            >
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            textAlign: msg.senderId === senderId ? "right" : "left",
                            marginBottom: "0.75rem"
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                backgroundColor: msg.senderId === senderId ? "#cfe2ff" : "#e2e3e5",
                                color: "#000",
                                padding: "0.5rem 1rem",
                                borderRadius: "20px",
                                maxWidth: "75%",
                                wordWrap: "break-word",
                                fontSize: "0.95rem"
                            }}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))}
                <div ref={chatRef}></div>
            </div>

            <Form onSubmit={handleSend} style={{ padding: "0.75rem", borderTop: "1px solid #dee2e6" }}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tin nhắn..."
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        style={{ borderRadius: "20px" }}
                    />
                    <Button type="submit" variant="primary" style={{ marginLeft: "0.5rem", borderRadius: "20px" }}>
                        Gửi
                    </Button>
                </InputGroup>
            </Form>
        </Card>
    );
};

export default ChatBox;
