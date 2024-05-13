import { Link,  useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Home from "@material-ui/icons/Home";


const isActive = (location, path) => {
    return location.pathname === path ? { color: "#f57c00" } : { color: "#fff" };
};

const isPartActive = (location, path) => {
    return location.pathname.includes(path) ? { color: "#f57c00" } : { color: "#fff" };
};

const Menu = () => {

    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <div>
                    <Link to="/baotuoitre">
                        <Button style={isActive(location, "/baotuoitre")}>
                            <Home />
                        </Button>
                    </Link>
                    <Link to="/baotuoitre/taobieumau">
                        <Button style={isPartActive(location, "/baotuoitre/taobieumau")} >Tạo biểu mẫu</Button>
                    </Link>
                    <Link to="/baotuoitre/quanlybieumau">
                        <Button style={isPartActive(location, "/baotuoitre/quanlybieumau")}>Quản lý biểu mẫu</Button>
                    </Link>
                    <Link to="/baotuoitre/thongketheothang">
                        <Button style={isPartActive(location, "/baotuoitre/thongketheothang")}>Thống kê theo tháng</Button>
                    </Link>
                    <Link to="/baotuoitre/thongketheotrang">
                        <Button style={isPartActive(location, "/baotuoitre/thongketheotrang")}>Thống kê theo trang</Button>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Menu;
