import { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { dinhDangTien } from '../utils/dinhDang';

const BANG_MAU = [
  '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#EC4899', '#06B6D4', '#F97316', '#14B8A6', '#4F46E5'
];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const pt = (payload[0].percent * 100).toFixed(1);
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <p style={{ margin: 0, fontWeight: '700', color: '#1f2937', fontSize: '14px' }}>{data.name}</p>
        <p style={{ margin: '6px 0 0', color: payload[0].fill, fontWeight: '800', fontSize: '15px' }}>
          {dinhDangTien(payload[0].value)} <span style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280' }}>({pt}%)</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: '700', color: '#1f2937', textAlign: 'center' }}>Tổng kết tháng</p>
        {payload.map((item, index) => (
          <p key={index} style={{ margin: '6px 0 0', color: item.fill, fontWeight: '800' }}>
            {`${item.name}: ${dinhDangTien(item.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export default function Charts({ danhSachGiaoDich }) {
  const [tabActive, setTabActive] = useState('chi');

  const giaoDichChi = danhSachGiaoDich.filter(gd => gd.loaiGiaoDich === 'chi');
  const tongChi = giaoDichChi.reduce((sum, gd) => sum + gd.soTien, 0);
  const duLieuChi = giaoDichChi.reduce((acc, gd) => {
    const existing = acc.find(item => item.name === gd.danhMuc);
    if (existing) {
      existing.value += gd.soTien;
    } else {
      acc.push({ name: gd.danhMuc, value: gd.soTien });
    }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  const giaoDichThu = danhSachGiaoDich.filter(gd => gd.loaiGiaoDich === 'thu');
  const tongThu = giaoDichThu.reduce((sum, gd) => sum + gd.soTien, 0);
  const duLieuThu = giaoDichThu.reduce((acc, gd) => {
    const existing = acc.find(item => item.name === gd.danhMuc);
    if (existing) {
      existing.value += gd.soTien;
    } else {
      acc.push({ name: gd.danhMuc, value: gd.soTien });
    }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  const duLieuSoSanh = [
    { name: 'Phân tích', Thu: tongThu, Chi: tongChi }
  ];

  const getInsights = () => {
    if (tabActive === 'chi' && duLieuChi.length > 0) {
      const top = duLieuChi[0];
      const pt = ((top.value / tongChi) * 100).toFixed(1);
      return (
        <div className="chart-insight chi">
          <p> Bạn đã chi <strong>{pt}%</strong> ngân sách cho <strong>{top.name}</strong>. Đây là hạng mục chi tiêu lớn nhất.</p>
        </div>
      );
    }
    if (tabActive === 'thu' && duLieuThu.length > 0) {
      const top = duLieuThu[0];
      const pt = ((top.value / tongThu) * 100).toFixed(1);
      return (
        <div className="chart-insight thu">
          <p> <strong>{top.name}</strong> là nguồn thu nhập chủ lực, chiếm <strong>{pt}%</strong> tổng thu của bạn.</p>
        </div>
      );
    }
    if (tabActive === 'soSanh') {
      if (tongThu === 0 && tongChi > 0) {
        return (
          <div className="chart-insight canh-bao">
            <p> Bạn đang chi tiêu <strong>{dinhDangTien(tongChi)}</strong> trong khi chưa có thu nhập. Hãy cân đối lại!</p>
          </div>
        );
      }
      if (tongThu === 0 && tongChi === 0) return null;
      
      const ptChiTrenThu = ((tongChi / tongThu) * 100).toFixed(1);
      if (tongThu >= tongChi) {
        return (
          <div className="chart-insight du">
            <p> Ổn định: Tổng chi tiêu chiếm <strong>{ptChiTrenThu}%</strong> thu nhập. Bạn tiết kiệm được <strong>{dinhDangTien(tongThu - tongChi)}</strong>.</p>
          </div>
        );
      } else {
        return (
          <div className="chart-insight canh-bao">
            <p> Báo động: Chi tiêu đã vượt <strong>{ptChiTrenThu}%</strong> so với thu nhập. Bạn đang thâm hụt <strong>{dinhDangTien(tongChi - tongThu)}</strong>.</p>
          </div>
        );
      }
    }
    return null;
  };

  const renderChart = () => {
    if (tabActive === 'chi') {
      if (duLieuChi.length === 0) return <div className="empty-chart-msg">Chưa có dữ liệu chi tiêu tháng này.</div>;
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={duLieuChi}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
            >
              {duLieuChi.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BANG_MAU[index % BANG_MAU.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (tabActive === 'thu') {
      if (duLieuThu.length === 0) return <div className="empty-chart-msg">Chưa có dữ liệu thu nhập tháng này.</div>;
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={duLieuThu}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
            >
              {duLieuThu.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BANG_MAU[index % BANG_MAU.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (tabActive === 'soSanh') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={duLieuSoSanh} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(val) => val >= 1000000 ? `${(val/1000000).toFixed(1)}M` : val >= 1000 ? `${(val/1000).toFixed(0)}K` : val} 
            />
            <Tooltip content={<CustomBarTooltip />} cursor={{fill: '#f8fafc'}} />
            <Legend iconType="rect" />
            <Bar dataKey="Thu" name="Thu nhập" fill="#10B981" radius={[8, 8, 0, 0]} barSize={50} />
            <Bar dataKey="Chi" name="Chi tiêu" fill="#EF4444" radius={[8, 8, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="card chart-container">
      <div className="chart-header">
        <button className={`chart-tab ${tabActive === 'chi' ? 'active chi' : ''}`} onClick={() => setTabActive('chi')}>Chi tiêu</button>
        <button className={`chart-tab ${tabActive === 'thu' ? 'active thu' : ''}`} onClick={() => setTabActive('thu')}>Thu nhập</button>
        <button className={`chart-tab ${tabActive === 'soSanh' ? 'active' : ''}`} onClick={() => setTabActive('soSanh')}>So sánh</button>
      </div>
      
      <div className="chart-wrapper">
        {renderChart()}
      </div>

      <div className="chart-footer">
        {getInsights()}
      </div>
    </div>
  );
}
