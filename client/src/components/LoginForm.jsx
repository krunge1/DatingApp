import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import IconChatHeart from "../assets/icons/HeartIcon";

const LoginForm = (props) => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const onChangeHandler = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/datingapp/login", formState, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setErrors(err.response.data);
            });
    };

    return (
        <div className="w-full h-screen grow flex items-center justify-around">
            <div>
                <div className="flex justify-center mb-8 gap-1">
                    <h1 className="justify-self-center">Blind Date</h1>
                    <span>
                        <IconChatHeart className="text-3xl text-dText hover:scale-150 duration-200" />
                    </span>
                </div>
                <div className="flex items-center gap-2 justify-end rotate-[353deg]">
                    <h2>Login</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                        <div>
                            <label
                                className="text-dText/50 font-semibold text-sm "
                                htmlFor="email">
                                Email
                            </label>

                            <input
                                className="text-dText"
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={onChangeHandler}
                            />
                        </div>
                        {errors ? <p> {errors.message} </p> : ""}

                        <div>
                            <label
                                className="text-dText/50 font-semibold text-sm"
                                htmlFor="password">
                                Password
                            </label>

                            <input
                                className="text-dText"
                                type="password"
                                name="password"
                                value={formState.password}
                                onChange={onChangeHandler}
                            />
                        </div>
                        {errors ? (
                            <p> {errors.message} </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <button className="primary mt-4" type="submit">
                        Login
                    </button>
                </form>
                <div className="flex justify-between  mt-4 max-w-[300px] m-auto">
                    <span className="text-secondary">
                        Don't have an account?
                    </span>
                    <span className="text-dText underline font-semibold" >
                        {" "}
                        <Link to={"/register"}>
                        Register
                        </Link>
                        {" "}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
