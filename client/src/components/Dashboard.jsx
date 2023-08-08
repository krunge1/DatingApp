import React, { useEffect, useState } from "react";
import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";
import mapImg from "../assets/testImages/busch_stadium.jpg"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
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

    function navToProfile() {
        navigate("/profile/userProfile");
    }

    const [profile, setProfile] = useState({});
    const [friends, setFriends] = useState([]);
    const [friendsFetched, setFriendsFetched] = useState(false);
    const [blindDates, setBlindDates] = useState([]);
    const [blindDatesFetched, setBlindDatesFetched] = useState(false);
    const [futureFriends, setFutureFriends] = useState({});
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Dashboard page needs to pull in the profile info of logged in user
    useEffect(() => {
        axios.get("http://localhost:8000/api/datingapp/userProfile", {
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data);
            setProfile(res.data);
                // setFriends(res.data.friend);
                // setBlindDates(res.data.blindDate);
                // setProfileID(res.data._id);
                // console.log(friends);
                // console.log(blindDates);
        })
        .catch((err) => {console.log(err);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/datingapp/profiles", {
            withCredentials: true
        })
        .then((res) => {
            // console.log(profile);
            const profileListExcludingUserProfile = res.data.filter(friend => friend._id !== profile._id);
            // console.log(profileListExcludingUserProfile);
            // console.log(res.data);
            setFutureFriends(profileListExcludingUserProfile);
        })
        .catch((err) => {console.log(err);
        });
    }, [profile]);


    useEffect(() => {
        // Function to fetch friend's profile by ID
        const fetchFriendProfile = (friendId) => {
        axios
            .get(`http://localhost:8000/api/datingapp/profiles/${friendId}`, { withCredentials: true })
            .then((res) => {
            console.log(res.data);
            setFriends((prevFriends) => [...prevFriends, res.data]);
            })
            .catch((err) => {
            console.log(err);
            });
        };
        console.log(friendsFetched)
        // Check if there are friends in the profile
        if (profile.friend && profile.friend.length > 0 && !friendsFetched) {
            // Randomize the order of friends
            const shuffledFriends = profile.friend.sort(() => Math.random() - 0.5);
    
            // Slice the first two friends from the shuffled array
            const selectedFriends = shuffledFriends.slice(0, 2);
    
            // Loop through each friend and fetch their profile
            selectedFriends.forEach((friendId) => {
            fetchFriendProfile(friendId);
            });
            setFriendsFetched(true);
        }
    }, [profile.friend, friendsFetched]);

    useEffect(() => {
        // Function to fetch blinddate's profile by ID
        const fetchBlindDateProfile = (dateId) => {
        axios
            .get(`http://localhost:8000/api/datingapp/profiles/${dateId}`, { withCredentials: true })
            .then((res) => {
            console.log(res.data);
            setBlindDates((prevDates) => [...prevDates, res.data]);
            })
            .catch((err) => {
            console.log(err);
            });
        };
    
        // Check if there are blindDates in the profile
        if (profile.blindDate && profile.blindDate.length > 0 && !blindDatesFetched) {
            // Randomize the order of dates
            const shuffledBlindDates = profile.blindDate.sort(() => Math.random() - 0.5);
    
            // Slice the first two dates(lol) from the shuffled array
            const selectedBlindDates = shuffledBlindDates.slice(0, 2);
    
            // Loop through each date and fetch their profile
            selectedBlindDates.forEach((dateId) => {
            fetchBlindDateProfile(dateId);
            });
            setBlindDatesFetched(true);
        }
    }, [profile.blindDate, blindDatesFetched]);

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
                        <span className="text-dText font-bold" onClick={navToProfile}>Profile</span>
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
                                {blindDates && blindDates.length > 0 ? (
                                    blindDates.map((date, index) => (
                                    <div
                                        key={index}
                                        className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                        <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                            <img
                                                // SHOULD REFERENCE THE FIRST PICTURE OF FRIEND PROFILE
                                                src={date.pictures[0]}
                                                alt={"profile picture of " + date.name}
                                                className="object-cover rounded-xl w-full"
                                            />
                                        </div>
                                        <h3 className="text-dText font-semibold text-sm">
                                            <Link to={"/friends/" + date._id}>{date.name}</Link>
                                        </h3>
                                    </div>
                                ))) : (
                                    <p>No recommendations yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="border border-red-500 w-[500px] mx-2 my-2 justify-self-center py-4">
                        <p className="text-secondary mx-8 text-lg font-bold">
                                Friends Near You
                        </p>
                        <div className="bg-gray-200 w-full h-[300px]">
                                <img
                                            src={mapImg}
                                            alt=""
                                            className="object-cover rounded-xl w-full"
                                        />
                                </div>
                    </div>
                </div>

                <div className="justify-self-center">
                    <div className="border border-red-500 w-[500px]  mx-2 my-2 justify-self-center py-4">
                        <p className="text-secondary mx-8 text-lg font-bold ">
                            Find New Friends
                        </p>
                        <div className="items-center grid grid-cols-2 mx-auto mt-4">
                        {futureFriends && futureFriends.length > 0 ? (
                            shuffleArray(futureFriends).slice(0, 2).map((futureFriend, index) => (
                                <div
                                    key={index}
                                    className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                        <img
                                            // SHOULD REFERENCE THE FIRST PICTURE OF FRIEND PROFILE
                                            src={futureFriend.pictures[0]}
                                            alt={"profile picture of " + futureFriend.name}
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                    <h3 className="text-dText font-semibold text-sm">
                                        <Link to={"/friends/" + futureFriend._id}>{futureFriend.name}</Link>
                                    </h3>
                                </div>
                            ))) : (
                                <p>Time to make some friends</p>
                            )}
                        </div>
                    </div>

                    <div className="border border-red-500 w-[500px]  mx-2 my-2 justify-self-center py-4">
                        <p className="text-secondary mx-8 text-lg font-bold ">
                            Friend List
                        </p>
                        <div className="items-center grid grid-cols-2 mx-auto mt-4">
                        {friends && friends.length > 0 ? (
                            shuffleArray(friends).slice(0,2).map((friend, index) => (
                                <div
                                    key={index}
                                    className="border border-red-500 w-[180px] h-[180px] mx-2 my-2 justify-self-center flex flex-col items-center">
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative">
                                        <img
                                            // SHOULD REFERENCE THE FIRST PICTURE OF FRIEND PROFILE
                                            src={friend.pictures[0]}
                                            alt={"profile picture of " + friend.name}
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                    <h3 className="text-dText font-semibold text-sm">
                                    <Link to={"/friends/" + friend._id}>{friend.name}</Link>
                                    </h3>
                                </div>
                            ))) : (
                                <p>Time to add some friends</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;