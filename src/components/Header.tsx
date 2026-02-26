import { motion } from 'framer-motion';
import logoLivera from '../assets/logo/Logo_LIVERA.png'; 
import chatbotAvatar from '../assets/chatbot/chatbot_AI.jpg';

interface HeaderProps {
    onOpenChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenChat }) => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => scrollToSection('hero')}
                    >
                        <img 
                            src={logoLivera} 
                            alt="LIVERA Logo" 
                            className="w-24 h-24 object-contain" 
                        />
                    </motion.div>
                    
                    {/* Navigation */}
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <nav className="hidden md:flex items-center space-x-2">
                            <button 
                                onClick={() => scrollToSection('process')}
                                className="text-gray-600 hover:text-green-600 px-4 py-2 rounded-full font-medium transition-colors cursor-pointer"
                            >
                                Quy trình
                            </button>
                            <button 
                                onClick={() => scrollToSection('animation')}
                                className="text-gray-600 hover:text-green-600 px-4 py-2 rounded-full font-medium transition-colors cursor-pointer"
                            >
                                Mô phỏng
                            </button>
                            <button 
                                onClick={() => scrollToSection('products')}
                                className="text-gray-600 hover:text-green-600 px-4 py-2 rounded-full font-medium transition-colors cursor-pointer"
                            >
                                Sản phẩm
                            </button>
                            
                            {/* Nút Tìm hiểu thêm -> Chuyển đến Hướng dẫn sử dụng */}
                            <button 
                                onClick={() => scrollToSection('instructions')}
                                className="text-gray-600 hover:text-green-600 px-4 py-2 rounded-full font-medium transition-colors cursor-pointer"
                            >
                                Tìm hiểu thêm
                            </button>

                            {/* Nút gọi Chatbot (Nổi bật) */}
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onOpenChat}
                                className="ml-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
                            >
                                <img src={chatbotAvatar} alt="AI Avatar" className="w-6 h-6 rounded-full object-cover" /> {/* Cập nhật Icon ở đây */}
                                Hỏi AI Cách dùng
                            </motion.button>
                        </nav>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;