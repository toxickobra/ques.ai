import React, { useState } from 'react';
import { GoHome } from "react-icons/go";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { IoIosNotificationsOutline, IoMdAdd } from 'react-icons/io';
import { MdOutlineSettings } from "react-icons/md";
import { RiVipDiamondLine } from "react-icons/ri";
import { RxExit, RxPencil1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import QuesLogoPurple from '../assets/QuesLogoPurple.png';
import userphoto from '../assets/userphoto.png';
import AddYourPodcast from '../components/SidebarComponent/AddYourPodcast';
import CreateAndRepurpose from '../components/SidebarComponent/CreateAndRepurpose';
import PodcastWidget from '../components/SidebarComponent/PodcastWidget';
import SidebarOption from '../components/SidebarComponent/SidebarOption';
import Upgrade from '../components/SidebarComponent/Upgrade';
import UserProfile from '../components/UserProfile';
import '../index.css';

function ProjectDetails() {
  const [activeOption, setActiveOption] = useState('Add Your Podcast(s)');
  const [isUserProfile, setIsUserProfile] = useState(false);
  const navigate = useNavigate();
  const handleUserProfileView=()=>{
    setIsUserProfile(true)
    handleOptionClick('User Profile')
  }
  const handleLogout=()=>{
    navigate('/login');
  }
  const handleOptionClick = (option) => {
    if(option !== 'User Profile'){
      setIsUserProfile(false)
    }
    setActiveOption(option);
  };
  const handleHomePageClick=()=>{
    navigate('/createproject');
  }

  const renderActiveSection = () => {
    switch (activeOption) {
      case 'Add Your Podcast(s)':
        return <AddYourPodcast/>;
      case 'Create & Repurpose':
        return <CreateAndRepurpose />;
      case 'Podcast Widget':
        return <PodcastWidget />;
      case 'Upgrade':
        return <Upgrade />;
      case 'User Profile':
        return <UserProfile/>;
      default:
        return null;
    }
  };

  return (
    <div className='w-full h-full bg-zinc-100 flex'>
      <div className='sidebar h-[100vh] w-[20vw] bg-white shadow-lg flex flex-col justify-between'>
        <div className='flex flex-col gap-1'>
          <div 
            className='sidebarLogo my-20 ml-12 w-[200px] h-[60px] bg-contain bg-no-repeat bg-center mb-10'
            style={{ backgroundImage: `url(${QuesLogoPurple})` }}
          />
          <SidebarOption
            icon={<IoMdAdd size={20} />}
            optionName='Add Your Podcast(s)'
            isActive={activeOption === 'Add Your Podcast(s)'}
            onClick={() => handleOptionClick('Add Your Podcast(s)')}
          />
          <SidebarOption
            icon={<RxPencil1 size={20} />}
            optionName='Create & Repurpose'
            isActive={activeOption === 'Create & Repurpose'}
            onClick={() => handleOptionClick('Create & Repurpose')}
          />
          <SidebarOption
            icon={<HiOutlineSquare2Stack size={20} />}
            optionName='Podcast Widget'
            isActive={activeOption === 'Podcast Widget'}
            onClick={() => handleOptionClick('Podcast Widget')}
          />
          <SidebarOption
            icon={<RiVipDiamondLine size={20} />}
            optionName='Upgrade'
            isActive={activeOption === 'Upgrade'}
            onClick={() => handleOptionClick('Upgrade')}
          />
          <hr className='mx-10 my-4 border-gray-300' />
        </div>
        <div>
          <div className="help flex items-center px-10 py-5  border-gray-300">
            <MdOutlineSettings size={30} />
            <p className='text-[30px] ml-4'>Help</p>
          </div>
          <hr className='mx-10 my-4 border-gray-300' />
          <div className="user flex px-10 pb-10 pt-5 mt-4 items-center cursor-pointer"
            onClick={() => handleUserProfileView()}
          >
            <img src={userphoto} alt="User" className='w-16 h-16 rounded-md' />
            <div className='userinfosidebar flex flex-col ml-4'>
              <p className='font-semibold'>Username</p>
              <p>username@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className='content flex-1 p-8'>
        <div className='flex items-center gap-1 mt-16 justify-between'>
            <div className='flex'>
              <div className='flex items-center gap-1 '>
                  <GoHome size={26}/>
                  <p className='text-zinc-500 font-semibold text-[26px] cursor-pointer' 
                  onClick={handleHomePageClick}>Home Page</p>
                  <p className='text-zinc-500 font-semibold text-[26px]'>/</p>
                  <p className="projectName text-zinc-500 font-semibold text-[26px] ">Sample Project</p>
                  <p className='text-zinc-500 font-semibold text-[26px]'>/</p>
              </div>
              <p className='text-[#7e22ce] font-semibold text-[26px]'>{activeOption}</p>
            </div>
            {isUserProfile && (
              <div className='flex gap-2'>
                <button className='border p-2 rounded-full'><IoIosNotificationsOutline size={30} /></button>
                <button className='border p-2 rounded-full ' 
                  onClick={handleLogout}
                ><RxExit size={30} color='red'/></button>
              </div>
            )}
        </div>
        
        
          {renderActiveSection()}
        
      </div>
    </div>
  );
}

export default ProjectDetails;
