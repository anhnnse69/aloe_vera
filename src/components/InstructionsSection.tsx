import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
// Sửa đường dẫn nếu ảnh avatar chatbot của bạn nằm ở chỗ khác
import chatbotAvatar from '../assets/chatbot/chatbot_AI.jpg';

interface InstructionsSectionProps {
    onOpenChat: () => void;
}

const InstructionsSection: React.FC<InstructionsSectionProps> = ({ onOpenChat }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const usages = [
        {
            icon: "🥤",
            title: "Pha Chế Giải Khát",
            desc: "Pha 1 muỗng cà phê (3–5g) bột nha đam với 200ml nước ấm hoặc lạnh. Có thể thêm mật ong, chanh, hạt chia hoặc đá viên. Dùng để thanh mát, giải độc cơ thể mỗi ngày. Không vượt quá 10g/ngày."
        },
        {
            icon: "✨",
            title: "Mặt Nạ Dưỡng Da",
            desc: "Trộn 1 muỗng bột nha đam (3–5g) với sữa chua không đường hoặc nước hoa hồng thành hỗn hợp sệt. Đắp lên mặt 15–20 phút để cấp ẩm sâu và làm dịu da. Rửa sạch bằng nước ấm."
        },
        {
            icon: "🥗",
            title: "Thực Phẩm Bổ Sung",
            desc: "Thêm 3–5g bột vào sinh tố, sữa chua, ngũ cốc buổi sáng hoặc dùng làm nguyên liệu bánh (rau câu, thạch) để tăng cường vitamin và khoáng chất tự nhiên từ nha đam."
        }
    ];

    return (
        <section id="instructions" ref={ref} className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Hướng Dẫn Sử Dụng
                        <span className="block text-green-600">Đa Năng 3-IN-1</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Bột Nha Đam LIVERA có thể sử dụng linh hoạt cho nhiều mục đích khác nhau, giúp bạn chăm sóc sức khỏe và sắc đẹp một cách toàn diện.
                    </p>
                </motion.div>

                {/* Usage Cards Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {usages.map((usage, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                        >
                            <div className="text-5xl mb-6 bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm">
                                {usage.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{usage.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{usage.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Health Advisory Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-10 bg-amber-50 border border-amber-300 rounded-2xl p-6 md:p-8 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">⚠️</span>
                        <h3 className="text-xl font-bold text-amber-800">Lưu Ý Quan Trọng Trước Khi Sử Dụng</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-700">
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="text-red-500 font-bold mt-0.5">❤️</span><span><strong>Bệnh tim mạch:</strong> Nha đam có thể tương tác với thuốc tim (digoxin, warfarin). Hỏi bác sĩ trước khi dùng thường xuyên.</span></li>
                            <li className="flex items-start gap-2"><span className="text-orange-500 font-bold mt-0.5">🩺</span><span><strong>Huyết áp cao:</strong> Có thể tăng tác dụng thuốc hạ áp, gây tụt huyết áp. Cần theo dõi và tham khảo bác sĩ.</span></li>
                            <li className="flex items-start gap-2"><span className="text-yellow-600 font-bold mt-0.5">🩸</span><span><strong>Tiểu đường:</strong> Nha đam hạ đường huyết — kết hợp thuốc tiểu đường có thể gây hạ đường huyết quá mức. Cần giám sát chặt chẽ.</span></li>
                        </ul>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><span className="text-green-600 font-bold mt-0.5">📅</span><span><strong>Hạn sử dụng:</strong> 3 tháng kể từ ngày sản xuất. Sau khi mở nắp: dùng trong 30 ngày.</span></li>
                            <li className="flex items-start gap-2"><span className="text-blue-600 font-bold mt-0.5">🚫</span><span><strong>Không dùng cho:</strong> Phụ nữ mang thai, đang cho con bú, trẻ em dưới 12 tuổi.</span></li>
                            <li className="flex items-start gap-2"><span className="text-red-600 font-bold mt-0.5">🚨</span><span><strong>Uống quá liều:</strong> Buồn nôn, tiêu chảy, đau bụng → <strong>đến phòng khám gần nhất ngay</strong> hoặc gọi <strong>1800 9090</strong>.</span></li>
                        </ul>
                    </div>
                </motion.div>

                {/* AI Chatbot Call To Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                                <span className="animate-pulse">✨</span> Tính năng mới
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">Bạn cần công thức chi tiết hơn?</h3>
                            <p className="text-lg text-green-50 opacity-90 max-w-2xl">
                                Đừng lo! Hệ thống của chúng tôi đã được tích hợp <strong>Trợ lý ảo AI (Chatbot)</strong> thông minh. Chỉ cần nhắn tin, AI sẽ lập tức gợi ý cho bạn các công thức mix đồ uống, tỷ lệ đắp mặt nạ chuẩn xác nhất cho từng loại da.
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onOpenChat}
                                className="bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center gap-3 cursor-pointer"
                            >
                                {/* THAY ĐỔI: Sử dụng ảnh làm icon thay vì emoji */}
                                <img src={chatbotAvatar} alt="AI Avatar" className="w-8 h-8 rounded-full border-2 border-green-200 object-cover" />
                                Hỏi AI ngay
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InstructionsSection;