import React, {useEffect, useState} from 'react'
import axios from "axios";
import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";
import mapImg from "../assets/testImages/busch_stadium.jpg"
import { useNavigate, Link } from "react-router-dom";

const Profile = (props) => {
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

    const [profile, setProfile] = useState({});
    const [friends, setFriends] = useState([]);
    const [friendsFetched, setFriendsFetched] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/datingapp/userProfile", {
            withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            setProfile(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
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

    const removeBlindDate = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/datingapp/profiles/removeBlindDate/${userProfile._id}/${id}`, {}, { withCredentials: true })
        .then (res => {
        console.log(res.data);
        setFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== id));
        setIsFriend(false);
        })
        .catch((err) => {
        console.log(err);
        }, [profile.friend, friendsFetched])};

    

    function navToHome() {
        navigate("/dashboard");
    }


    return (
        <div className=" px-8 pt-8 m-auto mb-8">
            <div className="flex items-center justify-between pb-8">
                <div className="">
                    <div className="flex justify-center gap-1">
                        <h1 className="">Blind Date</h1>
                        <span>
                            <IconChatHeart className="text-3xl text-dText hover:scale-150 duration-200" />
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50">
                    <div
                        onClick={navToHome}
                        className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold ">Home</span>
                    </div>
                    <div className="border border-r border-secondary h-4" />

                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold" onClick={logout}>
                            Logout
                        </span>
                    </div>
                </div>
            </div>
            <div className="max-w-[1080px] m-auto">
                <div className="top-section">
                    <div className="top-top lg:grid lg:grid-cols-2 gap-8">
                        <div className="top-top-left gap-2 grid grid-cols-[2fr_1fr] md:max-w-[480px] mb-8">
                            <div>
                                <img
                                    className="aspect-square object-cover rounded-l-2xl"
                                    src={testImg}
                                />
                            </div>
                            <div className="grid">
                                <div className="overflow-hidden rounded-tr-2xl">
                                    <img
                                        className="aspect-square object-cover relative bottom-1"
                                        src={testImg}
                                    />
                                </div>
                                <div className="overflow-hidden rounded-br-2xl">
                                    <img
                                        className="aspect-square object-cover relative top-1"
                                        src={testImg}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="top-top-right max-w-500 flex flex-col mb-8">
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <div className="flex justify-center gap-1">
                                        <h2 className="text-dText">{profile.name}</h2>
                                        
                                    </div>
                                </div>
                            </div>
                            <h4 className="font-semibold text-md text-slate-600 my-2">
                                About Me :
                            </h4>
                            <p className="text-sm leading-7 text-slate-500">
                                {profile.aboutMe}
                            </p>
                        </div>
                    </div>
                    <div className="top-bottom lg:grid lg:grid-cols-2 gap-8">
                        <div className="top-bottom-left mb-8">
                            <h4 className="font-semibold text-md text-slate-600 my-2">
                                Where I'm At :
                            </h4>
                            <div className="bg-gray-200 w-full h-[300px]">
                            <img
                                        src={mapImg}
                                        alt=""
                                        className="object-cover rounded-xl w-full"
                                    />
                            </div>
                        </div>
                        <div className="top-bottom-right mb-8">
                            <h4 className="font-semibold text-md text-slate-600 my-2">
                                Interest :
                            </h4>
                            {profile.interests ? (
                                <ul className="list-disc pl-6">
                                {profile.interests.map((interest, index) => (
                                    <li className="text-sm leading-7 text-slate-500" key={index}>
                                    {interest}
                                    </li>
                                ))}
                                </ul>
                                ) : (
                                <p>No interests available.</p>
                                )}
                        </div>
                    </div>
                </div>
                <hr className="mb-8" />
                <div className="bottom-section">
                    <div className="bottom-top mb-8">
                        <h4 className="font-semibold text-md text-slate-600 my-2">
                            My Friends :
                        </h4>
                        <div className="md:grid md:grid-cols-2 gap-8">
                        {friends && friends.length > 0 ? (
                                friends.map((friend, index) => (
                                <div className="flex items-center gap-16" key={index}>
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative mb-4">
                                        <img
                                            src={testImg}
                                            alt=""
                                            className="object-cover rounded-xl w-full"
                                        />
                                    </div>
                                        <Link className="text-dText font-semibold text-sm" to={"/friends/"+friend._id}>{friend.name}</Link>
                                </div>
                                ))) : (
                            <div className="flex items-center gap-16">
                                <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative mb-4">
                                    <img
                                        src={testImg}
                                        alt=""
                                        className="object-cover rounded-xl w-full"
                                    />
                                </div>
                            </div>
                        )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <div className="flex justify-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50 max-w-[1200px]">
                            <div className="cursor-pointer hover:scale-110 duration-200 ">
                                <span className="text-dText font-bold">
                                <Link className="text-dText font-semibold text-sm" to={"/profile/"+profile._id+"/edit"}>Edit Profile</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
