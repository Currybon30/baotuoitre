import Menu from './core/menu';
import Footer from './core/footer';
import { Routes, Route } from 'react-router-dom';
import BieuMau from './home/bieumau';
import Home from './home/home';
import QuanLy from './manage/quanly';
import BieuMauOne from './manage/bieumauone';
import ExportByMonth from './exports/exportByMonth';
import ExportByPage from './exports/exportByPage';

export default function MainRouters() {
    return (
        <div>
            <Menu />
            <Routes>
                <Route exact path="/baotuoitre"  Component={Home}/>
                <Route path="/baotuoitre/taobieumau" Component={BieuMau} />
                <Route path="/baotuoitre/quanlybieumau" Component={QuanLy}  />
                <Route path="/baotuoitre/quanlybieumau/:id" Component={BieuMauOne} />
                <Route path="/baotuoitre/thongketheothang"  Component={ExportByMonth}/>
                <Route path="/baotuoitre/thongketheotrang"  Component={ExportByPage}/>
            </Routes>
            <Footer />  
        </div>
    );
}
