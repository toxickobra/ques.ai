import React, { useState } from 'react';
import { GoHome } from "react-icons/go";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineSettings } from "react-icons/md";
import { RiVipDiamondLine } from "react-icons/ri";
import { RxPencil1 } from "react-icons/rx";
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import QuesLogoPurple from '../assets/QuesLogoPurple.png';
import userphoto from '../assets/userphoto.png';
import AddYourPodcast from '../components/SidebarComponent/AddYourPodcast';
import CreateAndRepurpose from '../components/SidebarComponent/CreateAndRepurpose';
import PodcastWidget from '../components/SidebarComponent/PodcastWidget';
import SidebarOption from '../components/SidebarComponent/SidebarOption';
import Upgrade from '../components/SidebarComponent/Upgrade';
import UserProfile from '../components/UserProfile';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';

function ProjectDetails() {
  const { projectId } = useParams();
  const location = useLocation();
  const projectName = location.state?.projectName || 'Sample Project';

  const { user } = useAuth(); // Access user details from AuthContext

  const [activeOption, setActiveOption] = useState('Add Your Podcast(s)');

  const navigate = useNavigate();

  // If no projectId is present, redirect to a different page or show an error
  if (!projectId) {
    return <Navigate to="/addyourproject" />;
  }

  const handleUserProfileView = () => {
    handleOptionClick('User Profile');
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleHomePageClick = () => {
    navigate('/addyourproject');
  };

  const renderActiveSection = () => {
    switch (activeOption) {
      case 'Add Your Podcast(s)':
        return <AddYourPodcast />;
      case 'Create & Repurpose':
        return <CreateAndRepurpose />;
      case 'Podcast Widget':
        return <PodcastWidget />;
      case 'Upgrade':
        return <Upgrade />;
      case 'User Profile':
        return <UserProfile />;
      default:
        return null;
    }
  };

  if (!user) {
    // Handle case where user data is not available yet
    return <div>Loading user data...</div>;
  }

  return (
    <div className="w-full h-full bg-zinc-100 flex">
      <div className="sidebar h-[100vh] w-[20vw] bg-white shadow-lg flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div
            onClick={handleHomePageClick}
            
            className="sidebarLogo my-14 cursor-pointer ml-12 w-[160px] h-[60px] bg-contain bg-no-repeat bg-center mb-4"
            style={{ backgroundImage: `url(${QuesLogoPurple})` }}
          />
          <SidebarOption
            icon={<IoMdAdd size={20} />}
            optionName="Add Your Podcast(s)"
            isActive={activeOption === "Add Your Podcast(s)"}
            onClick={() => handleOptionClick("Add Your Podcast(s)")}
          />
          <SidebarOption
            icon={<RxPencil1 size={20} />}
            optionName="Create & Repurpose"
            isActive={activeOption === "Create & Repurpose"}
            onClick={() => handleOptionClick("Create & Repurpose")}
          />
          <SidebarOption
            icon={<HiOutlineSquare2Stack size={20} />}
            optionName="Podcast Widget"
            isActive={activeOption === "Podcast Widget"}
            onClick={() => handleOptionClick("Podcast Widget")}
          />
          <SidebarOption
            icon={<RiVipDiamondLine size={20} />}
            optionName="Upgrade"
            isActive={activeOption === "Upgrade"}
            onClick={() => handleOptionClick("Upgrade")}
          />
          <hr className="mx-10 my-4 border-gray-300" />
        </div>
        <div>
          <div className="help flex items-center px-10 py-5 border-gray-300">
            <MdOutlineSettings size={24} />
            <p className="text-[24px] ml-2">Help</p>
          </div>
          <hr className="mx-10 my-4 border-gray-300" />
          <div
            className="user flex px-10 pb-10 pt-5 mt-4 items-center cursor-pointer"
            onClick={() => handleUserProfileView()}
          >
            <img src={userphoto} alt="User" className="w-16 h-16 rounded-md" />
            <div className="userinfosidebar flex flex-col ml-4">
              <p className="font-semibold flex flex-wrap">{user.username}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content flex-1 p-8">
        <div className="flex items-center gap-1 mt-8 justify-between">
          <div className="flex">
            <div className="flex items-center gap-1">
              <GoHome size={26} />
              <p
                className="text-zinc-500 font-semibold text-[24px] cursor-pointer"
                onClick={handleHomePageClick}
              >
                Home Page
              </p>
              <p className="text-zinc-500 font-semibold text-[24px]">/</p>
              <p className="projectName text-zinc-500 font-semibold text-[24px]  cursor-pointer" onClick={handleHomePageClick}>
                {projectName}
              </p>
              <p className="text-zinc-500 font-semibold text-[24px]">/</p>
            </div>
            <p className="text-[#7e22ce] font-semibold text-[24px]">
              {activeOption}
            </p>
          </div>
        </div>
        {renderActiveSection()}
      </div>
    </div>
  );
}

export default ProjectDetails;
