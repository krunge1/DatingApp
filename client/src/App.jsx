import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import TestPage from "./components/TestPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

function App() {
    const [count, setCount] = useState(0);

    let background = () => {
        let res = "";
        let number = Math.ceil(Math.random() * 5);
        switch (number) {
            case 1:
                res = "bg-pink-50";
                break;
            case 2:
                res = "bg-fuchsia-50";
                break;
            case 3:
                res = "bg-sky-50";
                break;
            case 4:
                res = "bg-teal-50";
                break;
            case 5:
                res = "bg-lime-50";
                break;
            default:
                console.log("There must be some issue");
        }
        return res;
    };

    return (
        <div className={background()}>
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
