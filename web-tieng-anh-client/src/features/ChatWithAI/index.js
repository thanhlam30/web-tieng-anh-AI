import { useState } from "react";
import "../ChatWithAI/style.scss";

function ChatWithAI() {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isFirstMessage, setIsFirstMessage] = useState(true);

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    const handleRecord = () => {
        recognition.start();
        setIsRecording(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
            setIsRecording(false);
        };

        recognition.onerror = (err) => {
            console.error("Speech error:", err);
            setIsRecording(false);
        };
    };

    const addMessage = (role, content, audio = null) => {
        setMessages((prev) => [...prev, { role, content, audio }]);
    };

    const sendText = async () => {
        if (!inputText.trim()) return;

        const prompt = inputText.trim();
        addMessage("user", prompt);
        setInputText("");

        try {
            // Tạo prompt role chỉ khi là lần đầu tiên
            let promptWithRole = prompt;
            if (isFirstMessage) {
                promptWithRole = "You are an English teacher or someone practicing English with me. Correct my sentences if they are wrong and provide feedback or talk with me in order to improve my speaking skill. If not, you will conversation naturaly with me to improve my english speaking skill." + prompt;
                setIsFirstMessage(false); // Đánh dấu không phải lần đầu tiên nữa
            }

            const res = await fetch("http://localhost:8080/gemini/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: promptWithRole }),
            });

            const data = await res.json(); // { text: ..., audio: ... }
            addMessage("ai", data.text, data.audio);

            // Tự động phát âm thanh từ audio trả về nếu có
            if (data.audio) {
                const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
                audio.play();
            }
        } catch (err) {
            console.error("API error:", err);
            addMessage("ai", "❌ Gemini is currently unavailable.");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <h2 className="title">🎧 Practice English with Gemini</h2>

                <div className="chat-history">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`message-bubble ${msg.role === "user" ? "user" : "ai"}`}
                        >
                            <span>{msg.content}</span>
                            {msg.role === "ai" && msg.audio && (
                                <button
                                    className="speak-btn"
                                    onClick={() => {
                                        const audio = new Audio(`data:audio/mp3;base64,${msg.audio}`);
                                        audio.play();
                                    }}
                                >
                                    🔊
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="chat-input-area">
                    <input
                        type="text"
                        value={inputText}
                        placeholder="Type your message..."
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button onClick={handleRecord} disabled={isRecording}>
                        {isRecording ? "🎙️..." : "🎤"}
                    </button>
                    <button onClick={sendText}>➤</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWithAI;
