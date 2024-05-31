import { Link,  useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Home from "@material-ui/icons/Home";
import { TfiArrowCircleDown } from "react-icons/tfi";
import ExportButton from "./DropdownExport/ExportButton";
import { useState } from "react";
import './nav.css';
import { NavItems } from "./NavItems";


const isActive = (location, path) => {
    return location.pathname === path ? { color: "#f57c00" } : { color: "#fff" };
};

const isPartActive = (location, path) => {
    return location.pathname.includes(path) ? { color: "#f57c00" } : { color: "#fff" };
};

const Menu = () => {
    const [dropdown, setDropdown] = useState(false);
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
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
                        if(item.label == "Thống kê") {
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
                        return (
                            <li key={item.id}>
                                <Link to={item.path}>
                                    <Button style={isPartActive(location, item.path)}>{item.label}</Button>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Toolbar>
        </AppBar>
    );
};

export default Menu;
