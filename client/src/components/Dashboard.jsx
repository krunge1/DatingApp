import React from "react";
import IconChatHeart from "../assets/icons/HeartIcon";

const Dashboard = () => {
    return (
        <div className="w-full h-screen">
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
                        <span className="text-dText font-bold ">Proflie</span>
                    </div>
                    <div className="border border-r border-secondary h-4" />
                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold">Login</span>
                    </div>
                </div>
            </div>
            <div className="items-center grid lg:grid-cols-2 mx-auto">
                <div className="border border-red-500 w-[500px] h-[500px] mx-2 my-2 justify-self-center"></div>
                <div className="border border-red-500 w-[500px] h-[500px] mx-2 my-2 justify-self-center"></div>
                <div className="border border-red-500 w-[500px] h-[500px] mx-2 my-2 justify-self-center"></div>
                <div className="border border-red-500 w-[500px] h-[500px] mx-2 my-2 justify-self-center"></div>
            </div>
        </div>
    );
};

export default Dashboard;
