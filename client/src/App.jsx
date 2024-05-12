import MainRouters from "./mainRouters";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <MainRouters />
        </BrowserRouter>
    );
}
