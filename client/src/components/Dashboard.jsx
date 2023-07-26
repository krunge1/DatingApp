import React, {useEffect} from "react";
import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";
import axios from "axios";

const Dashboard = () => {

    const goToProfile = (e) => {
        console.log("let's get this profile")
        e.preventDefault();

        axios
            .get("http://localhost:8000/api/profiles/user/:userId", )
    }

    const handleSubmit = (e) => {
        console.log("is this working?");
        e.preventDefault();
        
        axios
            .post("http://localhost:8000/api/datingapp/register", formState, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch((err) => {
                {
                console.log(err.response.data.error.errors);
                setErrors(err.response.data.error.errors);
                }
            });
    };

    return (
        <div>
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

                        <span className="text-dText font-bold " onClick={goToProfile}>Profile</span>
                    </div>
                    <div className="border border-r border-secondary h-4" />
                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold">Logout</span>
                    </div>
                </div>
            </div>

            <div className="items-start grid lg:grid-cols-2 mx-auto">
                <div className="justify-self-center">
                    {/* I PUT HEIGHT ON THE NEXT LINE JUST FOR REFERANCE */}
                    <div className="border border-red-500 w-[500px]  mx-2 my-2 justify-self-center py-4">
                        {/* <div className=" bg-slate-50 rounded-xl w-[500px]  mx-2 my-2 justify-self-center py-4"> */}

                        <div>
                            <p className="text-secondary mx-8 text-lg font-bold">
                                Your Blind Date Recommendation
                            </p>
                            <div className="items-center grid grid-cols-2 mx-auto mt-4">
                                {/* BUT *THIS HEIGHT IS TO LIMITED THE HEIGHT OF PICTURE */}
                                {/* THESE 6 DIVs SHOULD BE REDUCE TO ONLY 1 AND USE 'map' TO ITERATE  */}
                                <div className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                        <img
                                            src={testImg}
                                            alt=""
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                    <h3 className="text-dText font-semibold text-sm">
                                        Titann
                                    </h3>
                                </div>
                                <div className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                        <img
                                            src={testImg}
                                            alt=""
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                    <h3 className="text-dText font-semibold text-sm">
                                        Titann
                                    </h3>
                                </div>
                                <div className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                        <img
                                            src={testImg}
                                            alt=""
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                    <h3 className="text-dText font-semibold text-sm">
                                        Titann
                                    </h3>
                                </div>
                                <div className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                        <img
                                            src={testImg}
                                            alt=""
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                    <h3 className="text-dText font-semibold text-sm">
                                        Titann
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border border-red-500 w-[500px] h-[500px] mx-2 my-2 justify-self-center py-4"></div>
                </div>

                <div className="justify-self-center">
                    <div className="border border-red-500 w-[500px]  mx-2 my-2 justify-self-center py-4">
                        <p className="text-secondary mx-8 text-lg font-bold ">
                            Find New Friends
                        </p>
                        <div className="border border-red-500 w-[480px] h-[180px] mx-2 my-2 justify-self-center flex items-center p-2 gap-2">
                            <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                            <h3 className="text-dText font-semibold text-sm">
                                Titann
                            </h3>
                        </div>
                        <div className="border border-red-500 w-[480px] h-[180px] mx-2 my-2 justify-self-center flex items-center p-2 gap-2">
                            <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                            <h3 className="text-dText font-semibold text-sm">
                                Titann
                            </h3>
                        </div>
                        <div className="border border-red-500 w-[480px] h-[180px] mx-2 my-2 justify-self-center flex items-center p-2 gap-2">
                            <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                            <h3 className="text-dText font-semibold text-sm">
                                Titann
                            </h3>
                        </div>
                    </div>

                    <div className="border border-red-500 w-[500px]  mx-2 my-2 justify-self-center py-4">
                        <p className="text-secondary mx-8 text-lg font-bold ">
                            FRIEND LIST
                        </p>
                        <div className="border border-red-500 w-[480px] h-[180px] mx-2 my-2 justify-self-center flex items-center p-2 gap-2">
                            <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                            <h3 className="text-dText font-semibold text-sm">
                                Titann
                            </h3>
                        </div>
                        <div className="border border-red-500 w-[480px] h-[180px] mx-2 my-2 justify-self-center flex items-center p-2 gap-2">
                            <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                            <h3 className="text-dText font-semibold text-sm">
                                Titann
                            </h3>
                        </div>
                        <div className="border border-red-500 w-[480px] h-[180px] mx-2 my-2 justify-self-center flex items-center p-2 gap-2">
                            <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                <img
                                    src={testImg}
                                    alt=""
                                    className="object-cover rounded-xl w-full"
                                />
                            </div>
                            <h3 className="text-dText font-semibold text-sm">
                                Titann
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
