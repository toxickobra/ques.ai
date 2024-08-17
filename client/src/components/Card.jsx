import React from 'react';

function Card({ title, description, logoSrc, onClick }) {
  return (
    <div className='card bg-white flex gap-3 p-10 justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer'
      onClick={onClick}
    >
      <div className="cardInfo w-[15vw]">
        <p className='text-[30px] font-medium text-black'>{title}</p>
        <p className='text-[20px] text-black'>{description}</p>
      </div>
      <div className="cardLogo">
        <img src={logoSrc} alt="Card Logo" />
      </div>
    </div>
  );
}

export default Card;
