import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import chatbotAvatar from '../assets/chatbot/chatbot_AI.jpg';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
    isError?: boolean;
}

interface ChatboxProps {
    isOpen: boolean;
    onClose: () => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Xin chào! Tôi là trợ lý AI của LIVERA. Tôi có thể hướng dẫn bạn cách sử dụng Bột Nha Đam tinh khiết để làm nước giải khát, đắp mặt nạ, hoặc thêm vào thực phẩm. Bạn muốn tìm hiểu cách dùng nào?',
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
    };

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userText = inputText.trim();
        const userMessage: Message = {
            id: Date.now().toString(),
            text: userText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }
        setIsLoading(true);

        if (!API_KEY) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Lỗi hệ thống: Chưa cấu hình API Key (VITE_API_KEY) trong file .env",
                isUser: false,
                timestamp: new Date(),
                isError: true
            }]);
            setIsLoading(false);
            return;
        }

        try {
            const chatHistory = messages.map(msg => ({
                role: msg.isUser ? "user" : "assistant",
                content: msg.text
            }));

            const systemPrompt = {
                role: "system",
                content: "Bạn là trợ lý ảo tư vấn khách hàng của thương hiệu LIVERA - chuyên sản xuất Bột Nha Đam tinh khiết. Nhiệm vụ của bạn là hướng dẫn khách hàng cách sử dụng bột nha đam (để uống, đắp mặt nạ, nấu ăn), liều lượng (3-5g/ngày), hạn sử dụng (12-18 tháng). Hãy trả lời bằng tiếng Việt, ngắn gọn, thân thiện và nhiệt tình."
            };

            const API_URL = "https://api.groq.com/openai/v1/chat/completions";
            
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-20b",
                    messages: [systemPrompt, ...chatHistory, { role: "user", content: userText }],
                    max_tokens: 700,
                    temperature: 0.7
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || `Lỗi HTTP: ${response.status}`);
            }

            if (data && data.choices && data.choices.length > 0) {
                const aiResponseText = data.choices[0].message.content.trim();
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: aiResponseText,
                    isUser: false,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                throw new Error("Không nhận được phản hồi hợp lệ từ máy chủ.");
            }

        } catch (error: any) {
            console.error('Error fetching data from API:', error);
            let errorText = "Xin lỗi, có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.";
            
            if (error.message.includes("429")) {
                errorText = "Hệ thống đang quá tải yêu cầu. Vui lòng thử lại sau ít phút.";
            } else if (error.message.includes("401") || error.message.includes("API Key")) {
                errorText = "Lỗi xác thực API Key. Vui lòng kiểm tra lại cấu hình.";
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: errorText,
                isUser: false,
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-end justify-end p-4 pointer-events-none"
                >
                    <div 
                        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm sm:hidden pointer-events-auto cursor-pointer"
                        onClick={onClose}
                    />
                    
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-full sm:w-[400px] h-[85vh] sm:h-[600px] flex flex-col border border-gray-200 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-t-2xl flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {/* THAY ĐỔI: Sử dụng ảnh avatar thay vì icon emoji */}
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border border-white/50">
                                        <img src={chatbotAvatar} alt="AI Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight">AI Hướng Dẫn</h3>
                                        <p className="text-green-100 text-xs">Luôn sẵn sàng hỗ trợ</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer flex-shrink-0"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex w-full ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                    {/* Chỉ thêm Avatar cho tin nhắn của AI */}
                                    {!message.isUser && (
                                        <img src={chatbotAvatar} alt="AI" className="w-8 h-8 rounded-full border border-green-200 object-cover mr-2 self-end mb-4" />
                                    )}
                                    <div className={`flex flex-col max-w-[80%] ${message.isUser ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`p-3 rounded-2xl text-left ${
                                                message.isUser
                                                    ? 'bg-green-600 text-white rounded-br-sm' // Đổi góc nhọn cho tin nhắn user
                                                    : message.isError 
                                                        ? 'bg-red-100 text-red-700 rounded-bl-sm border border-red-200'
                                                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100' // Đổi góc nhọn cho tin nhắn AI
                                            }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                                        </div>
                                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                                            {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            
                            {isLoading && (
                                <div className="flex justify-start w-full">
                                    <img src={chatbotAvatar} alt="AI" className="w-8 h-8 rounded-full border border-green-200 object-cover mr-2 self-end" />
                                    <div className="flex flex-col items-start max-w-[85%]">
                                        <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                                            <div className="flex space-x-1.5">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl flex-shrink-0">
                            <div className="flex items-end gap-2 bg-gray-50 rounded-xl border border-gray-200 p-1 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
                                <textarea
                                    ref={inputRef}
                                    value={inputText}
                                    onChange={handleInput}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Hỏi AI cách pha nước, đắp mặt..."
                                    className="flex-1 max-h-[120px] min-h-[40px] px-3 py-2.5 bg-transparent resize-none outline-none text-sm text-gray-700 placeholder-gray-400"
                                    disabled={isLoading}
                                    rows={1}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!inputText.trim() || isLoading}
                                    className="mb-1 mr-1 p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:bg-gray-300 transition-colors flex-shrink-0"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-400">Được hỗ trợ bởi GPT OSS 20B</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Chatbox;