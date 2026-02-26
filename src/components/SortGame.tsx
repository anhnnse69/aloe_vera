import React, { useState, useEffect, useRef } from 'react';
import type { Step } from '../utils/gameData';
import { STEPS, shuffle } from '../utils/gameData';
import type { DragCard } from '../utils/gameData';
import { TimerBar } from './GameSharedUI';

interface SortGameProps {
    onFinish: (score: number) => void;
}

interface SlotStepProps {
    step: Step;
    index: number;
    filled: boolean;
    isWrong: boolean;
    onDrop: (e: React.DragEvent) => void;
}

const SlotStep: React.FC<SlotStepProps> = ({ step, index, filled, isWrong, onDrop }) => (
    <div
        onDragOver={(e: React.DragEvent) => e.preventDefault()}
        onDrop={onDrop}
        style={{
            borderRadius: 11,
            border: `2px dashed ${filled ? step.color : isWrong ? '#ef4444' : '#cbd5e1'}`,
            background: filled ? step.bg : isWrong ? '#fef2f2' : '#f8fafc',
            padding: '7px 3px',
            textAlign: 'center',
            minHeight: 64,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            animation: isWrong ? 'shakeX 0.4s' : 'none',
        }}
    >
        <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', marginBottom: 2 }}>Bước {index + 1}</div>
        {filled ? (
            <>
                <div style={{ fontSize: 18 }}>{step.emoji}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: step.color, marginTop: 1, lineHeight: 1.2 }}>{step.name}</div>
                <div style={{ fontSize: 10, marginTop: 1 }}>✅</div>
            </>
        ) : (
            <div style={{ fontSize: 16, opacity: 0.15 }}>?</div>
        )}
    </div>
);

const SortGame: React.FC<SortGameProps> = ({ onFinish }) => {
    const [cards, setCards] = useState<DragCard[]>(() =>
        shuffle(STEPS).map((s, i) => ({ id: i, stepId: s.id }))
    );
    const [slots, setSlots] = useState<(number | null)[]>(Array(8).fill(null));
    const [dragging, setDragging] = useState<number | null>(null);
    const [wrongSlot, setWrongSlot] = useState<number | null>(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90);
    const [combo, setCombo] = useState(0);
    const [score, setScore] = useState(0);
    const [popups, setPopups] = useState<{ id: number; text: string; color: string }[]>([]);
    const popId = useRef(0);
    const done = useRef(false);
    const scoreRef = useRef(0);

    useEffect(() => {
        if (done.current) return;
        if (timeLeft <= 0) { done.current = true; setTimeout(() => onFinish(scoreRef.current), 400); return; }
        const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
        return () => clearTimeout(t);
    }, [timeLeft, onFinish]);

    const addPopup = (text: string, color: string) => {
        const id = popId.current++;
        setPopups(p => [...p, { id, text, color }]);
        setTimeout(() => setPopups(p => p.filter(pp => pp.id !== id)), 1000);
    };

    const handleDrop = (slotIdx: number, e: React.DragEvent) => {
        e.preventDefault();
        if (dragging === null) return;
        const card = cards.find(c => c.id === dragging);
        if (!card || slots[slotIdx] !== null) { setDragging(null); return; }

        if (card.stepId === slotIdx) {
            const newCombo = combo + 1;
            setCombo(newCombo);
            const gained = 20 + (newCombo >= 3 ? 10 : 0);
            const newScore = scoreRef.current + gained;
            scoreRef.current = newScore;
            setScore(newScore);
            setSlots(p => { const n = [...p]; n[slotIdx] = card.stepId; return n; });
            setCards(p => p.filter(c => c.id !== dragging));
            addPopup(newCombo >= 3 ? `🔥 x${newCombo}! +${gained}` : `+${gained}`, STEPS[slotIdx].color);
            const newCorrect = correctCount + 1;
            setCorrectCount(newCorrect);
            if (newCorrect === 8 && !done.current) {
                done.current = true;
                const bonus = Math.floor(timeLeft * 1.5);
                scoreRef.current = newScore + bonus;
                setTimeout(() => onFinish(newScore + bonus), 600);
            }
        } else {
            setCombo(0);
            setWrongSlot(slotIdx);
            addPopup('❌ Sai!', '#dc2626');
            setTimeout(() => setWrongSlot(null), 500);
        }
        setDragging(null);
    };

    const availableCards = cards.filter(c => !slots.includes(c.stepId));

    return (
        <div style={{ position: 'relative' }}>
            <style>{`.popup-float{animation:popupFloat 1s ease-out forwards} @keyframes popupFloat{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-28px)}}`}</style>

            {/* Popups */}
            <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 3, pointerEvents: 'none' }}>
                {popups.map(p => (
                    <div key={p.id} className="popup-float" style={{ background: p.color, color: 'white', padding: '3px 10px', borderRadius: 99, fontWeight: 800, fontSize: 11, whiteSpace: 'nowrap' }}>{p.text}</div>
                ))}
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <TimerBar timeLeft={timeLeft} total={90} />
                <span style={{ fontWeight: 900, fontSize: 17, color: '#16a34a', minWidth: 55 }}>⚡ {score}</span>
                {combo >= 2 && <span style={{ background: '#dc2626', color: 'white', borderRadius: 99, padding: '2px 7px', fontWeight: 800, fontSize: 10 }}>🔥 x{combo}</span>}
                <span style={{ color: '#94a3b8', fontSize: 11, whiteSpace: 'nowrap' }}>⏱ {timeLeft}s</span>
            </div>

            <p style={{ fontSize: 11, color: '#64748b', textAlign: 'center', marginBottom: 10, background: '#f8fafc', borderRadius: 8, padding: '5px 8px', border: '1px solid #e2e8f0' }}>
                🖱️ Kéo & thả thẻ vào đúng ô theo thứ tự quy trình
            </p>

            {/* Slots */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, marginBottom: 12 }}>
                {STEPS.map((step: Step, i: number) => {
                    const filled: boolean = slots[i] !== null;
                    const isWrong: boolean = wrongSlot === i;
                    return (
                        <SlotStep
                            key={i}
                            step={step}
                            index={i}
                            filled={filled}
                            isWrong={isWrong}
                            onDrop={(e: React.DragEvent) => handleDrop(i, e)}
                        />
                    );
                })}
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
                {availableCards.map(card => {
                    const step = STEPS[card.stepId];
                    const isDragging = dragging === card.id;
                    return (
                        <div key={card.id} draggable
                            onDragStart={() => setDragging(card.id)}
                            onDragEnd={() => setDragging(null)}
                            style={{
                                background: isDragging ? step.bg : 'white',
                                border: `2px solid ${step.color}`,
                                borderRadius: 11, padding: '7px 10px', cursor: 'grab', userSelect: 'none', textAlign: 'center', minWidth: 68,
                                transition: 'all 0.15s',
                                boxShadow: isDragging ? `0 6px 16px ${step.color}45` : `0 1px 4px ${step.color}15`,
                                transform: isDragging ? 'scale(1.07) rotate(2deg)' : 'scale(1)',
                            }}
                        >
                            <div style={{ fontSize: 20 }}>{step.emoji}</div>
                            <div style={{ fontSize: 9, fontWeight: 700, color: step.color, marginTop: 2, lineHeight: 1.2 }}>{step.name}</div>
                        </div>
                    );
                })}
                {availableCards.length === 0 && (
                    <div style={{ color: '#16a34a', fontWeight: 800, fontSize: 14, padding: 8 }}>🎉 Hoàn thành!</div>
                )}
            </div>
        </div>
    );
};

export default SortGame;