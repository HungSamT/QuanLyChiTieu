import { useState } from 'react';
// import { danhSachHangMucChi, danhSachHangMucThu } from '../utils/hangMuc';

export default function TransactionForm({ luuGiaoDich, giaoDichSua, huySua, danhSachHangMucChi, danhSachHangMucThu, themHangMuc }) {
  const [loaiGiaoDich, setLoaiGiaoDich] = useState(giaoDichSua ? giaoDichSua.loaiGiaoDich : 'chi');
  const [soTien, setSoTien] = useState(giaoDichSua ? giaoDichSua.soTien : '');
  const [danhMuc, setDanhMuc] = useState(giaoDichSua ? giaoDichSua.danhMuc : "");
  const [ghiChu, setGhiChu] = useState(giaoDichSua ? giaoDichSua.ghiChu : '');
  const [ngay, setNgay] = useState(giaoDichSua ? giaoDichSua.ngay : new Date().toISOString().split('T')[0]);
  const [tenHangMucMoi, setTenHangMucMoi] = useState('');
  const [isAdd, setIsAdd] = useState('');



  const xuLyThemHangMuc = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!tenHangMucMoi.trim()) {
      alert("chưa Nhập tên hạng mục "); return;
    }

    const hangMucMoi = {
      ten: tenHangMucMoi.trim(),
      loai: loaiGiaoDich,
      icon: loaiGiaoDich === 'chi' ? "circle-ellipsis" : "wallet"
    }
    await themHangMuc(hangMucMoi);
    setTenHangMucMoi('');
    setIsAdd('')
  }

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

  const xuLyLuu = async (e) => {
    e.preventDefault();
    if (!soTien || !danhMuc || !ngay) {
      alert('Vui lòng nhập đầy đủ thông tin (số tiền, danh mục, ngày)!');
      return;
    }

    const giaoDichMoi = {
      ...(giaoDichSua && { id: giaoDichSua.id }),
      loaiGiaoDich,
      soTien: Number(soTien),
      danhMuc,
      ghiChu,
      ngay
    };

    await luuGiaoDich(giaoDichMoi);

    if (!giaoDichSua) {
      setSoTien('');
      setGhiChu('');
    }
  };

  const danhSachHangMucHienTai = loaiGiaoDich === 'chi' ? (danhSachHangMucChi || []) : (danhSachHangMucThu || []);

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
            {danhSachHangMucHienTai?.map(hm => (
              <option key={hm.id} value={hm.ten}>{hm.ten}</option>
            ))}
          </select>
          <div className='addHangMuc'>
            {!isAdd ? (<button className='btn_addhangMuc' onClick={() => setIsAdd(true)}>Thêm</button>) : (
            <div >  <input type="text"
              placeholder='Nhâp hạng mục'
              value={tenHangMucMoi}
              onChange={(e) => (setTenHangMucMoi(e.target.value))}
            />
              <button className='btn_addhangMuc' onClick={xuLyThemHangMuc}>
                thêm
              </button>
              <button className='btn_huyhangMuc' onClick={() => { setIsAdd(''); setTenHangMucMoi('') }}>
                Huỷ</button>

            </div>


          )}
          </div>
          
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