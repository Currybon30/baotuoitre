import React from "react";
import MainRouters from "./mainRouters";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

export default function App() {
    return (
        <BrowserRouter>
            <MainRouters />
        </BrowserRouter>
    );
}
