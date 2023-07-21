import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import TestPage from "./components/TestPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className={"bg-gradient-to-r from-rose-100 to-teal-50 "}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route pathe="/dashboard" element={<HomePage/>}/> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
