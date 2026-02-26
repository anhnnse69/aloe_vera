import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ProcessVideoSection: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [isPlaying, setIsPlaying] = useState(false);

    // Cập nhật các bước quy trình dựa trên tài liệu dự án LIVERA (Bột Nha Đam)
    const processSteps = [
        {
            title: "Thu hoạch & Sơ chế",
            description: "Chọn lọc lá tươi, rửa sạch và loại bỏ hoàn toàn mủ vàng (aloin) để đảm bảo độ tinh khiết.",
            icon: "🌱",
            duration: "Trong vòng 6h"
        },
        {
            title: "Chiết xuất Gel",
            description: "Tách vỏ xanh, xay nhuyễn và lọc để thu được dung dịch nha đam trong suốt, không lẫn xơ.",
            icon: "💧",
            duration: "Kiểm soát oxy hóa"
        },
        {
            title: "Sấy khô (Sấy thăng hoa/Sấy lạnh)",
            description: "Sử dụng công nghệ sấy hiện đại (< 80°C) để giữ nguyên dưỡng chất, màu sắc và độ ẩm < 5%.",
            icon: "❄️",
            duration: "Giữ trọn dưỡng chất"
        },
        {
            title: "Nghiền mịn & Đóng gói",
            description: "Nghiền thành bột siêu mịn (< 100 µm), không vón cục và đóng gói chống ẩm.",
            icon: "✨",
            duration: "Kiểm tra chất lượng"
        }
    ];

    return (
        <section id="process" ref={ref} className="py-20 bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Quy Trình Sản Xuất
                        <span className="block text-green-600">Bột Nha Đam Tinh Khiết</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Khám phá hành trình "Nature's Purest" từ những lá nha đam tươi sạch đến thành phẩm bột mịn đa công dụng
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Video Section - Sử dụng video Cloudinary */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                            <div className="aspect-video relative flex items-center justify-center cursor-pointer">
                                {!isPlaying ? (
                                    <>
                                        {/* Hình nền placeholder khi chưa phát video */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-emerald-900 opacity-80"></div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsPlaying(true)}
                                            className="w-20 h-20 z-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative"
                                        >
                                            <svg className="w-8 h-8 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </motion.button>
                                        
                                        {/* Video Overlay Info */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 pointer-events-none">
                                            <div className="text-white">
                                                <h3 className="text-2xl font-bold mb-2">Dự án LIVERA</h3>
                                                <p className="text-green-200">Video giới thiệu sản phẩm Bột Nha Đam</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <video 
                                        className="w-full h-full object-cover"
                                        controls
                                        autoPlay
                                        src="https://res.cloudinary.com/dvsqjznt2/video/upload/v1772100134/b%E1%BB%99t_nha_%C4%90AM_-_LIVERA_eucufj.mp4"
                                    >
                                        Trình duyệt của bạn không hỗ trợ thẻ video.
                                    </video>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Process Steps */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">Các bước thực hiện</h3>
                        
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                                        {step.icon}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                        <h4 className="text-lg sm:text-xl font-semibold text-gray-900">{step.title}</h4>
                                        <span className="text-xs sm:text-sm text-green-700 font-medium bg-green-100 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                                            {step.duration}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Stats Section - Cập nhật theo tài liệu */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
                >
                    {[
                        { number: "100%", label: "Nguyên liệu tự nhiên" },
                        { number: "3 IN 1", label: "Đa công dụng" },
                        { number: "QR Code", label: "Minh bạch nguồn gốc" },
                        { number: "< 5%", label: "Độ ẩm thành phẩm" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg"
                        >
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                            <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessVideoSection;