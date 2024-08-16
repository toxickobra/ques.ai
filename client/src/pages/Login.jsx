import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Maskgroup from '../assets/Maskgroup.png';
import QuesLogo from '../assets/QuesLogo.png';
import logo from '../assets/logo.png';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = response.data;
      login(token);
      navigate('/createproject');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleLoginNavigation = (e) => {
    e.preventDefault();
    handleLogin();
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
            style={{ backgroundImage: `url(${QuesLogo})` }}
          ></div>
          <div className="heroText">
            <p className="w-[30vw] text-white font-normal text-[8vh] mt-10">Your podcast</p>
            <p className="w-[30vw] text-white font-normal text-[8vh] -translate-y-[25%]">will no longer</p>
            <p className="text-white font-normal text-[8vh] -translate-y-[50%]">be just a hobby.</p>
          </div>
        </div>
      </div>
      <div className="rightsideBanner bg-white w-[30vw] h-[100vh] px-5 py-10 flex flex-col items-center">
        <div className="logo text-[#7E22CE] text-[5vh] font-bold mb-5">
          <img src={logo} alt="" className='h-[10vh]' />
        </div>
        <p className="text-[#7E22CE] text-[4vh] font-bold">Sign in</p>
        <p className="text-[#7E22CE] text-[2vh] font-semibold">Start creating with us!</p>
        <div className="loginForm flex flex-col mt-10 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-[#7E22CE] p-2 rounded-lg mb-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-[#7E22CE] p-2 rounded-lg mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-[#7E22CE] text-white p-2 rounded-lg"
            onClick={handleLoginNavigation}
          >
            Sign in
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
