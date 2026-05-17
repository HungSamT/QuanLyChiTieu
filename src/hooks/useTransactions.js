import { useState, useEffect } from 'react';

export function useTransactions() {
  const [danhSachGiaoDich, setDanhSachGiaoDich] = useState(() => {
    const duLieuLuu = localStorage.getItem('danhSachGiaoDich');
    if (duLieuLuu) {
      try {
        const parsed = JSON.parse(duLieuLuu);
        // Sort initial data descending by date
        return parsed.sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime());
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu", error);
      }
    }
    return [];
  });

  // Lưu dữ liệu vào LocalStorage
  useEffect(() => {
    localStorage.setItem('danhSachGiaoDich', JSON.stringify(danhSachGiaoDich));
  }, [danhSachGiaoDich]);

  const luuGiaoDich = (giaoDichMoi) => {
    setDanhSachGiaoDich(prev => [giaoDichMoi, ...prev].sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime()));
  };

  const luuGiaoDichSua = (giaoDichSua) => {
    setDanhSachGiaoDich(prev => prev.map(gd => gd.id === giaoDichSua.id ? giaoDichSua : gd).sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime()));
  };

  const xoaGiaoDich = (id) => {
    setDanhSachGiaoDich(prev => prev.filter(gd => gd.id !== id));
  };

  return {
    danhSachGiaoDich,
    luuGiaoDich,
    luuGiaoDichSua,
    xoaGiaoDich
  };
}
