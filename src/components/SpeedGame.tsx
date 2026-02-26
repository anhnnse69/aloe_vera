import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Step } from '../utils/gameData';
import { STEPS, shuffle } from '../utils/gameData';
import { TimerBar, LivesBar } from './GameSharedUI';

interface SpeedGameProps {
    onFinish: (score: number) => void;
}

const SpeedGame: React.FC<SpeedGameProps> = ({ onFinish }) => {
    const queue = useRef<Step[]>(shuffle([...STEPS, ...STEPS, ...STEPS]).slice(0, 15));
    const [current, setCurrent] = useState(0);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [timeLeft, setTimeLeft] = useState(6);
    const [combo, setCombo] = useState(0);
    const [choices, setChoices] = useState<Step[]>([]);
    const done = useRef(false);
    const feedbackRef = useRef<'correct' | 'wrong' | null>(null);
    const scoreRef = useRef(0);
    const livesRef = useRef(3);
    const comboRef = useRef(0);

    const buildChoices = useCallback((idx: number) => {
        const step = queue.current[idx];
        const wrong = shuffle(STEPS.filter(s => s.id !== step.id)).slice(0, 2);
        setChoices(shuffle([step, ...wrong]));
    }, []);

    useEffect(() => { buildChoices(0); }, [buildChoices]);

    const advance = useCallback((next: number) => {
        feedbackRef.current = null;
        setFeedback(null);
        setTimeLeft(6);
        setCurrent(next);
        if (next < queue.current.length) buildChoices(next);
    }, [buildChoices]);

    useEffect(() => {
        if (done.current) return;
        if (current >= queue.current.length || livesRef.current <= 0) {
            if (!done.current) { done.current = true; setTimeout(() => onFinish(scoreRef.current), 600); }
            return;
        }
        const tick = setInterval(() => {
            setTimeLeft(p => {
                if (p <= 1) {
                    clearInterval(tick);
                    if (!feedbackRef.current) {
                        feedbackRef.current = 'wrong';
                        setFeedback('wrong');
                        livesRef.current = Math.max(0, livesRef.current - 1);
                        setLives(livesRef.current);
                        comboRef.current = 0;
                        setCombo(0);
                        const next = current + 1;
                        setTimeout(() => advance(next), 700);
                    }
                    return 0;
                }
                return p - 1;
            });
        }, 1000);
        return () => clearInterval(tick);
    }, [current, advance, onFinish]);

    const handleAnswer = useCallback((isCorrect: boolean) => {
        if (feedbackRef.current !== null) return;
        feedbackRef.current = isCorrect ? 'correct' : 'wrong';
        setFeedback(isCorrect ? 'correct' : 'wrong');
        if (isCorrect) {
            comboRef.current += 1;
            const gained = 15 + (comboRef.current >= 3 ? 10 : 0);
            scoreRef.current += gained;
            setScore(scoreRef.current);
            setCombo(comboRef.current);
        } else {
            comboRef.current = 0;
            livesRef.current = Math.max(0, livesRef.current - 1);
            setLives(livesRef.current);
            setCombo(0);
        }
        const next = current + 1;
        setTimeout(() => advance(next), 700);
    }, [current, advance]);

    if (done.current || current >= queue.current.length || lives <= 0) {
        return <div style={{ textAlign: 'center', padding: 20, color: '#16a34a', fontWeight: 900, fontSize: 17 }}>{lives > 0 ? '🏆 Hoàn thành!' : '💔 Hết mạng!'}</div>;
    }

    const step = queue.current[current];
    const borderColor = feedback === 'correct' ? '#16a34a' : feedback === 'wrong' ? '#dc2626' : step.color;
    const bgColor = feedback === 'correct' ? '#f0fdf4' : feedback === 'wrong' ? '#fef2f2' : step.bg;

    return (
        <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                <TimerBar timeLeft={timeLeft} total={6} />
                <LivesBar lives={lives} />
                <span style={{ fontWeight: 900, color: '#16a34a', fontSize: 17, minWidth: 55 }}>⚡ {score}</span>
                {combo >= 2 && <span style={{ background: '#dc2626', color: 'white', borderRadius: 99, padding: '2px 7px', fontWeight: 800, fontSize: 10 }}>🔥 x{combo}</span>}
            </div>

            <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 11, marginBottom: 8 }}>{current + 1} / {queue.current.length}</div>

            <div style={{
                background: bgColor, border: `3px solid ${borderColor}`, borderRadius: 16, padding: '18px 16px', textAlign: 'center', marginBottom: 12,
                transition: 'all 0.2s', boxShadow: `0 3px 16px ${step.color}15`,
                animation: feedback === 'wrong' ? 'shakeX 0.4s' : 'none',
            }}>
                <div style={{ fontSize: 48, lineHeight: 1 }}>{step.emoji}</div>
                <div style={{ fontSize: 13, color: '#475569', marginTop: 8, fontWeight: 600 }}>{step.desc}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, fontStyle: 'italic' }}>💡 {step.hint}</div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800, minHeight: 22 }}>
                    {feedback === 'correct' && <span style={{ color: '#16a34a' }}>✅ Đúng rồi!</span>}
                    {feedback === 'wrong' && <span style={{ color: '#dc2626' }}>❌ Đáp án: {step.name}</span>}
                    {!feedback && <span style={{ color: '#94a3b8' }}>Đây là bước nào?</span>}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
                {choices.map((choice, i) => (
                    <button key={i} onClick={() => handleAnswer(choice.id === step.id)} disabled={feedback !== null}
                        style={{
                            background: feedback !== null ? (choice.id === step.id ? '#f0fdf4' : '#f8fafc') : 'white',
                            border: `2px solid ${feedback !== null ? (choice.id === step.id ? '#16a34a' : '#e2e8f0') : choice.color}`,
                            borderRadius: 11, padding: '10px 5px',
                            color: feedback !== null ? (choice.id === step.id ? '#16a34a' : '#94a3b8') : choice.color,
                            fontWeight: 800, fontSize: 11, cursor: feedback !== null ? 'default' : 'pointer', textAlign: 'center', transition: 'all 0.15s',
                            boxShadow: feedback === null ? `0 1px 5px ${choice.color}15` : 'none',
                        }}
                    >
                        <div style={{ fontSize: 20, marginBottom: 3 }}>{choice.emoji}</div>
                        {choice.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SpeedGame;