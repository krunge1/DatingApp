import React, { useEffect, useState } from "react";
import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = (props) => {
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

    const [friends, setFriends] = useState({});
    const [blindDates, setBlindDates] = useState({});
    const [profileID, setProfileID] = useState({});

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // console.log(getRandomInt(4));

    // Dashboard page needs to pull in the profile info of logged in user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/datingapp/userProfile")
            .then((res) => {
                console.log(res.data);
                setFriends(res.data.friend);
                setBlindDates(res.data.blindDate);
                setProfileID(res.data._id);
                console.log(friends);
                console.log(blindDates);
            })
            .catch((err) => console.log(err));
    }, [blindDates, friends]);

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
                        <span className="text-dText font-bold ">
                            <Link to={"/profile/" + profileID}>Profile</Link>
                        </span>
                    </div>
                    <div className="border border-r border-secondary h-4" />
                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold" onClick={logout}>
                            Logout
                        </span>
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
                                {blindDates.map((date, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                            <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                                <img
                                                    // src={testImg}
                                                    // SHOULD REFERENCE THE FIRST PICTURE OF BLINDATE PROFILE
                                                    src={date.pictures[0]}
                                                    alt="profile picture of {date.user.name}"
                                                    className="object-cover rounded-xl w-full"
                                                />
                                            </div>
                                            <h3 className="text-dText font-semibold text-sm">
                                                {date.user.name}
                                            </h3>
                                        </div>
                                    );
                                })}

                                {/* I WILL DELETE THESE OTHER DIVS AS SOON AS THERE ARE ENOUGH BLIND DATES TO TEST 'map' ABOVE */}
                                {/* <div className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
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
                                </div> */}
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
                        {friends.map((friend, index) => {
                            const thisFriend =
                                friend.friend[getRandomInt(friend.length)];
                            return (
                                <div
                                    key={index}
                                    className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                        <img
                                            // src={testImg}
                                            // SHOULD REFERENCE THE FIRST PICTURE OF A RANDOM FRIEND OF A FRIEND PROFILE
                                            src={thisFriend.pictures[0]}
                                            alt="profile picture of {thisFriend.user.name}"
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                    <h3 className="text-dText font-semibold text-sm">
                                        {thisFriend.user.name}
                                    </h3>
                                </div>
                            );
                        })}
                        {/* I WILL DELETE THESE OTHER DIVS AS SOON AS THERE ARE ENOUGH FRIENDS OF FRIENDS TO TEST 'map' ABOVE */}
                        {/* <div className="border border-red-500 w-[480px] h-[180px] mx-2 my-2 justify-self-center flex items-center p-2 gap-2">
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
                        </div> */}
                    </div>

                    <div className="border border-red-500 w-[500px]  mx-2 my-2 justify-self-center py-4">
                        <p className="text-secondary mx-8 text-lg font-bold ">
                            FRIEND LIST
                        </p>

                        {friends.map((friend, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                        <img
                                            // src={testImg}
                                            // SHOULD REFERENCE THE FIRST PICTURE OF FRIEND PROFILE
                                            src={friend.pictures[0]}
                                            alt="profile picture of {friend.user.name}"
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                    <h3 className="text-dText font-semibold text-sm">
                                        {friend.user.name}
                                    </h3>
                                </div>
                            );
                        })}

                        {/* I WILL DELETE THESE OTHER DIVS AS SOON AS THERE ARE ENOUGH FRIENDS TO TEST 'map' ABOVE */}
                        {/* <div className="border border-red-500 w-[480px] h-[180px] mx-2 my-2 justify-self-center flex items-center p-2 gap-2">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
