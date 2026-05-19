import { dinhDangTien, dinhDangNgay } from '../utils/dinhDang';
import TransactionForm from './TransactionForm';

export default function TransactionList({
  danhSachGiaoDich,
  idGiaoDichDangSua,
  chonGiaoDichSua,
  xoaGiaoDich,
  luuGiaoDichSua,
  huySua,
  danhSachHangMucChi,
  danhSachHangMucThu
}) {
  const layIconTheoHangMuc = (tenHangMuc, loaiGiaoDich) => {
            const danhSach = loaiGiaoDich === 'chi' ? danhSachHangMucChi : danhSachHangMucThu;
            const hangMuc = danhSach?.find(hm => hm.ten === tenHangMuc);
           return hangMuc?.icon || 'circle-ellipsis';
        };


  const xuLyXoa = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
      xoaGiaoDich(id);
    }
  };

  if (danhSachGiaoDich.length === 0) {
    return (
      <div className="card list-container empty-list">
        <p>Chưa có giao dịch nào.</p>
      </div>
    );
  }

  return (
    <div className="card list-container">
      <h2>Danh sách giao dịch</h2>
      <div className="transaction-list">
        {danhSachGiaoDich.map((gd) => {
          if (idGiaoDichDangSua === gd.id) {
            return (
              <div key={gd.id} className="inline-form-wrapper">
                <TransactionForm
                  giaoDichSua={gd}
                  luuGiaoDich={luuGiaoDichSua}
                  huySua={huySua}
                  danhSachHangMucChi={danhSachHangMucChi}
                  danhSachHangMucThu={danhSachHangMucThu}
                />
              </div>
            );
          }

          return (
            <div key={gd.id} className="transaction-item">
              <div className="transaction-icon">
                <img
                  src={`https://unpkg.com/lucide-static@latest/icons/${layIconTheoHangMuc(gd.danhMuc, gd.loaiGiaoDich)}.svg`}
                  width={24} height={24}
                  alt={gd.danhMuc}
                />
              </div>

              <div className="transaction-info">
                <div className="transaction-title">{gd.danhMuc}</div>
                <div className="transaction-desc">{gd.ghiChu || gd.danhMuc}</div>
              </div>

              <div className="transaction-details">
                <div className={`transaction-amount ${gd.loaiGiaoDich}`}>
                  {gd.loaiGiaoDich === 'chi' ? '-' : '+'}{dinhDangTien(gd.soTien)}
                </div>
                <div className="transaction-date">{dinhDangNgay(gd.ngay)}</div>
              </div>

              <div className="transaction-actions">
                <button
                  className="btn-action edit"
                  onClick={() => chonGiaoDichSua(gd.id)}
                  title="Sửa"
                >
                  <img src="https://unpkg.com/lucide-static@latest/icons/pencil.svg" width={16} height={16} alt="Sửa" />
                </button>
                <button
                  className="btn-action delete"
                  onClick={() => xuLyXoa(gd.id)}
                  title="Xóa"
                >
                  <img src="https://unpkg.com/lucide-static@latest/icons/trash-2.svg" width={16} height={16} alt="Xóa" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}