import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { danhSachHangMucChi, danhSachHangMucThu } from '../utils/hangMuc';

export default function TransactionForm({ luuGiaoDich, giaoDichSua, huySua }) {
  const [loaiGiaoDich, setLoaiGiaoDich] = useState(giaoDichSua ? giaoDichSua.loaiGiaoDich : 'chi');
  const [soTien, setSoTien] = useState(giaoDichSua ? giaoDichSua.soTien : '');
  const [danhMuc, setDanhMuc] = useState(giaoDichSua ? giaoDichSua.danhMuc : danhSachHangMucChi[0].ten);
  const [ghiChu, setGhiChu] = useState(giaoDichSua ? giaoDichSua.ghiChu : '');
  const [ngay, setNgay] = useState(giaoDichSua ? giaoDichSua.ngay : new Date().toISOString().split('T')[0]);

  const thayDoiLoaiGiaoDich = (loai) => {
    setLoaiGiaoDich(loai);
    if (!giaoDichSua) {
      if (loai === 'chi') {
        setDanhMuc(danhSachHangMucChi[0].ten);
      } else {
        setDanhMuc(danhSachHangMucThu[0].ten);
      }
    }
  };

  const xuLyLuu = (e) => {
    e.preventDefault();
    if (!soTien || !danhMuc || !ngay) {
      alert('Vui lòng nhập đầy đủ thông tin (số tiền, danh mục, ngày)!');
      return;
    }
    
    const giaoDichMoi = {
      id: giaoDichSua ? giaoDichSua.id : uuidv4(),
      loaiGiaoDich,
      soTien: Number(soTien),
      danhMuc,
      ghiChu,
      ngay
    };
    
    luuGiaoDich(giaoDichMoi);
    
    if (!giaoDichSua) {
      setSoTien('');
      setGhiChu('');
    }
  };

  const danhSachHangMucHienTai = loaiGiaoDich === 'chi' ? danhSachHangMucChi : danhSachHangMucThu;

  return (
    <div className={`card form-container ${giaoDichSua ? 'inline-form' : ''}`}>
      <h2>{giaoDichSua ? 'Sửa Giao Dịch' : 'Thêm Giao Dịch'}</h2>
      <form onSubmit={xuLyLuu}>
        <div className="form-group">
          <label>Loại giao dịch</label>
          <div className="loai-giao-dich-toggle">
            <button 
              type="button" 
              className={`btn-toggle ${loaiGiaoDich === 'chi' ? 'active chi' : ''}`}
              onClick={() => thayDoiLoaiGiaoDich('chi')}
            >
              Tiền chi
            </button>
            <button 
              type="button" 
              className={`btn-toggle ${loaiGiaoDich === 'thu' ? 'active thu' : ''}`}
              onClick={() => thayDoiLoaiGiaoDich('thu')}
            >
              Tiền thu
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label>Số tiền (VNĐ)</label>
          <input 
            type="number" 
            value={soTien} 
            onChange={(e) => setSoTien(e.target.value)}
            placeholder="Nhập số tiền..."
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Danh mục</label>
          <select value={danhMuc} onChange={(e) => setDanhMuc(e.target.value)}>
            {danhSachHangMucHienTai.map(hm => (
              <option key={hm.id} value={hm.ten}>{hm.ten}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Ngày</label>
          <input 
            type="date" 
            value={ngay} 
            onChange={(e) => setNgay(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ghi chú</label>
          <input 
            type="text" 
            value={ghiChu} 
            onChange={(e) => setGhiChu(e.target.value)}
            placeholder="Nhập ghi chú..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <img src="https://unpkg.com/lucide-static@latest/icons/save.svg" width={18} height={18} alt="Lưu" className="icon-white" />
            Lưu
          </button>
          {giaoDichSua && (
            <button type="button" className="btn btn-secondary" onClick={huySua}>
              <img src="https://unpkg.com/lucide-static@latest/icons/x.svg" width={18} height={18} alt="Hủy" />
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}