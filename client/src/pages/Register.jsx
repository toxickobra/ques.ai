import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Maskgroup from '../assets/Maskgroup.png';
import QuesLogo from '../assets/QuesLogo.png';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      // Register the user
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });

      // Get the token from the registration response
      const { token } = response.data;

      // Log in the user using the token
      login(token); // Store the token using AuthContext

      // Navigate to the create project page
      navigate('/addyourproject');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleRegisterNavigation = (e) => {
    e.preventDefault();
    handleRegister();
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
        <p className="text-[#7E22CE] text-[4vh] font-bold">Create Account</p>
        <p className="text-[#7E22CE] text-[2vh] font-semibold">Join us today!</p>
        <div className="registerForm flex flex-col mt-10 w-[80%]">
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE] mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE] mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE] mb-8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-[#7E22CE] text-white p-2 rounded-lg"
            onClick={handleRegisterNavigation}
          >
            Register
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Added "Have an account? Log in" section */}
          <div className="mt-5 text-center">
            <p className="text-[#7E22CE]">
              Have an account?{' '}
              <Link to="/login" className="text-[#7E22CE] font-bold underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
