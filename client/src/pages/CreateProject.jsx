// src/pages/CreateProject.js
import axios from 'axios';
import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CreateProjectImg from '../assets/CreateProjectImg.png';
import QuesLogoPurple from '../assets/QuesLogoPurple.png';
import sampleProjectImg from '../assets/sampleProjectImg.png';
import CreateProjectPopup from '../components/CreateProjectPopup';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../contexts/AuthContext';

function CreateProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const { isAuthenticated, token } = useAuth(); // Now token is available
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null; // Prevent rendering if not authenticated
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (projectName) => {
    console.log(token)  
    try {
      await axios.post(
        'http://localhost:5000/api/projects/create',
        { name: projectName },
        {
          headers: {
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZjRmMWZlMDNjOWE1NmYzNmYxZTdkIn0sImlhdCI6MTcyMzgxMzY2MywiZXhwIjoxNzIzODE3MjYzfQ.jlkrhGuEEfj75r_9gXVsuRw_R_WYsE7-YlLk_bf2cYE' // Use the correct header key
          }
        }
      );
      
      setIsProject(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating project:', error.response?.data || error.message);
      // Handle error appropriately
    }
  };

  const handleProjectClick = () => {
    navigate('/addyourproject');
  };

  return (
    <div className='h-[100vh] w-full'>
      <div className='header w-full pt-20 px-28 flex justify-between items-center'>
        <div className="logo">
          <img src={QuesLogoPurple} alt='ques.ai logo' className='w-[268px]' />
        </div>
        <div className="navIcon flex gap-3">
          <div className="setting"><MdOutlineSettings size={50} /></div>
          <div className="bell"><FaRegBell size={50} /></div>
        </div>
      </div>
      {!isProject ? (
        <div className="createContainer w-full flex justify-center items-center pt-20 px-28 flex-col">
          <p className="heading text-[6vh] font-bold text-[#7E22CE]">Create a New Project</p>
          <img src={CreateProjectImg} alt="" className='mt-5' />
          <p className='text-zinc-500 font-semibold mt-10 text-[2vh]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <button
            className='flex items-center justify-center bg-black py-3 px-4 gap-4 rounded-lg mt-5'
            onClick={openModal}>
            <div className='rounded-lg bg-white'>
              <IoMdAdd size={35} color='black' />
            </div>
            <p className='text-white text-[3vh]'>Create New Project</p>
          </button>
        </div>
      ) : (
        <div>
          <div className='flex justify-between items-center pt-20 px-28'>
            <p className='text-[5vh] text-[#7e22ce] font-bold'>Projects</p>
            <button
              className='flex items-center justify-center bg-black py-3 px-4 gap-4 rounded-lg mt-5'
              onClick={openModal}>
              <div className='rounded-lg bg-white'>
                <IoMdAdd size={35} color='black' />
              </div>
              <p className='text-white text-[3vh]'>Create New Project</p>
            </button>
          </div>
          <div className='projectCards pt-20 pl-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 pr-28'>
            <ProjectCard
              imageSrc={sampleProjectImg}
              title="Sample Project"
              episodes={4}
              lastEdited="Last edited a week ago"
              onClick={handleProjectClick}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <CreateProjectPopup
          closeModal={closeModal}
          createProject={handleCreateProject}
        />
      )}
    </div>
  );
}

export default CreateProject;
