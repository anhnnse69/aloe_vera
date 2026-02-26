export function TimerBar({ timeLeft, total }: { timeLeft: number; total: number }) {
    const pct = (timeLeft / total) * 100;
    const color = pct > 50 ? '#16a34a' : pct > 25 ? '#d97706' : '#dc2626';
    return (
        <div style={{ height: 5, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden', flex: 1 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 1s linear, background 0.3s' }} />
        </div>
    );
}

export function LivesBar({ lives, max = 3 }: { lives: number; max?: number }) {
    return (
        <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: max }).map((_, i) => (
                <span key={i} style={{ fontSize: 16, opacity: i < lives ? 1 : 0.2, transition: 'opacity 0.3s' }}>❤️</span>
            ))}
        </div>
    );
}

export function TabBtn({
    active, onClick, emoji, label, color,
}: {
    active: boolean; onClick: () => void; emoji: string; label: string; color: string;
}) {
    return (
        <button
            onClick={onClick}
            style={{
                flex: 1,
                padding: '10px 6px',
                borderRadius: 12,
                border: `2px solid ${active ? color : '#e2e8f0'}`,
                background: active ? `${color}15` : 'white',
                color: active ? color : '#64748b',
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                boxShadow: active ? `0 2px 12px ${color}25` : 'none',
            }}
        >
            <span style={{ fontSize: 15 }}>{emoji}</span>
            {label}
        </button>
    );
}

export function ResultOverlay({ score, onRetry, onBack }: { score: number; onRetry: () => void; onBack: () => void }) {
    const pct = Math.min(100, Math.round((score / 320) * 100));
    const stars = pct >= 88 ? 3 : pct >= 58 ? 2 : pct >= 28 ? 1 : 0;
    const rank = pct >= 88 ? { label: 'Chuyên gia LIVERA 🏆', color: '#16a34a' } : pct >= 58 ? { label: 'Thành thạo 🥈', color: '#d97706' } : { label: 'Đang học 🌱', color: '#7c3aed' };
    return (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 52, marginBottom: 6 }}>{pct >= 88 ? '🏆' : pct >= 58 ? '🥈' : '🌱'}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: rank.color, letterSpacing: 1, marginBottom: 4 }}>{rank.label}</div>
            <div style={{ fontSize: 46, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>điểm • {pct}% chính xác</div>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 22 }}>
                {[0, 1, 2].map(i => (
                    <span key={i} style={{ fontSize: 28, opacity: i < stars ? 1 : 0.2, filter: i < stars ? 'drop-shadow(0 0 4px #fbbf24)' : 'none', transition: `all 0.4s ${i * 0.15}s` }}>⭐</span>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={onRetry} style={{ flex: 1, padding: '11px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>🔁 Chơi lại</button>
                <button onClick={onBack} style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#16a34a,#059669)', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>📖 Xem quy trình</button>
            </div>
        </div>
    );
}