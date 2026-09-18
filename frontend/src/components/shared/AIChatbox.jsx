// src/components/shared/AIChatbox.jsx
import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
// Import ảnh avatar của AI
import iconChat from "../../assets/icon_chat.png";

export default function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Chào bạn! Tôi là trợ lý AI của TraceFund. Bạn cần kiểm tra tiến độ giải ngân hay minh bạch dòng tiền của dự án nào?" }
  ]);
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Giả lập AI xử lý và query dữ liệu On-chain
    setTimeout(() => {
      const aiMsg = { 
        sender: "ai", 
        text: "Theo dữ liệu On-chain, dự án này đã giải ngân 15 SOL vào ngày 10/09 để mua vật tư y tế. Hóa đơn (CID: QmXy...) đã được xác minh trên IPFS. Số dư 17.5 SOL còn lại đang khóa an toàn trong Smart Contract." 
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Khung Chat (Đã thiết kế lại hiện đại) */}
      <div 
        className={`absolute bottom-full right-0 mb-4 bg-white w-[340px] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 translate-y-0 pointer-events-auto" : "scale-90 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header của Chatbox */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-4 flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={iconChat} alt="AI Avatar" className="w-10 h-10 rounded-full border-2 border-white/30 object-cover bg-white" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">TraceFund AI</h3>
              <p className="text-[11px] text-rose-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Trợ lý kiểm toán trực tuyến
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Vùng hiển thị tin nhắn */}
        <div className="flex-grow p-4 overflow-y-auto bg-stone-50 flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar AI trong khung chat */}
              {msg.sender === "ai" && (
                <img src={iconChat} alt="AI" className="w-7 h-7 rounded-full object-cover shrink-0 mt-1 bg-white border border-stone-200" />
              )}
              
              <div 
                className={`max-w-[75%] p-3.5 text-[14px] leading-relaxed shadow-sm ${
                  msg.sender === "user" 
                    ? "bg-rose-600 text-white rounded-2xl rounded-tr-sm" 
                    : "bg-white border border-stone-200 text-stone-700 rounded-2xl rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Khung nhập liệu */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-100 flex gap-2 items-end z-10">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Hỏi AI về dòng tiền..." 
            className="flex-grow max-h-24 min-h-[44px] px-4 py-2.5 bg-stone-100 hover:bg-stone-200/50 focus:bg-white border border-transparent focus:border-rose-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-500/10 text-sm resize-none transition-all scrollbar-hide text-stone-800"
            rows="1"
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="w-11 h-11 shrink-0 bg-rose-600 hover:bg-rose-700 disabled:bg-stone-300 disabled:text-stone-500 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </form>
      </div>

      {/* Nút Bong bóng nổi (Nút bấm thu gọn) */}
      <button 
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-stone-800 hover:bg-stone-900 scale-90" : "bg-white hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-500/20"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <img src={iconChat} alt="Open Chat" className="w-full h-full object-cover rounded-full border border-stone-200" />
        )}
      </button>
    </div>
  );
}