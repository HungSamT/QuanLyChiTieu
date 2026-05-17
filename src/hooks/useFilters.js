import { useState } from 'react';

export function useFilters(danhSachGiaoDich) {
  const [thangLoc, setThangLoc] = useState(new Date().getMonth() + 1);
  const [namLoc, setNamLoc] = useState(new Date().getFullYear());

  const danhSachLoc = danhSachGiaoDich.filter(gd => {
    const ngay = new Date(gd.ngay);
    const trungNam = ngay.getFullYear() === namLoc;
    const trungThang = thangLoc === 0 ? true : (ngay.getMonth() + 1) === thangLoc;
    return trungNam && trungThang;
  });

  return {
    thangLoc,
    setThangLoc,
    namLoc,
    setNamLoc,
    danhSachLoc
  };
}
