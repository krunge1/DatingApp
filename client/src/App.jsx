import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import TestPage from "./components/TestPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/CreateProfile";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<CreateProfile />} />
                    {/* <Route pathe="/dashboard" element={<HomePage/>}/> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
