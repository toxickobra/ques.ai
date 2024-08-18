import axios from 'axios';
import PropTypes from 'prop-types'; // For prop type validation
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const addyourprojectPopup = ({ closeModal, onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, token } = useAuth();
  const handleSubmit = async () => {
    
    if (projectName.trim() === '') {
      setError("Project Name can't be empty");
      return;
    }

    setError('');

    try {
      
      const response = await axios.post('https://ques-ai-3lhh.onrender.com/api/projects', {
        name: projectName,
      }, {
        headers: {
          'x-auth-token': token,
        },
      });

      onProjectCreated(response.data);
      closeModal();
    } catch (err) {
      console.error('Error creating project:', err.response ? err.response.data : err.message);
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-[40vw] min-w-[40vw]">
        <p className="text-xl font-semibold mb-4">Create Project</p>
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-gray-700 font-semibold mb-2">
            Enter Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Type here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-end gap-5">
          <button onClick={closeModal} className="text-[#f04f4f] font-medium">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-3 py-2 text-white font-semibold bg-[#7e22ce] rounded-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

addyourprojectPopup.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onProjectCreated: PropTypes.func.isRequired,
};

export default addyourprojectPopup;
