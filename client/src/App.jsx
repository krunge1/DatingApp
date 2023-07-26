import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import TestPage from "./components/TestPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/CreateProfile";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import axios from "axios";

function App() {
    const navigate = useNavigate
    const logout = () => {
        axios.post('http://localhost:8000/api/datingapp/logout', {} , {withCredentials:true})
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/dashboard" element={<Dashboard logout={logout}/>} />
                    <Route path="/profile" element={<CreateProfile logout={logout}/>} />
                    <Route path="/profile/:id" element={<Profile logout={logout}/>} />
                    <Route path="/profile/:id/edit" element={<EditProfile logout={logout}/>} />
                    <Route path="/friends/:id" element={<Friends logout={logout}/>} />
                    {/* <Route pathe="/dashboard" element={<HomePage/>}/> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
