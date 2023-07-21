import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/register", formState, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mt-64">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {errors.name ? <p> {errors.name.message} </p> : ""}

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {errors.email ? <p> {errors.email.message} </p> : ""}

                    <div>
                        <label htmlFor="birthdate">Birthdate</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={formState.birthdate}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {errors.birthdate ? (
                        <p> {errors.birthdate.message} </p>
                    ) : (
                        ""
                    )}

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {errors.password ? <p> {errors.password.message} </p> : ""}

                    <div>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formState.confirmPassword}
                            onChange={onChangeHandler}
                        />
                    </div>
                    {errors.confirmPassword ? (
                        <p> {errors.confirmPassword.message} </p>
                    ) : (
                        ""
                    )}

                    <button className="primary" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
