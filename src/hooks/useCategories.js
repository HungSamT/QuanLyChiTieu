import { useState, useEffect } from "react";



export function useCategories() {
    const [danhSachHangMucChi, setDanhSachHangMucChi] = useState([]);
    const [danhSachHangMucThu, setDanhSachHangMucThu] = useState([]);
    useEffect(() => {
        async function layDataHangMuc() {
            try {

                const response = await fetch('http://localhost:3001/hangMuc');
                const data = await response.json();
                console.log("hhh");

                const chi = data.filter((hm) => (hm.loai === "chi"));
                const thu = data.filter(hm => (hm.loai === "thu"))
                console.log("lây data thành công ", data);
                setDanhSachHangMucChi(chi);
                setDanhSachHangMucThu(thu);

            } catch (error) {
                console.log("lỗi ", error);
            }

        }
        layDataHangMuc();


    }, []);

    const themHangMuc = async (hangMucMoi) => {
        try {
            const response = await fetch('http://localhost:3001/hangMuc', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hangMucMoi),
            });

            const dataHangMucMoi = await response.json();
            if (dataHangMucMoi.loai === 'chi') {
                setDanhSachHangMucChi((prev) => [...prev, dataHangMucMoi])
            } else {
                setDanhSachHangMucThu((prev) => [...prev, dataHangMucMoi])
            }


        } catch (error) {
            console.log("lỗi ", error);

        }
      


    }

    return { danhSachHangMucChi, danhSachHangMucThu, themHangMuc }

}

   

