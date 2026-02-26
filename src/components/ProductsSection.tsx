import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProductsSection: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const specs = [
        {
            title: "Nhiệt độ sấy & Độ ẩm",
            icon: "🌡️",
            details: [
                "Công nghệ sấy: Thăng hoa / Sấy lạnh",
                "Nhiệt độ kiểm soát: ≤ 80°C",
                "Độ ẩm thành phẩm: < 5%",
                "Bảo toàn tối đa Polysaccharide & Enzyme"
            ]
        },
        {
            title: "Hướng dẫn sử dụng (HDSD)",
            icon: "📝",
            details: [
                "Nước giải khát: Pha với nước lọc/ấm, thêm mật ong hoặc chanh.",
                "Làm đẹp (Mặt nạ): Trộn bột với sữa chua không đường hoặc nước hoa hồng.",
                "Thực phẩm bổ sung: Trộn vào sinh tố, ngũ cốc hoặc dùng làm nguyên liệu làm bánh."
            ]
        },
        {
            title: "Liều lượng & Hạn sử dụng",
            icon: "⚖️",
            details: [
                "Liều lượng khuyên dùng: 3-5 gram (khoảng 1 muỗng cà phê) mỗi ngày.",
                "Hạn sử dụng (HSD): 12 - 18 tháng kể từ ngày sản xuất.",
                "Bảo quản: Nhiệt độ phòng (25 ± 2°C), độ ẩm < 65%, tránh ánh nắng trực tiếp."
            ]
        }
    ];

    const socialLinks = [
        {
            name: "Facebook Fanpage",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            url: "https://www.facebook.com/profile.php?id=61581147419635",
            color: "bg-blue-600 hover:bg-blue-700"
        },
        {
            name: "TikTok Channel",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
            ),
            url: "#", // Thêm link TikTok thật của bạn vào đây
            color: "bg-black hover:bg-gray-800"
        }
    ];

    return (
        <section id="products" ref={ref} className="py-20 bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Thông Số Kỹ Thuật
                        <span className="block text-green-600 mt-2">& Chỉ Tiêu Sản Phẩm</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Sản phẩm Bột Nha Đam LIVERA - Nature's Purest được nghiên cứu và phát triển với quy trình chuẩn hóa, đảm bảo chất lượng và an toàn.
                    </p>
                </motion.div>

                {/* Technical Specs Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {specs.map((spec, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500"
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="text-4xl bg-green-100 p-3 rounded-full">
                                    {spec.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {spec.title}
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {spec.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="text-gray-600 leading-relaxed">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social Connect & Product Image */}
                <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold text-gray-900">
                            Kết nối với cộng đồng <span className="text-green-600">LIVERA</span>
                        </h3>
                        <p className="text-lg text-gray-600">
                            Theo dõi chúng tôi trên các nền tảng mạng xã hội để cập nhật những công thức DIY làm đẹp, mẹo pha chế thức uống dinh dưỡng và câu chuyện về hành trình phát triển bền vững từ cây nha đam.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${social.color}`}
                                >
                                    {social.icon}
                                    <span>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="relative"
                    >
                        {/* Placeholder hình ảnh sản phẩm thực tế */}
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-lg relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-300 flex flex-col items-center justify-center text-green-800 p-8 text-center">
                                <span className="text-8xl mb-4">🌿</span>
                                <h4 className="text-2xl font-bold mb-2">Bột Nha Đam 3-IN-1</h4>
                                <p className="font-medium">Giải khát - Làm đẹp - Thực phẩm</p>
                                <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-sm font-bold text-green-600 shadow-md">
                                    Dự án Khởi nghiệp
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;