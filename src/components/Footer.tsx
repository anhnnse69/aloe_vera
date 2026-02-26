import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-green-800 via-emerald-800 to-teal-800 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                LIVERA
                            </span>
                        </div>
                        <p className="text-gray-300 text-lg mb-6 max-w-md">
                            Sản xuất bột nha đam tinh khiết từ trồng trọt hữu cơ đến chất lượng cao cấp. 
                            Khám phá hành trình hoàn chỉnh của sức mạnh chữa lành từ thiên nhiên.
                        </p>
                        <div className="flex space-x-4">
                            {/* Facebook Icon */}
                            <a href="https://www.facebook.com/profile.php?id=61581147419635" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="sr-only">Facebook Fanpage</span>
                            </a>
                            
                            {/* TikTok Icon */}
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                                <span className="sr-only">TikTok Channel</span>
                            </a>
                        </div>
                    </div>

                    {/* Process Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-green-400">Quy trình</h3>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                <span>Trồng trọt hữu cơ</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                <span>Thu hoạch chất lượng</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                <span>Chiết xuất tinh khiết</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                <span>Sản xuất bột</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-green-400">Liên hệ</h3>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-green-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span>mynq.minhquang.edu@gmail.com</span>
                            </div>
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-green-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <span>+84 (28) 1234-5678</span>
                            </div>
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-green-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>Khu vực nông trại ĐBSCL</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="border-t border-gray-600 mt-12 pt-8 text-center">
                    <p className="text-gray-400">
                        © Bản quyền 2024 LIVERA - Sản xuất bột nha đam tinh khiết. Tất cả quyền được bảo lưu.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Được tạo ra với ❤️ cho sức khỏe và sức khỏe tự nhiên
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;