import React from 'react';

const ProjectCard = ({ imageSrc, title, episodes, lastEdited, onClick }) => {

    const handleProjectOpening=()=>{
        onClick();
    }

  return (
    <div className="projectCard flex gap-4 border-2 border-zinc-400 rounded-xl cursor-pointer"
    onClick={handleProjectOpening}
    >
      <div className='flex gap-5 m-2 '>
        <img src={imageSrc} alt={`${title} thumbnail`} className='rounded-3xl h-[14vh] ' />
        <div className='projectInfo flex'>
          <div className='flex flex-col justify-between'>
            <div className='h-[100%] justify-center flex flex-col'>
              <p className='text-[30px] font-bold text-[#7e22ce]'>{title}</p>
              <div className='flex gap-1'>
                <p>{episodes}</p>
                <p>Episodes</p>
              </div>
            </div>
            <p>{lastEdited}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
