import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthGuard } from "./AuthGuard";

import Dashboard from "../view/pages/Dashboard/Dashboard";
import Login from "../view/pages/Login/Login";
import Register from "../view/pages/Register/Register";
import AuthLayout from "../view/layouts/AuthLayout";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthGuard isPrivate={false} />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Route>

                <Route element={<AuthGuard isPrivate />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
