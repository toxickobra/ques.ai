import React from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RxExit } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../assets/ProfilePhoto.png';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as necessary

function UserProfile() {
    const { logout, user } = useAuth(); // Use the logout function and user data from context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/login');
    };

    const handleUserNameChange = (newUserName) => {
        // Implement the function to handle user name change
        // For example, you could send a request to the backend to update the user name
        console.log("User name changed to:", newUserName);
    };

    if (!user) {
        // Handle case where user data is not available yet
        return <div>Loading user data...</div>;
    }

    return (
        <div className='mr-20'>
            <div className='flex gap-2 absolute top-[10vh] right-[10vh]'>
                <button className='border p-2 rounded-full'>
                    <IoIosNotificationsOutline size={30} />
                </button>
                <button className='border p-2 rounded-full'>
                    <RxExit size={30} color='red' onClick={handleLogout} />
                </button>
            </div>
            <div className="nav flex mt-10 items-center justify-between">
                <div className='flex items-center'>
                    <p className='text-[3vh] font-semibold'>Account Settings</p>
                </div>
            </div>
            <div className="profile flex items-center gap-10 mt-16">
                <img src={ProfilePhoto} alt="Profile" className='rounded-full h-[151px] w-[151px]' />
                <div className='flex w-[60%] gap-20'>
                    <div>
                        <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            value={user.username}
                            onChange={(e) => handleUserNameChange(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="userEmail" className="block text-gray-700 font-semibold mb-2">
                            User Email
                        </label>
                        <input
                            type="text"
                            id="userEmail"
                            value={user.email}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
            <p className='text-[3vh] font-semibold mt-20'>Subscriptions</p>
            <div className='w-full mt-20'>
                <div className='flex justify-between bg-red-400 px-20 py-3 bg-gradient-to-r from-white to-[#edd9ff] rounded-[13.42px] shadow border border-purple-700'>
                    <p className='text-[3vh]'>Oops! You don't have any active plans. Upgrade now!</p>
                    <button className='border px-10 bg-[#7e22ce] text-white font-semibold rounded-xl'>Upgrade</button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
