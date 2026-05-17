import { dinhDangTien } from '../utils/dinhDang';

export default function SummaryCards({ danhSachGiaoDich }) {
  const tongThu = danhSachGiaoDich
    .filter(gd => gd.loaiGiaoDich === 'thu')
    .reduce((tong, gd) => tong + gd.soTien, 0);

  const tongChi = danhSachGiaoDich
    .filter(gd => gd.loaiGiaoDich === 'chi')
    .reduce((tong, gd) => tong + gd.soTien, 0);

  const soDu = tongThu - tongChi;

  return (
    <div className="summary-cards">
      <div className="card summary-card thu">
        <div className="summary-icon">
          <img src="https://unpkg.com/lucide-static@latest/icons/trending-up.svg" width={24} height={24} alt="Thu" />
        </div>
        <div className="summary-content">
          <h3>Tổng Thu</h3>
          <p className="amount">{dinhDangTien(tongThu)}</p>
        </div>
      </div>

      <div className="card summary-card chi">
        <div className="summary-icon">
          <img src="https://unpkg.com/lucide-static@latest/icons/trending-down.svg" width={24} height={24} alt="Chi" />
        </div>
        <div className="summary-content">
          <h3>Tổng Chi</h3>
          <p className="amount">{dinhDangTien(tongChi)}</p>
        </div>
      </div>

      <div className="card summary-card du">
        <div className="summary-icon">
          <img src="https://unpkg.com/lucide-static@latest/icons/wallet.svg" width={24} height={24} alt="Số dư" />
        </div>
        <div className="summary-content">
          <h3>Số Dư</h3>
          <p className="amount">{dinhDangTien(soDu)}</p>
        </div>
      </div>
    </div>
  );
}