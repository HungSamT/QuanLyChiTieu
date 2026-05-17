export const danhSachHangMucChi = [
  { id: 'an-uong', ten: 'Ăn uống', icon: 'utensils' },
  { id: 'di-chuyen', ten: 'Di chuyển', icon: 'car' },
  { id: 'mua-sam', ten: 'Mua sắm', icon: 'shopping-bag' },
  { id: 'giai-tri', ten: 'Giải trí', icon: 'gamepad-2' },
  { id: 'y-te', ten: 'Y tế', icon: 'heart-pulse' },
  { id: 'hoa-don', ten: 'Hóa đơn', icon: 'receipt' },
  { id: 'khac-chi', ten: 'Khác', icon: 'circle-ellipsis' },
];

export const danhSachHangMucThu = [
  { id: 'luong', ten: 'Lương', icon: 'wallet' },
  { id: 'dau-tu', ten: 'Đầu tư', icon: 'wallet' },
  { id: 'khac-thu', ten: 'Khác', icon: 'circle-ellipsis' },
];

export const layIconTheoHangMuc = (tenHangMuc, loaiGiaoDich) => {
  const danhSach = loaiGiaoDich === 'chi' ? danhSachHangMucChi : danhSachHangMucThu;
  const hangMuc = danhSach.find(hm => hm.ten === tenHangMuc);
  return hangMuc.icon ;
};