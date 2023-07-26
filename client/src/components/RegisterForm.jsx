import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import IconChatHeart from "../assets/icons/HeartIcon";

const RegisterForm = (props) => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        birthdate: null,
        password: "",
        confirmPassword: "",
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
        console.log("is this working?");
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/datingapp/register", formState, {
                withCredentials: true,
            })
            .then((res) => {
                {
                    console.log(res.data);
                    navigate("/dashboard");
                }
            })
            .catch((err) => {
                {
                    console.log(err.response.data.error.errors);
                    setErrors(err.response.data.error.errors);
                }
            });
    };

    return (
        <div className="w-full h-screen grow flex items-center justify-around">
            <div>
                <div className="flex justify-center mb-16 gap-1">
                    <h1 className="justify-self-center">Blind Date</h1>
                    <span>
                        <IconChatHeart className="text-3xl text-dText hover:scale-150 duration-200" />
                    </span>
                </div>
                <div className="flex items-center gap-2 justify-end rotate-[353deg]">
                    <h2>Register</h2>
                </div>
                <div className="flex justify-between  mt-4 max-w-[300px] m-auto cursor-pointer">
                    <span className="text-secondary"> </span>
                    <span className="text-dText underline font-semibold">
                        {" "}
                        Back to <Link to={"/"}>Login</Link>{" "}
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            className="text-dText/50 font-semibold text-sm"
                            htmlFor="name">
                            Name
                        </label>
                        <input
                            className="text-dText"
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {errors.name ? (
                        <p className="font-semibold text-sm text-red-400">
                            {" "}
                            {errors.name.message}{" "}
                        </p>
                    ) : (
                        ""
                    )}

                    <div>
                        <label
                            className="text-dText/50 font-semibold text-sm"
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
                    {errors.email ? (
                        <p className="font-semibold text-sm text-red-400">
                            {" "}
                            {errors.email.message}{" "}
                        </p>
                    ) : (
                        ""
                    )}

                    <div>
                        <label
                            className="text-dText/50 font-semibold text-sm"
                            htmlFor="birthdate">
                            Birthdate
                        </label>
                        <input
                            className="text-dText"
                            type="date"
                            name="birthdate"
                            value={formState.birthdate}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {errors.birthdate ? (
                        <p className="font-semibold text-sm text-red-400">
                            {" "}
                            {errors.birthdate.message}{" "}
                        </p>
                    ) : (
                        ""
                    )}

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
                    {errors.password ? (
                        <p className="font-semibold text-sm text-red-400">
                            {" "}
                            {errors.password.message}{" "}
                        </p>
                    ) : (
                        ""
                    )}

                    <div>
                        <label
                            className="text-dText/50 font-semibold text-sm"
                            htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="text-dText"
                            type="password"
                            name="confirmPassword"
                            value={formState.confirmPassword}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {errors.confirmPassword ? (
                        <p className="font-semibold text-sm text-red-400">
                            {" "}
                            {errors.confirmPassword.message}{" "}
                        </p>
                    ) : (
                        ""
                    )}

                    <button className="primary mt-4" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
