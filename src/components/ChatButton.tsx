import React from 'react';
import { motion } from 'framer-motion';

interface ChatButtonProps {
    onClick: () => void;
    isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
    return (
        <motion.button
            onClick={onClick}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-300 ${
                isOpen 
                    ? 'bg-red-500 hover:bg-red-600 shadow-xl' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl cursor-pointer'
            }`}
            whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
                scale: isOpen ? 1 : [1, 1.05, 1],
                rotate: isOpen ? 45 : 0,
                boxShadow: isOpen 
                    ? "0 10px 25px rgba(239, 68, 68, 0.4)"
                    : "0 15px 35px rgba(34, 197, 94, 0.4)"
            }}
            transition={{ 
                scale: { duration: 0.2 },
                rotate: { duration: 0.3 },
                boxShadow: { duration: 0.3 }
            }}
            style={{
                boxShadow: isOpen 
                    ? "0 10px 25px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    : "0 15px 35px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
            }}
        >
            <div className="flex items-center justify-center w-full h-full">
                {isOpen ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                )}
            </div>
            
            {/* Pulse animation when closed */}
            {!isOpen && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0, 0.6]
                    }}
                    transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}
            
            {/* Ripple effect */}
            {!isOpen && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-green-400/30"
                    animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0, 0.8]
                    }}
                    transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                />
            )}
            
            {/* Tooltip - Hidden on mobile */}
            <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                whileHover={{ opacity: 1, x: 0, scale: 1 }}
                className="hidden sm:block absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap border border-gray-700/50"
                style={{
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                }}
            >
                {isOpen ? 'Đóng chat' : 'Chat với AI'}
                <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900/90 rotate-45"></div>
            </motion.div>
        </motion.button>
    );
};

export default ChatButton;
