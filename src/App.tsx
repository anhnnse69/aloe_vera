import "./App.css";
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProcessVideoSection from './components/ProcessVideoSection';
import AnimationSection from './components/AnimationSection';
import ProductsSection from './components/ProductsSection';
import InstructionsSection from './components/InstructionsSection';
import Chatbox from './components/Chatbox';
import ChatButton from './components/ChatButton';

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <Header onOpenChat={() => setIsChatOpen(true)} />
            
            <main className="pt-24">
                <HeroSection />
                <ProcessVideoSection />
                <AnimationSection />
                <ProductsSection />
                <InstructionsSection onOpenChat={() => setIsChatOpen(true)} />
            </main>
            
            <Footer />
            
            {/* AI Chatbox */}
            <ChatButton 
                onClick={() => setIsChatOpen(!isChatOpen)} 
                isOpen={isChatOpen} 
            />
            <Chatbox 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
            />
        </div>
    );
}

export default App;
