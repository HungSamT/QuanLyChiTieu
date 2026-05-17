// Định dạng tiền tệ VND
export const dinhDangTien = (soTien) => {
  if (soTien == null) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(soTien);
};

// Định dạng ngày (dd/MM/yyyy)
export const dinhDangNgay = (chuoiNgay) => {
  if (!chuoiNgay) return '';
  const ngay = new Date(chuoiNgay);
  const d = String(ngay.getDate()).padStart(2, '0');
  const m = String(ngay.getMonth() + 1).padStart(2, '0');
  const y = ngay.getFullYear();
  return `${d}/${m}/${y}`;
};

// Lấy tháng và năm từ chuỗi ngày yyyy-mm-dd
export const layThangNam = (chuoiNgay) => {
  if (!chuoiNgay) return { thang: new Date().getMonth() + 1, nam: new Date().getFullYear() };
  const ngay = new Date(chuoiNgay);
  return {
    thang: ngay.getMonth() + 1,
    nam: ngay.getFullYear()
  };
};