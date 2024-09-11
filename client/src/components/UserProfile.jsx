import React, { useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RxExit } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../assets/ProfilePhoto.png';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout, token } = useAuth();
  const [userName, setUserName] = useState(user?.username || '');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/login');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('https://ques-ai-3lhh.onrender.com/api/auth/username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Include the JWT token in the header
        },
        body: JSON.stringify({ username: userName })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User name saved as:", userName);
        setIsEditing(false);
        // Optionally update the user context or state here
      } else {
        console.error('Failed to update username');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleCancelClick = () => {
    setUserName(user.username); // Revert to the original username
    setIsEditing(false);
  };

  if (!user) {
    // Handle case where user data is not available yet
    return <div>Loading...</div>;
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
          <div className='flex flex-col'>
            <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
              User Name
            </label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSaveClick}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">{userName}</p>
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
                >
                  Edit
                </button>
              </div>
            )}
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
};

export default UserProfile;
