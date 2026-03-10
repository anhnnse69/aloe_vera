import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

const FAQ_QUESTIONS = [
    { label: "🥤 Cách pha nước giải khát", text: "Hướng dẫn tôi cách pha nước giải khát từ bột nha đam LIVERA" },
    { label: "✨ Công thức mặt nạ", text: "Hướng dẫn cách làm mặt nạ dưỡng da từ bột nha đam" },
    { label: "⚖️ Liều dùng mỗi ngày", text: "Liều dùng bột nha đam mỗi ngày là bao nhiêu?" },
    { label: "⚠️ Bệnh tim/huyết áp/tiểu đường", text: "Tôi bị bệnh nền (tim, huyết áp, tiểu đường), dùng bột nha đam có an toàn không?" },
    { label: "📅 Hạn sử dụng & bảo quản", text: "Hạn sử dụng bột nha đam là bao lâu và cách bảo quản thế nào?" },
    { label: "💰 Giá & mua ở đâu", text: "Bột nha đam LIVERA giá bao nhiêu và mua ở đâu?" },
    { label: "🔍 Quy trình sản xuất", text: "Quy trình sản xuất bột nha đam LIVERA như thế nào?" },
    { label: "🚨 Uống quá nhiều thì sao?", text: "Nếu uống quá nhiều bột nha đam thì phải xử lý thế nào?" },
];

const Chatbox: React.FC<ChatboxProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Xin chào! Mình là trợ lý AI của **LIVERA** 🌿 – thương hiệu Bột Nha Đam tinh khiết từ vùng ĐBSCL.\n\nBạn có thể hỏi mình bất cứ điều gì về sản phẩm, hoặc chọn một câu hỏi bên dưới nhé!',
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [showFAQ, setShowFAQ] = useState(true);
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

    const handleFAQClick = (question: string) => {
        setShowFAQ(false);
        sendMessageWithText(question);
    };

    const sendMessageWithText = async (text: string) => {
        if (!text.trim() || isLoading) return;
        const userText = text.trim();
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
        setShowFAQ(false);
        await fetchAIResponse(userText);
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
        setShowFAQ(false);
        await fetchAIResponse(userText);
    };

    const fetchAIResponse = async (userText: string) => {
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
                content: `Bạn là trợ lý ảo tư vấn của LIVERA – startup Bột Nha Đam tinh khiết, dự án khởi nghiệp EXE101 tại Trường Đại học FPT Cần Thơ.

=== PHONG CÁCH TRẢ LỜI (BẮT BUỘC) ===
- TUYỆT ĐỐI KHÔNG dùng thẻ HTML (không <ul>, <li>, <p>, <br>, <b>, <table>, <div>... hay bất kỳ thẻ HTML nào).
- Chỉ dùng Markdown thuần: dùng **in đậm**, *in nghiêng*, - hoặc * cho danh sách, 1. 2. 3. cho danh sách có số, > cho trích dẫn.
- Trả lời bằng tiếng Việt, giọng tự nhiên như đang nói chuyện với bạn bè. Thân thiện, gần gũi nhưng vẫn chuyên nghiệp.
- Trả lời ngắn gọn, đi thẳng vào vấn đề. Mỗi câu trả lời tối đa 150–200 từ trừ khi khách yêu cầu chi tiết hơn.
- Dùng emoji vừa phải để sinh động (🌿, ✨, 💧, ⚠️...).
- KHÔNG được bịa thông tin. Chỉ trả lời dựa trên kiến thức được cung cấp bên dưới.

=== THÔNG TIN THƯƠNG HIỆU ===
- Tên: LIVERA = "Live" (sức sống) + "Vera" (Aloe Vera) → Sức sống thuần khiết từ thiên nhiên.
- Slogan: "Nature's Purest" – Tinh chất thuần khiết nhất từ thiên nhiên.
- Logo: Lá nha đam cách điệu trong vòng tròn, tượng trưng cho sự thuần khiết và trọn vẹn.
- Mascot: Nhân vật nha đam dễ thương với nụ cười thân thiện, đôi mắt sinh động – là "linh hồn" của thương hiệu.
- Câu chuyện: Nhóm sáng lập đều là con em vùng ĐBSCL. Chứng kiến cây nha đam dễ trồng nhưng giá trị thấp, thường bán tươi rẻ hoặc bỏ phí. Từ đó LIVERA ra đời để nâng tầm giá trị cây nha đam cho nông dân.
- Thành lập: 11/09/2025
- Fanpage: facebook.com/profile.php?id=61581147419635
- Email: mynq.minhquang.edu@gmail.com

=== ĐỘI NGŨ ===
- Nguyễn Thị Diễm My (CEO): Quản lý dự án, chiến lược, đại diện nhóm.
- Nguyễn Lê Uyên Nhi (COO): Sản xuất, mua nguyên liệu, kiểm soát chất lượng.
- Lâm Hải Đăng (CFO): Tài chính, lập ngân sách, dự báo doanh thu.
- Đồng Minh Quang (CMO): Truyền thông, marketing, thiết kế bao bì.
- Nguyễn Nhật Anh (CTO): Hệ thống QR code, nội dung hướng dẫn, ứng dụng AI.
- Giảng viên: TS. Nguyễn Trọng Luân | Mentor: Lê Quang Vinh | Lớp: EXE101_G20.05 – Nhóm 5.

=== SẢN PHẨM ===
- Tên: Bột Nha Đam LIVERA (Aloe Vera Powder)
- 100% thuần khiết, KHÔNG phụ gia, KHÔNG chất bảo quản, KHÔNG màu nhân tạo.
- Nguyên liệu: Nha đam sạch từ vùng Đồng bằng sông Cửu Long (ĐBSCL), hợp tác trực tiếp với nông dân.
- Công nghệ: Sấy thăng hoa (freeze-drying) / sấy lạnh, nhiệt độ ≤ 80°C, độ ẩm thành phẩm < 5%.
- Kích thước hạt: < 100 µm, không vón cục, tan đều trong nước.
- Mỗi gói có mã QR truy xuất nguồn gốc từ trang trại → bàn ăn.
- Thử nghiệm MVP: Dùng lò Toshiba sấy 4 giờ ở 70°C. Từ 2kg nha đam tươi → 10g bột.

=== QUY TRÌNH 8 BƯỚC SẢN XUẤT ===
1. **Thu hoạch**: Lá tươi, không hư hỏng, không hóa chất. Từ thu hoạch đến sơ chế ≤ 6 giờ.
2. **Rửa & Sơ chế**: Rửa nhiều lần bằng nước sạch, ngâm muối loãng hoặc xử lý ozone. Cắt gốc và gai. Tiêu chuẩn VSATTP, không để sót nhựa vàng (latex).
3. **Gọt vỏ & Lấy gel**: Bóc hoàn toàn vỏ xanh, giữ gel trong suốt. Rửa lại loại bỏ aloin (chất đắng gây kích ứng). Gel phải trong, không đục, không nhớt, không mùi.
4. **Xử lý gel**: Xay nhuyễn thành dung dịch, thêm vitamin C/citric acid chống oxy hóa. Lọc bỏ sợi xơ. Bảo toàn polysaccharide & enzyme.
5. **Sấy khô** (quyết định chất lượng): Sấy thăng hoa (tốt nhất), sấy phun (quy mô lớn), hoặc sấy lạnh. Nhiệt độ ≤ 80°C, độ ẩm sau sấy < 5%, màu trắng đục hoặc trắng trong.
6. **Nghiền & Rây**: Nghiền mịn < 100µm, rây phân loại. Không vón, tan đều.
7. **Kiểm định CL**: Kiểm vi sinh, kim loại nặng, dư lượng hóa chất, hàm lượng acemannan, aloin, polysaccharide. Đạt chuẩn VSATTP.
8. **Đóng gói**: Bao bì chống ẩm, chống sáng. Dán QR code truy xuất. Ghi rõ thành phần, HDSD, NSX, HSD, mã lô.

=== GIÁ & ĐÓNG GÓI ===
- **Gói 100g**: 150.000đ (mua trực tiếp) / 165.000–170.000đ (Shopee, TikTok Shop)
- **Gói 500g**: 600.000đ (trực tiếp) / 650.000–670.000đ (online)
- **Combo 3 gói 100g**: 405.000đ (tiết kiệm 10%)
- Online đắt hơn offline do phí sàn TMĐT, phí thanh toán, vận chuyển.
- Giá COGS mỗi gói 100g: nguyên liệu 77.000đ + chế biến 23.000đ + bao bì 7.000đ = 107.000đ.
- Lợi nhuận offline gói 100g: ~43.000đ (~29%). Gói 500g: ~100.000đ (~16.7%).

=== KÊNH MUA HÀNG ===
- **Online**: Shopee, TikTok Shop (chủ lực), Facebook Fanpage.
- **Offline**: Bán trực tiếp, hội chợ, đối tác bán lẻ.
- **B2B**: Gym, spa, quán nước ép, tiệm bánh.
- Hotline / Fanpage: Nhắn tin trực tiếp để đặt hàng.

=== HẠN SỬ DỤNG & BẢO QUẢN ===
- **HSD: 3 tháng** kể từ ngày sản xuất (sản phẩm MVP thử nghiệm).
- Sau khi mở nắp: dùng trong **30 ngày**, đậy kín sau mỗi lần dùng.
- Bảo quản: nhiệt độ phòng 25 ± 2°C, độ ẩm < 65%, tránh ánh nắng trực tiếp.

=== CÁCH SỬ DỤNG – ĐA NĂNG 3-IN-1 ===

**1. Nước giải khát** 🥤
Pha 3–5g (1 muỗng cà phê) bột với 200ml nước ấm hoặc lạnh. Thêm mật ong, chanh, hạt chia, đá tùy thích. Uống buổi sáng hoặc chiều để thanh mát, giải độc.

**2. Mặt nạ dưỡng da** ✨
Trộn 3–5g bột + sữa chua không đường (hoặc nước hoa hồng) → thoa đều lên mặt → để 15–20 phút → rửa sạch bằng nước ấm. Dùng 2–3 lần/tuần.

**3. Thực phẩm bổ sung** 🥗
Cho 3–5g bột vào sinh tố, sữa chua, ngũ cốc, hoặc dùng làm nguyên liệu bánh, thạch, rau câu, chè.

**Công thức gợi ý thêm:**
- Nha đam + mật ong + chanh + đá: Nước detox mát lạnh
- Nha đam + matcha + sữa hạt: Latte xanh healthy
- Nha đam + sữa chua Hy Lạp + chuối: Sinh tố bổ dưỡng
- Nha đam + bột nghệ + mật ong: Mặt nạ trị thâm
- Nha đam + nước hoa hồng: Mặt nạ cấp ẩm

**Liều dùng**: 3–5g/ngày. Tối đa KHÔNG quá 10g/ngày.

=== CÔNG DỤNG THỰC TẾ (DỰA TRÊN THÔNG TIN NGÀNH) ===
- **Thanh nhiệt, giải độc**: Nha đam giúp thanh lọc cơ thể, giảm nóng trong.
- **Hỗ trợ tiêu hóa**: Làm dịu dạ dày, hỗ trợ nhuận tràng tự nhiên nhờ chất nhầy polysaccharide.
- **Dưỡng ẩm da**: Cấp ẩm sâu, làm dịu da kích ứng, cháy nắng. Phù hợp da nhạy cảm.
- **Kháng viêm tự nhiên**: Các hoạt chất trong nha đam (bradykinase, salicylic acid) giúp giảm viêm.
- **Hỗ trợ miễn dịch**: Acemannan kích thích tế bào miễn dịch hoạt động hiệu quả hơn.
- **Hỗ trợ kiểm soát đường huyết nhẹ**: Có nghiên cứu cho thấy nha đam có thể giúp giảm đường huyết ở mức nhẹ (CHÚ Ý: người tiểu đường phải hỏi bác sĩ).
- **Chống oxy hóa**: Vitamin C, E và các polyphenol giúp chống lão hóa.
- **Thành phần chính**: Acemannan, polysaccharide, vitamin C, vitamin E, enzyme tự nhiên, khoáng chất (Ca, Mg, Zn).
- **Lưu ý**: Đây là thực phẩm bổ sung, KHÔNG phải thuốc. KHÔNG có tác dụng chữa bệnh.

=== SO SÁNH VỚI SẢN PHẨM TRÊN THỊ TRƯỜNG ===
- **GC Food / VietFarm**: "Vua nha đam Việt Nam", quy mô lớn (35.000 tấn lá tươi/năm), vùng trồng Ninh Thuận, chủ yếu xuất khẩu và bán thạch/nước nha đam tươi. Không tập trung vào dạng bột.
- **Nature Republic, Aloe 92%**: Thương hiệu Hàn Quốc, chủ yếu gel dưỡng da, không phải bột uống.
- **Cỏ Mềm HomeLab, CoCoon**: Thương hiệu mỹ phẩm thiên nhiên Việt Nam, có sản phẩm chăm sóc da tự nhiên nhưng không chuyên bột nha đam.
- **Điểm khác biệt LIVERA**: Dạng BỘT đa năng (uống + làm đẹp + nấu ăn), công nghệ sấy thăng hoa giữ nguyên dưỡng chất, QR truy xuất nguồn gốc 100%, hợp tác trực tiếp nông dân ĐBSCL.

=== CHÍNH SÁCH ===

**Khuyến mãi:**
- Giảm 10% cho đơn hàng đầu tiên qua Shopee/TikTok Shop, hoặc tặng 1 gói dùng thử khi mua trên 200.000đ.
- Giảm 5% vĩnh viễn sau 3 lần mua. Miễn phí 1 sản phẩm sau 5 lần mua.
- B2B: Chiết khấu 20–35% tùy giá trị đơn hàng.
- Chương trình "Mua Sạch – Sống Xanh": Giảm thêm 3–5% khi mang bao bì tái chế.

**Đổi trả:**
- Đổi/trả trong 7 ngày nếu: sản phẩm lỗi chất lượng (vón cục, ẩm, màu lạ), giao sai, hư hỏng do vận chuyển, QR code không truy xuất được.
- Điều kiện: bao bì nguyên vẹn, có hóa đơn, có video/ảnh khi mở hộp.
- KHÔNG nhận trả: đã mở/dùng, bảo quản sai, quá 7 ngày, hàng tặng/khuyến mãi.
- Xử lý trong 24–48 giờ.

=== CẢNH BÁO BỆNH NỀN (QUAN TRỌNG – PHẢI TRẢ LỜI ĐẦY ĐỦ KHI KHÁCH HỎI) ===

**1. Bệnh tim mạch** ❤️
Nha đam có thể tương tác với một số thuốc tim mạch, đặc biệt digoxin và warfarin. Nếu dùng liều cao, nha đam có tác dụng nhuận tràng mạnh → mất kali (hạ kali máu) → ảnh hưởng nhịp tim. Người bị bệnh tim nên hỏi bác sĩ trước khi dùng thường xuyên và KHÔNG tự ý dùng thay thuốc.

**2. Huyết áp cao** 🩺
Nha đam có tác dụng lợi tiểu nhẹ. Nếu đang uống thuốc hạ huyết áp, nha đam có thể làm tăng hiệu quả thuốc → nguy cơ tụt huyết áp đột ngột (hoa mắt, chóng mặt). Cần theo dõi chỉ số huyết áp thường xuyên và tham khảo bác sĩ.

**3. Tiểu đường** 🩸
Nha đam có thể giúp giảm đường huyết ở mức nhẹ. Nhưng nếu đang dùng thuốc tiểu đường (metformin, insulin...), kết hợp thêm nha đam có thể gây hạ đường huyết quá mức (hypoglycemia). Dấu hiệu: run tay, chóng mặt, vã mồ hôi, mờ mắt, tim đập nhanh. Người tiểu đường cần theo dõi đường huyết chặt chẽ và hỏi bác sĩ trước.

**Không dùng cho:**
- Phụ nữ mang thai và đang cho con bú
- Trẻ em dưới 12 tuổi
- Người dị ứng với cây họ lô hội (Liliaceae/Aloaceae)
- Người sắp hoặc vừa phẫu thuật (trong vòng 2 tuần)

=== XỬ LÝ KHI UỐNG QUÁ NHIỀU 🚨 ===
Nếu dùng quá 10g/ngày hoặc có triệu chứng bất thường:
- **Dấu hiệu**: buồn nôn, tiêu chảy, đau bụng co thắt, mất nước, mệt mỏi.
- **Xử lý ngay**:
  1. Ngừng dùng bột nha đam ngay lập tức
  2. Uống nhiều nước lọc để bù điện giải
  3. Nếu triệu chứng nặng → **đến phòng khám hoặc bệnh viện gần nhất NGAY**
  4. Đường dây cấp cứu: **115**

=== TẦM NHÌN & KẾ HOẠCH ===
- Tầm nhìn: Đưa LIVERA thành thương hiệu hàng đầu Việt Nam về sản phẩm nha đam, vươn ra khu vực và quốc tế.
- Sứ mệnh: Phụng sự khách hàng (sản phẩm chất lượng), cộng đồng nông dân (tăng giá trị nông sản), và môi trường (bao bì xanh).
- Năm 1 (2027): Đạt chứng nhận HACCP/ISO 22000, mở rộng 1.500 gói/tháng, ký hợp đồng 10+ đối tác B2B.
- Năm 2 (2028): Ra mắt 2 sản phẩm mới (viên nang, tinh chất), đăng ký sở hữu trí tuệ.
- Năm 3 (2029): Đạt chứng nhận FDA/CE, xuất khẩu thử nghiệm sang Singapore/Nhật/Hàn.

=== GIÁ TRỊ CỐT LÕI ===
1. **Thuần khiết & Tự nhiên**: 100% nha đam sạch, không pha trộn.
2. **Minh bạch & Tin cậy**: QR code truy xuất mỗi sản phẩm.
3. **Sáng tạo & Đa năng**: Uống, làm đẹp, nấu ăn – 3 trong 1.
4. **Bền vững & Trách nhiệm**: Bao bì thân thiện môi trường, hỗ trợ nông dân.
5. **Sức khỏe & Hạnh phúc**: Giúp khách hàng khỏe đẹp hơn mỗi ngày.

=== QUY TẮC TRẢ LỜI ===
- KHÔNG BAO GIỜ dùng HTML. Chỉ Markdown.
- Giọng văn tự nhiên, trò chuyện thân mật, như đang nhắn tin với bạn.
- Khi khách hỏi bệnh nền → trả lời đầy đủ cảnh báo + luôn khuyên "hỏi bác sĩ".
- Khi khách hỏi quá liều → hướng dẫn xử lý + khuyên đến phòng khám ngay.
- KHÔNG chẩn đoán bệnh, KHÔNG kê đơn thuốc.
- Nếu câu hỏi ngoài phạm vi → lịch sự từ chối, hướng dẫn liên hệ đúng nơi.
- Khi liệt kê → dùng dấu gạch đầu dòng (-) hoặc số (1. 2. 3.), KHÔNG dùng <ul><li>.`
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
                    max_tokens: 1024,
                    temperature: 0.6
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
                        className="relative bg-white rounded-2xl shadow-2xl w-full sm:w-[450px] h-[85vh] sm:h-[650px] flex flex-col border border-gray-200 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-t-2xl flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
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
                                    {!message.isUser && (
                                        <img src={chatbotAvatar} alt="AI" className="w-8 h-8 rounded-full border border-green-200 object-cover mr-2 self-end mb-4" />
                                    )}
                                    <div className={`flex flex-col max-w-[85%] ${message.isUser ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`p-3 rounded-2xl text-left ${message.isUser
                                                ? 'bg-green-600 text-white rounded-br-sm'
                                                : message.isError
                                                    ? 'bg-red-100 text-red-700 rounded-bl-sm border border-red-200'
                                                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                                                }`}
                                        >
                                            {/* Render Markdown thay vì Plain Text */}
                                            <div className="text-sm leading-relaxed">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                        table: ({ node, ...props }) => (
                                                            <div className="overflow-x-auto my-2 w-full">
                                                                <table className="min-w-full border-collapse border border-current text-xs sm:text-[13px]" {...props} />
                                                            </div>
                                                        ),
                                                        th: ({ node, ...props }) => <th className="border border-current px-2 py-1.5 text-left font-semibold bg-black/5" {...props} />,
                                                        td: ({ node, ...props }) => <td className="border border-current px-2 py-1.5" {...props} />,
                                                        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                                        blockquote: ({ node, ...props }) => (
                                                            <blockquote className="border-l-4 border-current opacity-90 pl-3 my-2 italic py-1 bg-black/5 rounded-r-sm" {...props} />
                                                        ),
                                                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />
                                                    }}
                                                >
                                                    {message.text}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                                            {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* FAQ Quick Buttons */}
                            {showFAQ && messages.length <= 1 && !isLoading && (
                                <div className="flex flex-wrap gap-2 px-1">
                                    {FAQ_QUESTIONS.map((faq, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleFAQClick(faq.text)}
                                            className="text-xs bg-white border border-green-300 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-50 hover:border-green-500 transition-all cursor-pointer shadow-sm"
                                        >
                                            {faq.label}
                                        </button>
                                    ))}
                                </div>
                            )}

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