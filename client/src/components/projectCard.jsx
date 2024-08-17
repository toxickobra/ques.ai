import React from 'react';

const ProjectCard = ({ imageSrc, title, episodes, lastEdited, onClick }) => {
  const handleProjectOpening = () => {
    onClick();
  };

  return (
    <div
      className="projectCard flex gap-4 border-2 border-zinc-400 rounded-xl cursor-pointer"
      onClick={handleProjectOpening}
    >
      <div className="flex gap-5 m-2">
        <img src={imageSrc} alt={`${title} thumbnail`} className="rounded-3xl h-[10vh]" />
        <div className="projectInfo flex flex-col justify-between max-w-[250px]">
          <div className="flex flex-col justify-center h-[100%]">
            <p
              className="text-[2vh] font-bold text-[#7e22ce] truncate w-[100%] "
              style={{ whiteSpace: 'wrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {title}
            </p>
            <div className="flex gap-1">
              <p>{episodes}</p>
              <p>Episodes</p>
            </div>
          </div>
          <p>{lastEdited}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
