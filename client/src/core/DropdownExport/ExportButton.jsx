import React from "react";
import { ExportItems } from "./ExportItems";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./ExportButton.css";

const ExportButton = () => {
    const [dropdown, setDropdown] = useState(false);

    return(
        <>
            <li className={dropdown ? "sub-menu clicked" : "sub-menu"} onClick={() => setDropdown(!dropdown)}>
                {ExportItems.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link className={item.cName} to={item.path}>
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </li>
        </>
    )
}

export default ExportButton;