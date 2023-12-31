import { Link, useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";
import mapImg from "../assets/testImages/busch_stadium.jpg"
import axios from "axios"

const Friends = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState({});
    const [profile, setProfile] = useState({});
    const [friends, setFriends] = useState([]);
    const [friendsFetched, setFriendsFetched] = useState();
    const [blindDates, setBlindDates] = useState([]);
    const [blindDatesFetched, setBlindDatesFetched] = useState();
    const [isFriend, setIsFriend] = useState(false);
    const [isBlindDate, setIsBlindDate] = useState(false);

    
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

    function navToHome() {
        navigate("/dashboard");
    }

    function navToProfile() {
        navigate("/profile/userProfile");
    }

    // Get method to pull in the profile info of logged in user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/datingapp/userProfile", {
                withCredentials: true
            })
            .then(res => {
                setUserProfile(res.data)
                // console.log(res.data)
                // console.log(id);
                // console.log("userProfile.friend:", userProfile.friend)
                // Check if viewed profile ID is in the friend list of the logged-in user
                if (res.data.friend && res.data.friend.includes(id)) {
                    setIsFriend(true);
                } else {
                    setIsFriend(false);
                }
                if (res.data.blindDate && res.data.blindDate.includes(id)){
                    setIsBlindDate(true);
                }else{
                    setIsBlindDate(false);
                }
            })
            .catch(err => console.log(err))
        },[])
        
        // This useEffect updates the profile when the id prop changes
    useEffect(() => {
        axios.get(`http://localhost:8000/api/datingapp/profiles/${id}`, {
        withCredentials: true
        })
        .then(res => {
        // console.log(res.data);
        setProfile(res.data);
        setFriends([]);
        setFriendsFetched(false);
        setBlindDates([]);
        setBlindDatesFetched(false);
    })
    .catch(err => console.log(err));
}, [id]);

    //Get method to pull in the viewing profile information and assign variables
    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/datingapp/profiles/'+id, {
    //         withCredentials: true
    //     })
    //     .then(res => {
    //         console.log(res.data);
    //         setProfile(res.data);
    //         setFriends([]);
    //         setFriendsFetched(false);
    //         console.log(friendsFetched)
    //         setBlindDates([]);
    //         setBlindDatesFetched(false);
    //     })
    //     .catch(err => console.log(err))
    // },[])

// Function to fetch friend's profile by ID
    useEffect(() => {
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
            const friendListExcludingUserProfile = profile.friend.filter(friend => friend._id !== userProfile._id);
                console.log(friendListExcludingUserProfile);
                const shuffledFriends = friendListExcludingUserProfile.sort(() => Math.random() - 0.5);

                // Slice the first two friends from the shuffled array
                const selectedFriends = shuffledFriends.slice(0, 2);
        
                // Loop through each friend and fetch their profile
                selectedFriends.forEach((friendId) => {
                fetchFriendProfile(friendId);
                });
                setFriendsFetched(true);
            }
        }, [profile.friend]);   

    // Function to fetch blind date's profile by ID
    useEffect(() => { 
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
        // Check if there are friends for dates in the user profile
        console.log(userProfile.friend);
        console.log(blindDatesFetched)
        if (userProfile.friend && userProfile.friend.length > 0 && !blindDatesFetched) {
            const potentialBlindDateListExcludingFriendProfile = userProfile.friend.filter(friend => friend !== id);
            console.log(potentialBlindDateListExcludingFriendProfile)
            // Randomize the order of friends
            const shuffledBlindDates = potentialBlindDateListExcludingFriendProfile.sort(() => Math.random() - 0.5);
            
            // Slice the first two friends from the shuffled array
            const selectedBlindDates = shuffledBlindDates.slice(0, 2);
            console.log(selectedBlindDates);
            // Loop through each friend and fetch their profile
            selectedBlindDates.forEach((blindDateId) => {
                fetchBlindDateProfile(blindDateId);
            });
            setBlindDatesFetched(true);
            }
        }, [profile.friend]);
    
    const addFriend = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/datingapp/profiles/addFriend/${userProfile._id}/${id}`, {}, { withCredentials: true })
        .then (res => {
        console.log(res.data);
        setFriends((prevFriends) => [...prevFriends, res.data]);
        setIsFriend(true);
        })
        .catch((err) => {
        console.log(err);
        }, [profile.friend, friendsFetched])};

    const removeFriend = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/datingapp/profiles/removeFriend/${userProfile._id}/${id}`, {}, { withCredentials: true })
        .then (res => {
        console.log(res.data);
        setFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== id));
        setIsFriend(false);
        })
        .catch((err) => {
        console.log(err);
        }, [profile.friend, friendsFetched])};

    const addBlindDate = (e, blindDate) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/datingapp/profiles/addBlindDate/${blindDate._id}/${id}`, {}, { withCredentials: true })
        .then (res => {
        console.log(res.data); 
        setBlindDates([])
        setBlindDatesFetched(false);
        })
        .catch((err) => {
        console.log(err);
        }, [profile.blindDates, blindDatesFetched])};

    const removeBlindDate = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/datingapp/profiles/removeBlindDate/${userProfile._id}/${id}`, {}, { withCredentials: true })
        .then (res => {
        console.log(res.data);
        setBlindDates([]);
        setIsBlindDate(false);
        })
        .catch((err) => {
        console.log(err);
        }, [profile.blindDates, blindDatesFetched])};
            

    return (
        <div className=" px-8 pt-8 m-auto">
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
                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold" onClick={navToHome}>Home</span>
                    </div>
                    <div className="border border-r border-secondary h-4" />
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
            <div className="max-w-[1080px] m-auto">
                <div className="top-section">
                    <div className="top-top lg:grid lg:grid-cols-2 gap-8">
                    <div className="top-top-left gap-2 grid grid-cols-[2fr_1fr] md:max-w-[480px] mb-8">
                            {profile.pictures && profile.pictures.length>0 &&(
                            <div>
                                <img
                                    className="aspect-square object-cover rounded-l-2xl"
                                    // SHOULD REFERENCE THE FIRST PICTURE OF FRIEND PROFILE
                                    src={`http://localhost:8000/${profile.pictures[0]}`}
                                    alt={"profile picture of " + profile.name}
                                />
                            </div>
                            )}
                            <div className="grid">
                                <div className="overflow-hidden rounded-tr-2xl">
                                    {profile.pictures && profile.pictures?.[1] &&(
                                    <img
                                        className="aspect-square object-cover relative bottom-1"
                                    // SHOULD REFERENCE THE 2nd PICTURE OF FRIEND PROFILE
                                    src={`http://localhost:8000/${profile.pictures[1]}`}
                                    alt={"profile picture of " + profile.name}
                                    />
                                    )}
                                </div>
                                <div className="overflow-hidden rounded-br-2xl">
                                    {profile.pictures && profile.pictures?.[2] &&(
                                        <img
                                            className="aspect-square object-cover relative top-1"
                                        // SHOULD REFERENCE THE 3rd PICTURE OF FRIEND PROFILE
                                        src={`http://localhost:8000/${profile.pictures[2]}`}
                                            alt={"profile picture of " + profile.name}
                                        />
                                        )}
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

                            {isFriend?(
                                <div className="flex items-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50">
                                    <div className="cursor-pointer hover:scale-110 duration-200">
                                        <span className="text-dText font-bold" onClick={removeFriend}>
                                            Remove Friend
                                        </span>
                                    </div>
                                </div>
                            ):(
                                <div className="flex items-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50">
                                <div className="cursor-pointer hover:scale-110 duration-200">
                                    <span className="text-dText font-bold " onClick={addFriend}>
                                        Add Friend
                                    </span>
                                </div>
                            </div>
                            )}

                            {isBlindDate?(
                                <div className="flex items-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50">
                                    <div className="cursor-pointer hover:scale-110 duration-200">
                                        <span className="text-dText font-bold" onClick={removeBlindDate}>
                                            Remove Blind Date
                                        </span>
                                    </div>
                                </div>
                            ):(
                                <div>
                                </div>
                            )}

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
                            Recommend a Blind Date :
                        </h4>
                        {blindDates && blindDates.length > 0 ? (
                                blindDates.slice(0, 2).map((blindDate, index) => (
                                <div className="flex items-center gap-16" key={index}>

                                    {blindDate.pictures && blindDate.pictures.length>0 &&(
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative mb-4">
                                        <img
                                            className="object-cover rounded-xl w-full"
                                            // SHOULD REFERENCE THE FIRST PICTURE OF FRIEND PROFILE
                                            src={`http://localhost:8000/${blindDate.pictures[0]}`}
                                            alt={"profile picture of " + blindDate.name}
                                        />
                                    </div>
                                    )}
                                            <div className="flex items-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50">
                                            <div className="cursor-pointer hover:scale-110 duration-200">
                                                <span className="text-dText font-bold " onClick={(e) => addBlindDate(e, blindDate)}>
                                                    Add Blind Date
                                                </span>
                                            </div>
                                        </div>
                                        <Link className="text-dText font-semibold text-sm" to={"/friends/"+blindDate._id}>{blindDate.name}</Link>
                                </div>
                                ))) : (
                            <div className="flex items-center gap-16">
                                <div className="rounded-xl flex relative mb-4">
                                    <p className="text-dText font-semibold text-sm">You've already recommended all your friends!</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <hr className="mb-8" />
                    <div className="bottom-bottom mb-8">
                        <h4 className="font-semibold text-md text-slate-600 my-2">
                            My Friends :
                        </h4>
                        {friends && friends.length > 0 ? (
                                friends.slice(0, 2).map((friend, index) => (
                                <div className="flex items-center gap-16" key={index}>
                                    {friend.pictures && friend.pictures.length>0 &&(
                                    <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative mb-4">
                                        <img
                                            className="object-cover rounded-xl w-full"
                                            // SHOULD REFERENCE THE FIRST PICTURE OF FRIEND PROFILE
                                            src={`http://localhost:8000/${friend.pictures[0]}`}
                                            alt={"profile picture of " + friend.name}
                                        />
                                    </div>
                                    )}
                                    <Link className="text-dText font-semibold text-sm" to={"/friends/"+friend._id}>{friend.name}</Link>
                                </div>
                                ))) : (
                            <div className="flex items-center gap-16">
                                <div className="rounded-xl flex relative mb-4">
                                    <p className="text-dText font-semibold text-sm">Man I need some friends!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friends;
