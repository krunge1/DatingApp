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
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<CreateProfile />} />
                    <Route path="/profile/userProfile" element={<Profile />} />
                    <Route path="/profile/:id/edit" element={<EditProfile />} />
                    <Route path="/friends/:id" element={<Friends />} />
                    {/* <Route pathe="/dashboard" element={<HomePage/>}/> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
