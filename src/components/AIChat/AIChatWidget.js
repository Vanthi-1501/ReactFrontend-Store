import React, { useState, useRef, useEffect } from 'react';
import './AIChatWidget.css';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Xin chào! Tôi là trợ lý AI của Nike Shop. Tôi có thể giúp gì cho bạn?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState(['Jordan dưới 3tr', 'Tư vấn size', 'Kiểm tra đơn hàng']);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (text) => {
        const query = text || input;
        if (!query.trim()) return;

        const newMessages = [...messages, { role: 'user', content: query }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            console.log('Sending request to AI...', { message: query });

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

            const response = await fetch('http://127.0.0.1:8080/api/public/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    userId: 1,
                    message: query,
                    history: messages.filter(m => m.content !== 'Đang suy nghĩ...').map(m => ({
                        role: m.role === 'user' ? 'user' : 'assistant',
                        content: m.content
                    }))
                })
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log('AI Response data:', data);
            setMessages([...newMessages, { role: 'ai', content: data.reply }]);
            if (data.suggestions) setSuggestions(data.suggestions);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Chat request timed out');
                setMessages([...newMessages, { role: 'ai', content: 'Hệ thống AI đang phản hồi chậm. Bạn vui lòng thử lại sau giây lát nhé.' }]);
            } else {
                console.error('Chat error detail:', error);
                setMessages([...newMessages, { role: 'ai', content: `Lỗi kết nối: ${error.message}. Hãy chắc chắn Backend đang chạy tại port 8080 và Groq API Key đã được thiết lập.` }]);
            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="ai-chat-widget-container">
            <button className="ai-chat-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <h3>Nike AI Support</h3>
                        <span onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }}>✕</span>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.role === 'user' ? 'user-message' : 'ai-message'}`}>
                                {m.content}
                            </div>
                        ))}
                        {loading && <div className="message ai-message">Đang suy nghĩ...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="ai-chat-suggestions">
                        {suggestions.map((s, i) => (
                            <div key={i} className="suggestion-chip" onClick={() => handleSend(s)}>
                                {s}
                            </div>
                        ))}
                    </div>

                    <form className="ai-chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                        <input
                            placeholder="Nhập tin nhắn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit">Gửi</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AIChatWidget;
