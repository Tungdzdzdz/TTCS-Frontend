import { Route, createBrowserRouter, createRoutesFromChildren } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import App from "./components/App";
import Home from "./components/Home";

const router = createBrowserRouter(
    createRoutesFromChildren([
        <Route path="/" element={<Home/>}>
            <Route path="auth">
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
        </Route>
    ])
)

export default router;