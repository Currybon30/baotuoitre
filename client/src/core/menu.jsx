import { Link,  useLocation, useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Home from "@material-ui/icons/Home";
import { TfiArrowCircleDown } from "react-icons/tfi";
import ExportButton from "./DropdownExport/ExportButton";
import { useState } from "react";
import './nav.css';
import { NavItems } from "./NavItems";
import auth from "../auth/auth-helper.js";


const isActive = (location, path) => {
    return location.pathname === path ? { color: "#f57c00" } : { color: "#fff" };
};

const isPartActive = (location, path) => {
    return location.pathname.includes(path) ? { color: "#f57c00" } : { color: "#fff" };
};

const Menu = () => {
    const [dropdown, setDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar className="toolbar">
                <ul className="nav-menu">
                    {NavItems.map((item) => {
                        if(item.label == "Home") {
                            return (
                                <li key={item.id}>
                                    <Link to={item.path}>
                                        <Button style={isActive(location, item.path)}>
                                            <Home />
                                        </Button>
                                    </Link>
                                </li>
                            );
                        }
                        if(item.label == "Thống kê" && auth.isAuthenticated()) {
                            return (
                                <li key={item.id} className={item.cName}>
                                    <Button 
                                        style={isPartActive(location, item.path)}
                                        onMouseOver={() => setDropdown(true)}
                                        onMouseLeave={() => setDropdown(false)}>
                                        {item.label} <span style={{ marginLeft: '0.4rem' }}>
                                        <TfiArrowCircleDown /></span>
                                        {dropdown && <ExportButton/>}
                                    </Button>
                                    
                                </li>
                            );
                        }
                        if(item.label == 'Tạo biểu mẫu') {
                            return (
                                <li key={item.id}>
                                    <Link to={item.path}>
                                        <Button style={isPartActive(location, item.path)}>{item.label}</Button>
                                    </Link>
                                </li>
                            );
                        }
                        if(item.label == 'Quản lý biểu mẫu') {
                            return (
                                <li key={item.id}>
                                    <Link to={item.path}>
                                        <Button style={isPartActive(location, item.path)}>{item.label}</Button>
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            
                <div className="auth-buttons">
                    {!auth.isAuthenticated() && (
                        <Link to="/dangnhap">
                            <Button style={{ color: "#fff" }}>Đăng nhập</Button>
                        </Link>
                    )}
                    {auth.isAuthenticated() && (
                        <Link to="/signout">
                            <Button style={{ color: "#fff" }} onClick={() => auth.clearJWT(() => navigate('/'))}>Đăng xuất</Button>
                        </Link>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Menu;
