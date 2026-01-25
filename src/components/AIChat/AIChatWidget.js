import React, { useState, useRef, useEffect } from 'react';
import './AIChatWidget.css';
import { useCart } from '../../context/CartContext';

const AIChatWidget = () => {
    const { addToCart } = useCart(); // Access CartContext
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

            // 1. Check if Backend is reachable first (Fast Fail)
            try {
                const healthCheck = await fetch('http://127.0.0.1:8080/api/public/ai/test', { method: 'GET' });
                if (!healthCheck.ok) throw new Error('Backend Health Check Failed');
            } catch (netErr) {
                throw new Error('Không thể kết nối tới Backend (Port 8080). Hãy kiểm tra Server đã nhận lệnh chạy chưa.');
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s timeout for DeepSeek

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
                throw new Error(`Lỗi Server (${response.status}): ${errorText || 'Unknown Error'}`);
            }

            const data = await response.json();
            console.log('AI Response data:', data);

            let aiReply = data.reply;

            // --- DETECT ADD TO CART COMMAND ---
            // Regex to find [ADD_TO_CART:123]
            const addToCartRegex = /\[ADD_TO_CART:(\d+)\]/;
            const match = aiReply.match(addToCartRegex);

            if (match) {
                const productId = match[1];
                console.log('AI requested Add To Cart, Product ID:', productId);

                // Remove the command tag from the visible message
                aiReply = aiReply.replace(addToCartRegex, '').trim();

                // Fetch Product Details
                try {
                    const prodRes = await fetch(`http://127.0.0.1:8080/api/public/products/${productId}`);
                    if (prodRes.ok) {
                        const product = await prodRes.json();
                        addToCart(product, 1); // Add 1 item
                        aiReply += "\n\n✅ Đã thêm sản phẩm vào giỏ hàng!";
                    } else {
                        console.error('Failed to fetch product details for cart');
                    }
                } catch (cartErr) {
                    console.error('Error adding to cart:', cartErr);
                }
            }

            setMessages(prev => [...prev, { role: 'ai', content: aiReply }]);
            if (data.suggestions) setSuggestions(data.suggestions);
        } catch (error) {
            let errorMessage = 'Đã có lỗi xảy ra.';
            if (error.name === 'AbortError') {
                errorMessage = 'Hệ thống AI phản hồi quá lâu (Timeout).';
            } else {
                errorMessage = error.message;
            }
            console.error('Chat error detail:', error);
            setMessages(prev => [...prev, { role: 'ai', content: `⚠️ ${errorMessage}` }]);
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
