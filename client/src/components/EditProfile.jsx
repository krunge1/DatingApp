import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";
import Interest from "./Interest";
import UploadPicture from "./UploadPictures"

const EditProfile = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [gender, setGender] = useState("");
    const [sexualOrientation, setSexualOrientation] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [pictures, setPictures] = useState([]);
    const [interests, setInterests] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    const [errors, setErrors] = useState({});

    const handleInterestChange = (selectedInterests) => {
        setSelectedInterests(selectedInterests);
        };

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

    const deleteProfile = (profileId) => {
        axios.delete('http://localhost:8000/api/datingapp/profiles/delete/'+profileId, {
            withCredentials: true
        })            
        .then(res => {
            console.log(res)
            navigate("/profile")
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/datingapp/profiles/'+id, {
            withCredentials: true
        })
        .then(res => {
            setName(res.data.name)
            setAboutMe(res.data.aboutMe)
            setGender(res.data.gender)
            setSexualOrientation(res.data.sexualOrientation)
            setAddress(res.data.address)
            setCity(res.data.city)
            setState(res.data.state)
            setZipCode(res.data.zipCode)
            setPictures(res.data.pictures)
            // setInterests(res.data.interest)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/datingapp/profiles/update/'+id, {
            name,
            aboutMe,
            gender,
            sexualOrientation,
            address,
            city,
            state,
            zipCode,
            pictures,
            interests
        },
        {withCredentials: true})
        .then(res => {
            console.log(res.data)
            navigate("/profile/userProfile")
            })
        .catch(err => console.log(err));
        setName("");
        setAboutMe("");
        setGender("");
        setSexualOrientation("");
        setAddress("");
        setCity("");
        setState("");
        setZipCode("");
        setPictures([]);
        setInterests([]);
    }

    const handleName = (e) => {
        setName(e.target.value);
        if(e.target.value === ""){
            setErrors("Name must be 3 characters or longer")
        }else if(e.target.value.length < 3){
            setErrors("Name must be 3 characters or longer")
        }else{
            setErrors("");
        }
    }

    const handleAboutMe = (e) => {
        setAboutMe(e.target.value);
        if(e.target.value === ""){
            setErrors("About me must be 5 characters or longer");
        }else if(e.target.value.length < 5){
            setErrors("About me must be 5 characters or longer")
        }else{
            setErrors("");
        }
    }

    function genderSelected(e) {
        setGender(e.target.value);
    }

    function sexualOrientationSelected(e) {
        setSexualOrientation(e.target.value);
    }

    function handleAddress(e) {
        setAddress(e.target.value);
    }

    function handleCity(e) {
        setCity(e.target.value);
    }

    function handleState(e) {
        setState(e.target.value);
    }

    function handleZipCode(e) {
        setZipCode(e.target.value);
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
            <form className=" justify-self-center w-[90%] m-auto " onSubmit={handleSubmit}>
                {/* Gray background Will be removed */}
                <div className="justify-self-center m-auto flex items-center gap-2 my-2 max-w-[920px]">
                        <label
                            className="text-dText/50 font-semibold text-md"
                            htmlFor="email">
                            Profile&nbsp;Name
                        </label>
                        <input
                            className="text-dText"
                            type="text"
                            name="name"
                            onChange={handleName}
                            value={name}
                        />
                </div>

                <div className=" h-[200px] justify-self-center m-auto flex items-center gap-4 my-2 max-w-[920px]">
                    <label
                        className="text-dText/50 font-semibold text-md"
                        htmlFor="email">
                        About&nbsp;Me
                    </label>
                    <textarea
                        className="text-dText"
                        onChange = {handleAboutMe} 
                        name="aboutMe" 
                        value={aboutMe}
                        cols="30" 
                        rows="5"></textarea>
                </div>
                <div className="justify-around m-auto flex items-center gap-4 my-2  max-w-[780px]">
                    <h3
                        className="text-dText/50 font-semibold text-md mr-4"
                        htmlFor="email">
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
                        <input className="text-dText"
                            onChange = {handleAddress} 
                            type="text" 
                            name="address"
                            value={address} 
                        />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 w-full py-2">
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                City
                            </label>
                            <input className="text-dText" 
                                onChange={handleCity}
                                type="text" 
                                name="city"
                                value={city} 
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                State
                            </label>
                            <input
                                onChange={handleState}
                                className="text-dText"
                                type="text"
                                name="state"
                                value = {state}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-dText/50 font-semibold text-sm">
                                Zip&nbsp;Code
                            </label>
                            <input
                                onChange={handleZipCode}
                                className="text-dText"
                                type="text"
                                name="zipCode"
                                value={zipCode}
                            />
                        </div>
                    </div>
                </div>
                <div className="max-w-[920px] flex flex-col m-auto">
                    <UploadPicture
                        pictures={pictures}
                        onChange={setPictures}/>
                </div>
                <div className="  justify-around m-auto items-center gap-4 my-2 max-w-[780px]">
                    <h3 className="text-dText/50 font-semibold text-md mr-4 mt-4 mb-2">
                        Interests
                    </h3>
                    <Interest selected={interests} onChange={setInterests} />
                </div>
                <div className="flex justify-end mt-4">
                    <div className="flex justify-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50 max-w-[1200px]">
                        <div className="cursor-pointer hover:scale-110 duration-200 ">
                            <input className="text-dText font-bold" type="submit" value="Update Profile"/>
                        </div>
                    </div>
                </div>
            </form>
            <div className="flex justify-end mt-4 mx-[5%]">
                <div className="flex justify-center gap-4 border px-4 py-2 rounded-2xl bg-red-700 max-w-[1200px]">
                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-slate-200 font-bold">
                            <button className="bg-red-700" onClick={(e) => {deleteProfile(id)}}>
                                Delete Account
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
