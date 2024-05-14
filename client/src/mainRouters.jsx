import Menu from './core/menu';
import Footer from './core/footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import BieuMau from './home/bieumau';
import Home from './home/home';
import QuanLy from './manage/quanly';
import BieuMauOne from './manage/bieumauone';
import ExportByMonth from './exports/exportByMonth';
import ExportByPage from './exports/exportByPage';
import ExportByDay from './exports/exportByDay';


export default function MainRouters() {
    return (
        <div>
            <Menu />
            <Routes>
                <Route exact path="/"  Component={Home}/>
                <Route path="/taobieumau" Component={BieuMau} />
                <Route path="/quanlybieumau" Component={QuanLy}  />
                <Route path="/quanlybieumau/:id" Component={BieuMauOne} />
                <Route path="/thongketheothang"  Component={ExportByMonth}/>
                <Route path="/thongketheotrang"  Component={ExportByPage}/>
                <Route path="/thongketheongay" Component={ExportByDay}/>
            
                {/* New route for redirection */}
                <Route path="/baotuoitre" element={<Navigate to="/" />} />
            </Routes>
            <Footer />  
        </div>
    );
}
