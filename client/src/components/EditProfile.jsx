import React from "react";
import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = (props) => {
    const navigate = useNavigate();
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
            <form action="" className=" justify-self-center w-[90%] m-auto ">
                {/* Gray background Will be removed */}
                <div className=" h-[200px] justify-self-center m-auto flex items-center gap-4 my-2 max-w-[920px]">
                    <label
                        className="text-dText/50 font-semibold text-md"
                        htmlFor="email">
                        About&nbsp;Me
                    </label>
                    <textarea name="" id="" cols="30" rows="5"></textarea>
                </div>
                <div className="justify-around m-auto flex items-center gap-4 my-2  max-w-[780px]">
                    <h3
                        className="text-dText/50 font-semibold text-md mr-4"
                        htmlFor="email">
                        Gernder
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4">
                        <div className="flex items-center gap-2">
                            <input type="radio" name="gender" value="male" />
                            <label className="text-dText/50 font-semibold text-sm">
                                male
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" name="gender" value="female" />
                            <label className="text-dText/50 font-semibold text-sm">
                                female
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" name="gender" value="other" />
                            <label className="text-dText/50 font-semibold text-sm">
                                other
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="notState"
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
                        <input className="text-dText" type="text" name="name" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 w-full py-2">
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                City
                            </label>
                            <input
                                className="text-dText"
                                type="text"
                                name="name"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                State
                            </label>
                            <input
                                className="text-dText"
                                type="text"
                                name="name"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                Zip&nbsp;Code
                            </label>
                            <input
                                className="text-dText"
                                type="text"
                                name="name"
                            />
                        </div>
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
                <div className="max-w-[920px] flex flex-col m-auto">
                    <div className="flex items-center gap-2 ">
                        <input className="text-dText" type="text" name="name" />
                        <div className="flex items-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50">
                            <div className="cursor-pointer hover:scale-110 duration-200">
                                <span className="text-dText font-bold">
                                    Browser
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="  justify-around m-auto items-center gap-4 my-2 max-w-[780px]">
                    <h3 className="text-dText/50 font-semibold text-md mr-4 mt-4 mb-2">
                        Interests
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-6">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" value="sport" />
                            <label className="text-dText/50 font-semibold text-sm">
                                sport
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" value="reading" />
                            <label className="text-dText/50 font-semibold text-sm">
                                reading
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" value="hiking" />
                            <label className="text-dText/50 font-semibold text-sm">
                                hiking
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" value="coding" />
                            <label className="text-dText/50 font-semibold text-sm">
                                coding
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" value="miniGolf" />
                            <label className="text-dText/50 font-semibold text-sm">
                                mini golf
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" value="etc" />
                            <label className="text-dText/50 font-semibold text-sm">
                                etc
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <div className="flex justify-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50 max-w-[1200px]">
                        <div className="cursor-pointer hover:scale-110 duration-200 ">
                            <span className="text-dText font-bold">
                                Update Profile
                            </span>
                        </div>
                    </div>
                </div>
            </form>
            <div className="flex justify-end mt-4 mx-[5%]">
                <div className="flex justify-center gap-4 border px-4 py-2 rounded-2xl bg-red-700 max-w-[1200px]">
                    <div className="cursor-pointer hover:scale-110 duration-200 ">
                        <span className="text-slate-200 font-bold">
                            Delete Account
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
