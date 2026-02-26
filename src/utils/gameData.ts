export interface Step {
    id: number;
    name: string;
    en: string;
    emoji: string;
    color: string;
    bg: string;
    desc: string;
    hint: string;
    standard: string;
}

export interface DragCard {
    id: number;
    stepId: number;
}

export const STEPS: Step[] = [
    { id: 0, name: 'Thu hoạch', en: 'HARVEST', emoji: '🌱', color: '#16a34a', bg: '#dcfce7', desc: 'Thu lá nha đam tươi trong 6 giờ', hint: 'Từ nông trại Mekong Delta', standard: 'Không hư hỏng, không hóa chất' },
    { id: 1, name: 'Rửa & Sơ chế', en: 'WASH', emoji: '💧', color: '#0284c7', bg: '#e0f2fe', desc: 'Ngâm muối loãng, khử khuẩn sạch', hint: 'Không để sót aloin vàng', standard: 'Dụng cụ đạt chuẩn VSATTP' },
    { id: 2, name: 'Gọt vỏ & Gel', en: 'PEEL', emoji: '🔪', color: '#059669', bg: '#d1fae5', desc: 'Gọt vỏ xanh, giữ gel trong suốt', hint: 'Gel phải trong, không đục', standard: 'Gel sạch, không nhớt, không mùi' },
    { id: 3, name: 'Xử lý Gel', en: 'PROCESS', emoji: '⚗️', color: '#7c3aed', bg: '#ede9fe', desc: 'Xay, thêm Vitamin C, lọc sợi', hint: 'Chống oxy hoá, giữ màu xanh', standard: 'Giữ polysaccharide, enzymes' },
    { id: 4, name: 'Sấy khô', en: 'DRY', emoji: '☀️', color: '#d97706', bg: '#fef3c7', desc: 'Sấy thăng hoa ≤80°C, ẩm <5%', hint: 'Màu trắng trong sau sấy', standard: 'Nhiệt độ ≤80°C, độ ẩm <5%' },
    { id: 5, name: 'Nghiền & Rây', en: 'GRIND', emoji: '⚙️', color: '#ca8a04', bg: '#fefce8', desc: 'Nghiền mịn <100µm đồng đều', hint: 'Kích thước hạt <100 micron', standard: 'Không vón cục, tan đều trong nước' },
    { id: 6, name: 'Kiểm định CL', en: 'QC', emoji: '🔬', color: '#4338ca', bg: '#e0e7ff', desc: 'Kiểm vi sinh, kim loại nặng', hint: 'Đạt chuẩn VSATTP / HACCP', standard: 'Acemannan, aloin, polysaccharide' },
    { id: 7, name: 'Đóng gói', en: 'PACK', emoji: '📦', color: '#db2777', bg: '#fce7f3', desc: 'Kín, chống ẩm, dán QR code', hint: 'QR truy xuất nguồn gốc', standard: 'Bảo quản 25±2°C, ẩm <65%' },
];

export function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}