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
                    <Link to="/">
                        <Button style={isActive(location, "/")}>
                            <Home />
                        </Button>
                    </Link>
                    <Link to="/taobieumau">
                        <Button style={isPartActive(location, "/taobieumau")} >Tạo biểu mẫu</Button>
                    </Link>
                    <Link to="/quanlybieumau">
                        <Button style={isPartActive(location, "/quanlybieumau")}>Quản lý biểu mẫu</Button>
                    </Link>
                    <Link to="/thongketheongay">
                        <Button style={isPartActive(location, "/thongketheongay")}>Thống kê theo ngày</Button>
                    </Link>
                    <Link to="/thongketheothang">
                        <Button style={isPartActive(location, "/thongketheothang")}>Thống kê theo tháng</Button>
                    </Link>
                    <Link to="/thongketheotrang">
                        <Button style={isPartActive(location, "/thongketheotrang")}>Thống kê theo trang</Button>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Menu;
