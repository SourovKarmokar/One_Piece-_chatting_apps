import React, { useState } from 'react';
import { FaPencilAlt, FaInfoCircle, FaCamera, FaQuestionCircle, FaKey, FaTrashAlt } from 'react-icons/fa';
import profile from "../../assets/profile.png"
import { useSelector } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const Settings = () => {
    const auth = getAuth();
    console.log(auth);

    const data = useSelector(state => state.userLogInfo.value.user)
    console.log(data);

    const [showName, setShowName] = useState(false)
    const [newName, setNewName] = useState(data.displayName || "")
    const handleSubmit = () => {
        if (auth.currentUser) {
            updateProfile(auth.currentUser, {
                displayName: newName
                
            }).then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
        }

    }
    return (
        <div className="flex justify-between items-start gap-8 p-4 bg-gray-100 min-h-screen w-full ">

            {/* Profile Settings Panel */}
            <div className='w-[50%] h-[750px] bg-white rounded-[20px] shadow-lg p-6 flex flex-col'>


                {/* Profile Info Section */}
                <h2 className="top-[195px]  w-[393px] h-[31px] inline-block
                font-poppins font-semibold text-[20px] leading-normal tracking-[0px] opacity-100">Profile Settings</h2>
                <div className='flex space-x-4 mb-6 pb-4 border-b border-gray-200 mt-[50px] '>
                    <img src={profile} alt="Profile" className="w-16 h-16 rounded-full"
                    />
                    <div>
                        <h3 className='font-poppins font-medium text-[25px]  leading-auto text-center flex items-center justify-center  text-primary rounded-none'>{data.displayName}</h3>
                        <p className="w-[204px] h-[30px] font-poppins font-normal text-[15px] 
                        leading-normal tracking-[0px] text-black opacity-100">Stay home stay safe</p>
                    </div>
                    <div >

                    </div>
                </div>

                {/* Profile Actions */}
                <div className="flex flex-col ml-[50px] gap-y-[50px]">

                    <div onClick={(e) => setShowName(!showName)} className='flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer'>
                        <FaPencilAlt />
                        <span>Edit Profile Name.</span>
                    </div>

                    {
                        showName &&
                        <div className="p-2 flex items-center gap-3">
                            <input
                                onChange={(e) => setNewName(e.target.value)}
                                value={newName}
                                type="text"
                                placeholder="Edit Name"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[30%]"
                            />
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Submit
                            </button>
                        </div>

                    }

                    <div className='flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer'>
                        <FaInfoCircle />
                        <span>Edit Profile Status Info.</span>
                    </div>
                    <div className='flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer'>
                        <FaCamera />
                        <span>Edit Profile Photo.</span>
                    </div>
                    <div className='flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer mt-auto pt-4 border-t border-gray-200'>
                        <FaQuestionCircle />
                        <span>Help.</span>
                    </div>
                </div>

                <p className='mt-auto text-sm text-center text-gray-400'>Chat App</p>
            </div>

            {/* Account Settings Panel */}
            <div className='w-[50%] bg-white rounded-[20px] shadow-lg p-6 flex flex-col'>
                <h2 className='text-xl font-bold mb-6'>Account Settings</h2>

                <div className='flex flex-col space-y-4'>
                    <div className='flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer'>
                        <FaKey />
                        <span>Change Password</span>
                    </div>
                    <div className='flex items-center space-x-3 text-gray-700 hover:text-red-600 cursor-pointer'>
                        <FaTrashAlt />
                        <span>Delete Account.</span>
                    </div>
                </div>

                <p className='mt-auto text-sm text-center text-gray-400'>Chat App</p>
            </div>
        </div>
    );
};

export default Settings;