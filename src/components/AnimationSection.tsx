import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { STEPS } from '../utils/gameData';
import { TabBtn, ResultOverlay } from './GameSharedUI';
import SortGame from './SortGame';
import SpeedGame from './SpeedGame';

type ActiveTab = 'process' | 'sort' | 'speed';

function ProcessViewer() {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [isAuto, setIsAuto] = useState(false);
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = (idx: number) => {
        setAnimating(true);
        setTimeout(() => { setActive(idx); setAnimating(false); }, 140);
    };

    const toggleAuto = () => {
        if (isAuto) {
            if (autoRef.current) clearInterval(autoRef.current);
            setIsAuto(false);
        } else {
            setIsAuto(true);
            autoRef.current = setInterval(() => {
                setActive(p => (p + 1) % STEPS.length);
            }, 2000);
        }
    };

    useEffect(() => () => { if (autoRef.current) clearInterval(autoRef.current); }, []);

    const step = STEPS[active];
    return (
        <div>
            {/* Step pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14, justifyContent: 'center' }}>
                {STEPS.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => goTo(i)}
                        style={{
                            padding: '4px 10px',
                            borderRadius: 99,
                            border: `1.5px solid ${active === i ? s.color : '#e2e8f0'}`,
                            background: active === i ? s.color : 'white',
                            color: active === i ? 'white' : '#64748b',
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                        }}
                    >
                        <span>{s.emoji}</span>{s.name}
                    </button>
                ))}
            </div>

            {/* Progress */}
            <div style={{ height: 4, background: '#f1f5f9', borderRadius: 99, marginBottom: 14, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((active + 1) / STEPS.length) * 100}%`, background: `linear-gradient(90deg,#16a34a,${step.color})`, borderRadius: 99, transition: 'width 0.5s ease' }} />
            </div>

            {/* Detail card */}
            <div
                style={{
                    background: step.bg,
                    borderRadius: 18,
                    padding: '18px 20px',
                    border: `2px solid ${step.color}25`,
                    marginBottom: 14,
                    opacity: animating ? 0 : 1,
                    transform: animating ? 'translateY(6px)' : 'translateY(0)',
                    transition: 'opacity 0.14s, transform 0.14s',
                }}
            >
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>{step.emoji}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 5, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: 1, opacity: 0.7 }}>BƯỚC {active + 1}/{STEPS.length}</span>
                            <span style={{ background: step.color, color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 99 }}>{step.en}</span>
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: '0 0 5px' }}>{step.name}</h3>
                        <p style={{ fontSize: 13, color: '#475569', margin: '0 0 10px', lineHeight: 1.6 }}>{step.desc}</p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            <span style={{ background: 'white', border: `1px solid ${step.color}35`, borderRadius: 7, padding: '3px 9px', fontSize: 11, color: step.color, fontWeight: 600 }}>💡 {step.hint}</span>
                            <span style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 7, padding: '3px 9px', fontSize: 11, color: '#64748b', fontWeight: 600 }}>✅ {step.standard}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0}
                    style={{ padding: '8px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 700, fontSize: 13, cursor: active === 0 ? 'not-allowed' : 'pointer', opacity: active === 0 ? 0.4 : 1 }}>
                    ← Trước
                </button>
                <button onClick={toggleAuto}
                    style={{ flex: 1, padding: '8px', borderRadius: 10, border: `1.5px solid ${isAuto ? '#dc2626' : '#16a34a'}`, background: isAuto ? '#fef2f2' : '#f0fdf4', color: isAuto ? '#dc2626' : '#16a34a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    {isAuto ? '⏸ Dừng' : '▶ Tự động chạy'}
                </button>
                <button onClick={() => goTo(Math.min(STEPS.length - 1, active + 1))} disabled={active === STEPS.length - 1}
                    style={{ padding: '8px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 700, fontSize: 13, cursor: active === STEPS.length - 1 ? 'not-allowed' : 'pointer', opacity: active === STEPS.length - 1 ? 0.4 : 1 }}>
                    Tiếp →
                </button>
            </div>
        </div>
    );
}

const AnimationSection: React.FC = () => {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const [activeTab, setActiveTab] = useState<ActiveTab>('process');
    const [gameKey, setGameKey] = useState(0);
    const [gameResult, setGameResult] = useState<number | null>(null);

    const handleFinish = (score: number) => setGameResult(score);
    const retryGame = () => { setGameResult(null); setGameKey(k => k + 1); };
    const switchTab = (tab: ActiveTab) => { setActiveTab(tab); setGameResult(null); setGameKey(k => k + 1); };

    return (
        <section id="animation" ref={ref} style={{ padding: '80px 0', background: 'linear-gradient(180deg,#ffffff 0%,#f0fdf4 50%,#ffffff 100%)' }}>
            <style>{`
        @keyframes shakeX { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

            <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 16px' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 36, opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s, transform 0.6s' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#dcfce7', color: '#15803d', borderRadius: 99, padding: '5px 14px', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
                        🌿 LIVERA – Aloe Vera Powder
                    </span>
                    <h2 style={{ fontSize: 'clamp(26px,5vw,42px)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px', letterSpacing: -1 }}>
                        Dây Chuyền{' '}
                        <span style={{ background: 'linear-gradient(90deg,#16a34a,#0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sản Xuất</span>
                    </h2>
                    <p style={{ fontSize: 15, color: '#64748b', maxWidth: 460, margin: '0 auto' }}>
                        Khám phá 8 công đoạn và thử thách bản thân với mini-game
                    </p>
                </div>

                {/* Card */}
                <div style={{ background: 'white', borderRadius: 22, boxShadow: '0 4px 36px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden', opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transition: 'opacity 0.7s 0.2s, transform 0.7s 0.2s' }}>

                    {/* Tabs */}
                    <div style={{ padding: '14px 14px 0', background: '#fafafa', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
                            <TabBtn active={activeTab === 'process'} onClick={() => switchTab('process')} emoji="🎬" label="Quy trình" color="#16a34a" />
                            <TabBtn active={activeTab === 'sort'} onClick={() => switchTab('sort')} emoji="🔀" label="Game sắp xếp" color="#7c3aed" />
                            <TabBtn active={activeTab === 'speed'} onClick={() => switchTab('speed')} emoji="⚡" label="Game tốc độ" color="#d97706" />
                        </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: 18, minHeight: 400, animation: 'slideUp 0.28s ease-out' }} key={`${activeTab}-${gameKey}`}>
                        {activeTab === 'process' && <ProcessViewer />}
                        {activeTab === 'sort' && (
                            gameResult !== null
                                ? <ResultOverlay score={gameResult} onRetry={retryGame} onBack={() => switchTab('process')} />
                                : <SortGame key={gameKey} onFinish={handleFinish} />
                        )}
                        {activeTab === 'speed' && (
                            gameResult !== null
                                ? <ResultOverlay score={gameResult} onRetry={retryGame} onBack={() => switchTab('process')} />
                                : <SpeedGame key={gameKey} onFinish={handleFinish} />
                        )}
                    </div>
                </div>

                {/* Chips */}
                <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', opacity: isInView ? 1 : 0, transition: 'opacity 0.6s 0.5s' }}>
                    {[{ emoji: '🌿', text: 'ĐBSCL nguyên liệu' }, { emoji: '❄️', text: 'Sấy thăng hoa' }, { emoji: '🔍', text: 'QR Code 100%' }, { emoji: '🏅', text: 'HACCP / ISO' }].map((chip, i) => (
                        <span key={i} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 99, padding: '4px 11px', fontSize: 11, fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
                            {chip.emoji} {chip.text}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AnimationSection;