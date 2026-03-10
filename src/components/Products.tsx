import React from 'react';

const Products: React.FC = () => {
    const products = [
        {
            name: "Bột Nha Đam LIVERA 100g",
            description: "100% bột nha đam tinh khiết từ vùng ĐBSCL – đa năng cho uống, làm đẹp, bổ sung dinh dưỡng.",
            price: "150.000đ",
            features: ["100% thuần khiết, không phụ gia", "Sấy thăng hoa – giữ nguyên dưỡng chất", "QR truy xuất nguồn gốc", "Gói 100g – dùng khoảng 20–30 ngày"],
            image: "https://res.cloudinary.com/dixqw22t3/image/upload/v1772612181/z7185055253651_9fab3004af7f33946a895f93037b6fdc_yvviy3.jpg",
            badge: "Bán Chạy"
        },
        {
            name: "Bột Nha Đam LIVERA 500g",
            description: "Phiên bản gia đình – tiết kiệm hơn, phù hợp dùng lâu dài và cung cấp cho spa, quán nước.",
            price: "600.000đ",
            features: ["Tiết kiệm 20% so với lẻ", "Dùng cho cả gia đình", "Phù hợp B2B: spa, gym, quán nước", "QR truy xuất nguồn gốc"],
            image: "https://res.cloudinary.com/dixqw22t3/image/upload/v1772612181/z7185055253651_9fab3004af7f33946a895f93037b6fdc_yvviy3.jpg",
            badge: "Gia Đình"
        },
        {
            name: "Combo 3 Gói 100g LIVERA",
            description: "Combo dùng liệu trình 90 ngày – giá ưu đãi, lý tưởng cho chuỗi liệu trình sức khỏe hoặc làm đẹp.",
            price: "405.000đ",
            features: ["Tiết kiệm 10% so với mua lẻ", "Đủ cho liệu trình 3 tháng", "Phù hợp tặng quà sức khỏe", "Miễn phí vận chuyển khi đặt online"],
            image: "https://res.cloudinary.com/dixqw22t3/image/upload/v1772612181/z7185055253651_9fab3004af7f33946a895f93037b6fdc_yvviy3.jpg",
            badge: "Tiết Kiệm"
        }
    ];

    const benefits = [
        {
            icon: "🌿",
            title: "Hỗ Trợ Tiêu Hóa",
            description: "Thanh nhiệt, giải độc, làm dịu dạ dày và hỗ trợ chức năng đường ruột tự nhiên."
        },
        {
            icon: "💪",
            title: "Tăng Đề Kháng",
            description: "Acemannan trong nha đam giúp kích thích hệ miễn dịch hoạt động hiệu quả hơn."
        },
        {
            icon: "✨",
            title: "Dưỡng Da Tự Nhiên",
            description: "Cấp ẩm sâu, làm dịu da kích ứng và hỗ trợ phục hồi da từ bên trong."
        },
        {
            icon: "🔥",
            title: "Kháng Viêm",
            description: "Các hoạt chất tự nhiên trong nha đam giúp giảm viêm và làm dịu cơ thể."
        },
        {
            icon: "💧",
            title: "Bổ Sung Nước",
            description: "Hỗ trợ cân bằng điện giải và duy trì độ ẩm tối ưu cho cơ thể."
        },
        {
            icon: "⚡",
            title: "Thanh Lọc Cơ Thể",
            description: "Hỗ trợ quá trình detox tự nhiên, giúp cơ thể nhẹ nhàng và tràn đầy năng lượng."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-8">
                {/* Products Section */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-800 mb-6">
                        Sản Phẩm LIVERA
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Bột Nha Đam tinh khiết – Nature's Purest. Sản xuất theo quy trình 8 bước chuẩn hóa, 
                        nguyên liệu từ vùng ĐBSCL, có mã QR truy xuất nguồn gốc.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {products.map((product, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {product.badge}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {product.description}
                                </p>
                                
                                <div className="space-y-2 mb-6">
                                    {product.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center">
                                            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-green-600">
                                        {product.price}
                                    </span>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61581147419635"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                                    >
                                        Đặt hàng
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-800 mb-6">
                            Công Dụng Thực Tế
                        </h3>
                        <p className="text-xl text-gray-600">
                            Những lợi ích được ghi nhận từ việc sử dụng bột nha đam thuần khiết hàng ngày.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <span className="text-3xl">{benefit.icon}</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                                    {benefit.title}
                                </h4>
                                <p className="text-gray-600">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nutritional Information */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-4xl font-bold text-gray-800 mb-6">
                                Thành Phần Dinh Dưỡng
                            </h3>
                            <p className="text-lg text-gray-600 mb-8">
                                Bột nha đam LIVERA chứa hơn 200 hợp chất hoạt tính tự nhiên bao gồm 
                                vitamin, khoáng chất, axit amin và enzyme.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <span className="font-semibold text-gray-800">Vitamin C & E</span>
                                    <span className="text-green-600 font-bold">Cao</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <span className="font-semibold text-gray-800">Acemannan (Polysaccharide)</span>
                                    <span className="text-green-600 font-bold">Rất Cao</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <span className="font-semibold text-gray-800">Enzyme tự nhiên</span>
                                    <span className="text-green-600 font-bold">Cao</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <span className="font-semibold text-gray-800">Khoáng chất (Ca, Mg, Zn)</span>
                                    <span className="text-green-600 font-bold">Vừa</span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <span className="font-semibold text-gray-800">Chất chống oxy hóa</span>
                                    <span className="text-green-600 font-bold">Rất Cao</span>
                                </div>
                            </div>

                            {/* Warning note */}
                            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                                ⚠️ <strong>Lưu ý:</strong> Đây là thực phẩm bổ sung, không phải thuốc chữa bệnh. Người mắc bệnh tim, huyết áp cao hoặc tiểu đường cần tham khảo bác sĩ trước khi sử dụng thường xuyên.
                            </div>
                        </div>
                        
                        <div className="relative">
                            <img
                                src="https://res.cloudinary.com/dixqw22t3/image/upload/v1772612181/z7185055253651_9fab3004af7f33946a895f93037b6fdc_yvviy3.jpg"
                                alt="Bột Nha Đam LIVERA – thành phần dinh dưỡng"
                                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
