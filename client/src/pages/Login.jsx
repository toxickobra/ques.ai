import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Maskgroup from '../assets/Maskgroup.png';
import QuesLogo from '../assets/QuesLogo.png';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth(); // Check if the user is authenticated
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to the create project page if already authenticated
    if (isAuthenticated) {
      navigate('/addyourproject');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://ques-ai-3lhh.onrender.com/api/auth/login', { email, password });
      const { token } = response.data;
      login(token); // Store token using AuthContext
      navigate('/addyourproject'); // Redirect to the desired route after successful login
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
          <img src={logo} alt="" className="h-[10vh]" />
        </div>
        <p className="text-[#7E22CE] text-[4vh] ">Welcome to</p>
        <p className="text-[#7E22CE] text-[4vh] font-bold">Ques.AI</p>
        <div className="loginForm flex flex-col mt-10 w-[70%]">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 my-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
            className="bg-[#7E22CE] text-white p-2 rounded-lg"
            onClick={handleLoginNavigation}
          >
            Sign in
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        {/* Create Account Option */}
        <div className="mt-5">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#7E22CE] font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
