import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import TestPage from "./components/TestPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";


function App() {
    const [count, setCount] = useState(0);

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm/>} />
                <Route path="/register" element={<RegisterForm/>} />
                {/* <Route pathe="/dashboard" element={<HomePage/>}/> */}
            </Routes>
        
        </BrowserRouter>
            {/* <TestPage /> */}
        </>
    );
}

export default App;
