import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  const [projects, setProjects] = useState([]);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setIsProject(projects.length > 0);
  }, [projects]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://ques-ai-3lhh.onrender.com/api/projects', {
        headers: {
          'x-auth-token': token,
        },
      });

      const sortedProjects = response.data.sort((a, b) => 
        new Date(b.lastEditedTime) - new Date(a.lastEditedTime)
      );

      setProjects(sortedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error.response?.data || error.message);
    }
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (newProject) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    setIsProject(true);
    closeModal();
  };

  const handleProjectClick = (projectId, projectName) => {
    navigate(`/addyourproject/${projectId}`, { state: { projectName } });
  };

  return (
    <div className='h-[100vh] w-full'>
      <div className='header w-full pt-10 px-28 flex justify-between items-center'>
        <div className="logo">
          <img src={QuesLogoPurple} alt='ques.ai logo' className='w-[22vh]' />
        </div>
        <div className="navIcon flex gap-3">
          <div className="setting"><MdOutlineSettings size={40} /></div>
          <div className="bell"><FaRegBell size={40} /></div>
        </div>
      </div>
      {!isProject ? (
        <div className="createContainer w-full flex justify-center items-center pt-20 pb-20 px-28 flex-col">
          <p className="heading text-[5vh] font-semibold text-[#7E22CE] text-center">Create a New Project</p>
          <img src={CreateProjectImg} alt="" className='mt-5' />
          <p className='text-zinc-500 font-semibold mt-10 text-[2vh] w-[60vw] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, necessitatibus commodi. Aliquid, quod! Illo repellat doloremque adipisci tempora dolorum hic reprehenderit, excepturi nostrum, voluptates eum, cupiditate magni nihil beatae aperiam?.</p>
          <button
            className='flex items-center justify-center bg-black py-3 px-4 gap-4 rounded-lg mt-5'
            onClick={openModal}>
            <div className='rounded-lg bg-white'>
              <IoMdAdd size={35} color='black' />
            </div>
            <p className='text-white text-[2vh]'>Create New Project</p>
          </button>
        </div>
      ) : (
        <div>
          <div className='flex justify-between items-center pt-20 px-28'>
            <p className='text-[4vh] text-[#7e22ce] font-bold'>Projects</p>
            <button
              className='flex items-center justify-center bg-black py-3 px-4 gap-4 rounded-lg mt-5'
              onClick={openModal}>
              <div className='rounded-lg bg-white'>
                <IoMdAdd size={35} color='black' />
              </div>
              <p className='text-white text-[2vh]'>Create New Project</p>
            </button>
          </div>
          <div className='projectCards pt-14 pl-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 pr-28'>
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                imageSrc={sampleProjectImg}
                title={project.name}
                episodes={project?.objectCount || 0}  // Pass objectCount as episodes
                lastEdited={new Date(project.lastEditedTime).toLocaleDateString()}
                onClick={() => handleProjectClick(project._id, project.name)}
              />
            ))}
          </div>
        </div>
      )}
      {isModalOpen && (
        <CreateProjectPopup
          closeModal={closeModal}
          onProjectCreated={handleCreateProject}
        />
      )}
    </div>
  );
}

export default CreateProject;
