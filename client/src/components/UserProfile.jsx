import React, { useState } from 'react';
import ProfilePhoto from '../assets/ProfilePhoto.png';

function UserProfile() {
    const [userName, setuserName] = useState('alphauser');
    const handleUserNameChange=(text)=>{
        setuserName(text)
    }
  return (
    <div className='mr-20'>
       <div className="nav flex mt-10 items-center justify-between">
              <div className='flex items-center '>
                  <p className='text-[4vh] font-semibold '
                  >Account Settings</p>
              </div>
        </div>
        <div className="profile flex items-center gap-10 mt-16">
            <img src={ProfilePhoto} alt="" className='rounded-full h-[151px] w-[151px]'/>
            <div className=' flex w-[60%] gap-20'>
                <div >
                <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
                User Name
                </label>
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => handleUserNameChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                </div>
                <div>
                <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
                User Email
                </label>
                <input
                    type="text"
                    id="userEmail"
                    value="alphauser@gmail.com"
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                </div>
            </div>
        </div>
        <p  className='text-[4vh] font-semibold mt-20'>Subscriptions</p>
        <div className='w-[full] mt-20'>
            <div className='flex justify-between bg-red-400 px-20 py-3  bg-gradient-to-r from-white to-[#edd9ff] rounded-[13.42px] shadow border border-purple-700' >
                <p className='text-[4vh]'>Oops! You don't have any active plans. Upgrade now!</p>
                <button className='border px-10 bg-[#7e22ce] text-white font-semibold rounded-xl'>Upgrade</button>
            </div>
        </div>
    </div>
  )
}

export default UserProfile
