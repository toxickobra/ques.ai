import React from 'react';
import { useNavigate } from 'react-router-dom';
import Maskgroup from '../assets/Maskgroup.png';
import QuesLogo from '../assets/QuesLogo.png';
import logo from '../assets/logo.png';

function Login() {
  const navigate = useNavigate();

  const handleLoginNavigation = () => {
    navigate('/createproject');
  };

  return (
    <div className="flex">
      <div
        className="leftsideBanner bg-red h-[100vh] w-[70vw] bg-cover shadow p-20 bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom left, #c854ff, #3a0b63), url(${Maskgroup})`,
          backgroundBlendMode: 'overlay',
        }}
      >
        <div>
          <div
            className="headingLogo w-[270px] h-[58px]"
            style={{
              backgroundImage: `url(${QuesLogo})`,
            }}
          ></div>
          <div className="heroText">
            <p className="w-[30vw] text-white font-normal text-[8vh] mt-10">Your podcast</p>
            <p className="w-[30vw] text-white font-normal text-[8vh] -translate-y-[25%]">will no longer</p>
            <p className="text-white font-normal text-[8vh] -translate-y-[50%]">be just a hobby.</p>
            <p className="text-white text-[3vh] font-light -translate-y-[100%]">Supercharge Your Distribution</p>
            <p className="text-white text-[3vh] font-light -translate-y-[100%]">using our AI assistant!</p>
          </div>
        </div>
      </div>
      <div className="rightSideLogin flex flex-col w-[30vw]">
        <div className="flex justify-center items-center w-[100%] mt-20 flex-col">
          <div
            className="h-[100px] w-[100px] bg-cover bg-center"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <div className="flex justify-center flex-col items-center">
            <p className="text-[4vh] text-[#7E22CE]">Welcome to</p>
            <p className="text-[4vh] -translate-y-[40%] font-semibold text-[#7E22CE]">Ques.AI</p>
          </div>
        </div>
        <div className="inputSection p-20">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE]"
              placeholder="Email Address"
              style={{ fontWeight: 'semibold' }}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE]"
              placeholder="Password"
              style={{ fontWeight: 'semibold' }}
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-700 font-normal">
                Remember Me
              </label>
            </div>
            <div>
              <a href="#" className="text-indigo-500 text-sm">
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-[#7E22CE] text-[20px] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#64368f] transition-colors duration-300"
            onClick={handleLoginNavigation}
          >
            Login
          </button>
          <div className="flex gap-2 mt-5 justify-center">
            <p>Don't have an account?</p>
            <button className="text-blue-500 font-semibold">Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
