import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
    // Hàm cuộn trang mượt mà
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-25 animate-pulse"></div>
                <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-green-300 rounded-full opacity-40 animate-bounce"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left side - Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6 lg:space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-4">
                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                            >
                                <motion.span 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
                                >
                                    LIVERA
                                </motion.span>
                                <motion.span 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    className="block text-gray-800 mt-2"
                                >
                                    Bột Nha Đam
                                </motion.span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                            >
                                Khám phá hành trình hoàn chỉnh từ trồng trọt nha đam hữu cơ đến sản xuất bột cao cấp. 
                                Tìm hiểu về nguyên liệu, quy trình trồng trọt và chuyển đổi thành bột tinh khiết.
                            </motion.p>
                        </div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection('process')} // Thêm sự kiện click
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                            >
                                Khám phá quy trình
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection('instructions')} // Thêm sự kiện click
                                className="bg-white text-green-600 border border-green-200 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                            >
                                Tìm hiểu thêm
                            </motion.button>
                        </motion.div>
                        
                        {/* Stats */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 lg:pt-8"
                        >
                            {[
                                { value: "100%", label: "Hữu cơ" },
                                { value: "8", label: "Bước quy trình" }, // Cập nhật lại số bước thành 8 cho khớp với animation
                                { value: "200:1", label: "Nồng độ" }
                            ].map((stat, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{stat.value}</div>
                                    <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                    
                    {/* Right side - Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative group"
                        >
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                src="https://res.cloudinary.com/dixqw22t3/image/upload/v1758468225/1_92936_uib1no.jpg"
                                alt="Cây nha đam tươi"
                                className="w-full h-80 sm:h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-500/30 via-transparent to-transparent rounded-3xl"></div>
                            
                            {/* Floating Elements */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1 }}
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                            >
                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                </svg>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                whileHover={{ scale: 1.1 }}
                                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                            >
                                <span className="text-green-600 font-bold text-sm">Tinh khiết</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                onClick={() => scrollToSection('process')}
            >
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center"
                >
                    <motion.div 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-3 bg-green-600 rounded-full mt-2"
                    ></motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;