import { useState, useEffect } from 'react';

export function useTransactions() {
  const [danhSachGiaoDich, setDanhSachGiaoDich] = useState([]);
  useEffect(()=>{
    async function layGiaodich() {
      try {
        const response = await fetch("http://localhost:3001/giaoDich")
        const dataGiaoDich= await response.json();
        console.log("lấy dta ", dataGiaoDich);
        const dataSapXep = dataGiaoDich.sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime());
        setDanhSachGiaoDich(dataSapXep);
        
      } catch (error) {
        console.log("lỗi ",error);
        
      }
    }layGiaodich()
  },[])
  
 

  const luuGiaoDich = async (giaoDichMoi) => {
    try {
      const response = await fetch("http://localhost:3001/giaoDich",{
        method:'POST',
        headers: {
                    'Content-Type': 'application/json',},
        body : JSON.stringify(giaoDichMoi),
      })
      const dataGiaoDich = await response.json();
      setDanhSachGiaoDich((prev)=>{
        const arrGiaoDich =[...prev,dataGiaoDich];
        return arrGiaoDich.sort((a,b)=>new Date(b.ngay).getTime()-new Date(a.ngay).getTime());
      });
    } catch (error) {
      console.log("lôi ",error);
      
    }
  };

 const luuGiaoDichSua = async (giaoDichSua) => {
    try {
      const response = await fetch(`http://localhost:3001/giaoDich/${giaoDichSua.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giaoDichSua),
      });
      const dataGiaoDich = await response.json();
      setDanhSachGiaoDich((prev) => {
        const arrGiaoDich = prev.map((gd) => (gd.id === dataGiaoDich.id ? dataGiaoDich : gd));
        return arrGiaoDich.sort((a, b) => new Date(b.ngay).getTime() - new Date(a.ngay).getTime());
      });
    } catch (error) {
      console.log("lôi ", error);
    }
  };

  const xoaGiaoDich = async (id) => {
    try {
      await fetch(`http://localhost:3001/giaoDich/${id}`, {
        method: 'DELETE',
      });
      setDanhSachGiaoDich((prev) => prev.filter((gd) => gd.id !== id));
    } catch (error) {
      console.log("lôi ", error);
    }
  };

  return {
    danhSachGiaoDich,
    luuGiaoDich,
    luuGiaoDichSua,
    xoaGiaoDich
  };
}
