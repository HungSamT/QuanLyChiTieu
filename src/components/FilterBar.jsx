export default function FilterBar({ thang, nam, thayDoiThang, thayDoiNam }) {
  const cacThang = Array.from({ length: 12 }, (_, i) => i + 1);
  const namHienTai = new Date().getFullYear();
  const cacNam = Array.from({ length: 5 }, (_, i) => namHienTai - i); // 5 năm gần đây

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">
          <img src="https://unpkg.com/lucide-static@latest/icons/filter.svg" width={16} height={16} alt="Lọc" />
          Lọc theo:
        </label>
        <select value={thang} onChange={(e) => thayDoiThang(Number(e.target.value))}>
          <option value="0">Tất cả các tháng</option>
          {cacThang.map(t => (
            <option key={t} value={t}>Tháng {t}</option>
          ))}
        </select>
        
        <select value={nam} onChange={(e) => thayDoiNam(Number(e.target.value))}>
          {cacNam.map(n => (
            <option key={n} value={n}>Năm {n}</option>
          ))}
        </select>
      </div>
    </div>
  );
}