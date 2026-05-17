import { useState } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import FilterBar from './components/FilterBar';
import { useTransactions } from './hooks/useTransactions';
import { useFilters } from './hooks/useFilters';

function App() {
  const { danhSachGiaoDich, luuGiaoDich, luuGiaoDichSua: luuSuaHook, xoaGiaoDich } = useTransactions();
  const { thangLoc, setThangLoc, namLoc, setNamLoc, danhSachLoc } = useFilters(danhSachGiaoDich);
  
  const [idGiaoDichDangSua, setIdGiaoDichDangSua] = useState(null);

  const chonGiaoDichSua = (id) => {
    setIdGiaoDichDangSua(id);
  };

  const huySua = () => {
    setIdGiaoDichDangSua(null);
  };

  const luuGiaoDichSua = (giaoDichSua) => {
    luuSuaHook(giaoDichSua);
    setIdGiaoDichDangSua(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quản Lý Chi Tiêu</h1>
      </header>
      
      <main className="app-main">
        <section className="top-dashboard">
          <FilterBar 
            thang={thangLoc} 
            nam={namLoc} 
            thayDoiThang={setThangLoc} 
            thayDoiNam={setNamLoc} 
          />
          <SummaryCards danhSachGiaoDich={danhSachLoc} />
        </section>
        
        <div className="app-content">
          <div className="main-panel">
            <Charts danhSachGiaoDich={danhSachLoc} />
            <TransactionList 
              danhSachGiaoDich={danhSachLoc} 
              idGiaoDichDangSua={idGiaoDichDangSua}
              chonGiaoDichSua={chonGiaoDichSua}
              xoaGiaoDich={xoaGiaoDich}
              luuGiaoDichSua={luuGiaoDichSua}
              huySua={huySua}
            />
          </div>
          
          <div className="side-panel">
            {!idGiaoDichDangSua ? (
              <TransactionForm luuGiaoDich={luuGiaoDich} />
            ) : (
              <div className="card edit-placeholder">
                <h3>Chế độ chỉnh sửa</h3>
                <p>Bạn đang sửa một giao dịch trong danh sách bên trái. Vui lòng lưu hoặc hủy để thêm giao dịch mới.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
