import IconChatHeart from "../assets/icons/HeartIcon";
import testImg from "../assets/testImages/titann.jpg";

const Profile = (props) => {
    const {logout} = props
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
                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold ">Home</span>
                    </div>
                    <div className="border border-r border-secondary h-4" />

                    <div className="cursor-pointer hover:scale-110 duration-200">
                        <span className="text-dText font-bold" onClick={logout}>Logout</span>
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
                                        <h2 className="text-dText">Name</h2>
                                    </div>
                                </div>
                            </div>
                            <h4 className="font-semibold text-md text-slate-600 my-2">
                                About Me :
                            </h4>
                            <p className="text-sm leading-7 text-slate-500">
                                Morbi varius nisl nec pretium iaculis. In hac
                                habitasse platea dictumst. Vivamus lobortis dui
                                et ullamcorper aliquam. Sed porttitor convallis
                                ante in rhoncus. Vestibulum dapibus vel lacus eu
                                varius. Morbi et lobortis lorem. Suspendisse
                                porta mattis rutrum. Praesent tincidunt et nulla
                                sit amet fringilla. Fusce at maximus nisi, vitae
                                semper eros. Phasellus sit amet ultrices purus.
                                Sed sit amet purus aliquet, bibendum elit eget,
                                vulputate sapien. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div className="top-bottom lg:grid lg:grid-cols-2 gap-8">
                        <div className="top-bottom-left mb-8">
                            <h4 className="font-semibold text-md text-slate-600 my-2">
                                Where I'm At :
                            </h4>
                            <div className="bg-gray-200 w-full h-[300px]"></div>
                        </div>
                        <div className="top-bottom-right mb-8">
                            <h4 className="font-semibold text-md text-slate-600 my-2">
                                Interest :
                            </h4>
                            <p className="text-sm leading-7 text-slate-500">
                                Morbi varius nisl nec pretium iaculis. In hac
                                habitasse platea dictumst. Vivamus lobortis dui
                                et ullamcorper aliquam. Sed porttitor convallis
                                ante in rhoncus. Vestibulum dapibus vel lacus eu
                                varius. Morbi et lobortis lorem. Suspendisse
                                porta mattis rutrum. Praesent tincidunt et nulla
                                sit amet fringilla. Fusce at maximus nisi, vitae
                                semper eros. Phasellus sit amet ultrices purus.
                                Sed sit amet purus aliquet, bibendum elit eget,
                                vulputate sapien. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                            </p>
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
                            <div className="flex items-center gap-16">
                                <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative mb-4">
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
                            <div className="flex items-center gap-16">
                                <div className="bg-gray-200 w-[180px] h-[150px] rounded-xl flex relative mb-4">
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

                    <div className="flex justify-end mt-4">
                        <div className="flex justify-center gap-4 border px-4 py-2 rounded-2xl bg-primary/50 max-w-[1200px]">
                            <div className="cursor-pointer hover:scale-110 duration-200 ">
                                <span className="text-dText font-bold">
                                    Edit Profile
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
