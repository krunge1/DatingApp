import React, { useState } from "react";
import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Interest from "./Interest";

const CreateProfile = (props) => {
    const navigate = useNavigate();

    const [aboutMe, setAboutMe] = useState("");
    const [gender, setGender] = useState("");
    const [sexualOrientation, setSexualOrientation] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [interest, setInterest] = useState([]);

    const [errors, setErrors] = useState({});

    const logout = () => {
        axios
            .post(
                "http://localhost:8000/api/datingapp/logout",
                {},
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        console.log("is this working?");
        e.preventDefault();

        axios
            .post(
                "http://localhost:8000/api/datingapp/profiles/create",
                {
                    aboutMe,
                    gender,
                    sexualOrientation,
                    address,
                    city,
                    state,
                    zipCode,
                    // pictures,
                    interest
                },
                {withCredentials: true})
            .then((res) => {
                {
                    console.log(res.data);
                    navigate("/profile/userProfile");
                }
            })
            .catch((err) => {
                {
                    console.log(err.response.data.error.errors);
                    setErrors(err.response.data.error.errors);
                }
            });
    };

    function genderSelected(e) {
        setGender(e.target.value);
    }

    function sexualOrientationSelected(e) {
        setSexualOrientation(e.target.value);
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-8 py-8">
                <div className="">
                    <div className="flex justify-center gap-1">
                        <h1 className="">Blind Date</h1>
                        <span>
                            <IconChatHeart className="text-3xl text-dText hover:scale-150 duration-200" />
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50">
                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold" onClick={logout}>
                            Logout
                        </span>
                    </div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className=" justify-self-center w-[90%] m-auto ">
                {/* Gray background Will be removed */}
                <div className=" h-[200px] justify-self-center m-auto flex items-center gap-4 my-2 max-w-[920px]">
                    <label
                        className="text-dText/50 font-semibold text-md"
                        htmlFor="aboutMe">
                        About&nbsp;Me
                    </label>
                    <textarea
                        onChange={(e) => setAboutMe(e.target.value)}
                        value={aboutMe}
                        name="aboutMe"
                        id=""
                        cols="30"
                        rows="5"></textarea>
                </div>
                <div className="justify-around m-auto flex items-center gap-4 my-2  max-w-[780px]">
                    <h3
                        className="text-dText/50 font-semibold text-md mr-4"
                        htmlFor="gender">
                        Gender
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={genderSelected}
                            />
                            <label className="text-dText/50 font-semibold text-sm">
                                male
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={genderSelected}
                            />
                            <label className="text-dText/50 font-semibold text-sm">
                                female
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={gender === "other"}
                                onChange={genderSelected}
                            />
                            <label className="text-dText/50 font-semibold text-sm">
                                other
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="notState"
                                checked={gender === "notState"}
                                onChange={genderSelected}
                            />
                            <label className="text-dText/50 font-semibold text-sm">
                                prefer not to state
                            </label>
                        </div>
                    </div>
                </div>
                <div className="justify-around m-auto flex items-center gap-4 my-2 max-w-[780px]">
                    <h3 className="text-dText/50 font-semibold text-md mr-4">
                        Sexual&nbsp;Orientation
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="sexualOrientation"
                                value="straight"
                                checked={sexualOrientation === "straight"}
                                onChange={sexualOrientationSelected}
                            />
                            <label className="text-dText/50 font-semibold text-sm">
                                straight
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="sexualOrientation"
                                value="gay"
                                checked={sexualOrientation === "gay"}
                                onChange={sexualOrientationSelected}
                            />
                            <label className="text-dText/50 font-semibold text-sm">
                                gay
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="sexualOrientation"
                                value="bi"
                                checked={sexualOrientation === "bi"}
                                onChange={sexualOrientationSelected}
                            />
                            <label className="text-dText/50 font-semibold text-sm">
                                bi
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="sexualOrientation"
                                value="notState"
                                checked={sexualOrientation === "notState"}
                                onChange={sexualOrientationSelected}
                            />
                            <label className="text-dText/50 font-semibold text-sm">
                                prefer not to state
                            </label>
                        </div>
                    </div>
                </div>
                <div className="max-w-[920px] flex flex-col m-auto">
                    <div className="flex items-center gap-2 ">
                        <label className="text-dText/50 font-semibold text-sm">
                            Address
                        </label>
                        <input
                            className="text-dText"
                            type="text"
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 w-full py-2">
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                City
                            </label>
                            <input
                                className="text-dText"
                                type="text"
                                name="city"
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                State
                            </label>
                            <input
                                className="text-dText"
                                type="text"
                                name="state"
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                Zip&nbsp;Code
                            </label>
                            <input
                                className="text-dText"
                                type="text"
                                name="zipCode"
                                onChange={(e) => setZipCode(e.target.value)}
                                value={zipCode}
                            />
                        </div>
                        {errors.zipCode ? (
                            <p className="font-semibold text-sm text-red-400">
                                {" "}
                                {errors.zipCode.message}{" "}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="PHOTO">
                    <div className="items-center grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto mt-4">
                        <div className="w-[200px] h-[150px] mx-2 my-2 justify-self-center flex flex-col items-center">
                            <div className="bg-gray-200 w-[200px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                        </div>
                        <div className="w-[200px] h-[150px] mx-2 my-2 justify-self-center flex flex-col items-center">
                            <div className="bg-gray-200 w-[200px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                        </div>
                        <div className="w-[200px] h-[150px] mx-2 my-2 justify-self-center flex flex-col items-center">
                            <div className="bg-gray-200 w-[200px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                        </div>
                        <div className="w-[200px] h-[150px] mx-2 my-2 justify-self-center flex flex-col items-center">
                            <div className="bg-gray-200 w-[200px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[150px] flex flex-col m-auto mt-4">
                    {/* <div className="flex items-center gap-2 "> */}
                    {/* <input className="text-dText" type="text" name="name" /> */}
                    <input type="file" multiple className="hidden" />
                    <div className="flex justify-center hover:scale-110 duration-200 cursor-pointer gap-4 border px-4 py-2 rounded-2xl bg-primary/50">
                        <span className="text-dText font-bold ">Browse</span>
                        {/* </div> */}
                    </div>
                </div>
                <div className="  justify-around m-auto items-center gap-4 my-2 max-w-[780px]">
                    <h3 className="text-dText/50 font-semibold text-md mr-4 mt-4 mb-2">
                        Interests
                    </h3>
                    <Interest selected={interest} onChange={setInterest} />
                </div>
                <div className="flex justify-end mt-4">
                    <div className="flex justify-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50 max-w-[1200px]">
                        <div className="cursor-pointer hover:scale-110 duration-200 ">
                            <button
                                className="text-dText font-bold"
                                type="submit">
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProfile;
