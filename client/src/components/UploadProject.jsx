import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth to access authentication token

const UploadProject = ({ closeModal, onUpload, projectId }) => {
  const [uploadName, setUploadName] = useState('');
  const [uploadLink, setUploadLink] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth(); // Get the authentication token from context

  const handleSubmit = async () => {
    if (uploadName.trim() === '') {
      setError("Name can't be empty");
    } else {
      try {
        // Replace with your API endpoint
        await axios.post(`https://ques-ai-3lhh.onrender.com/api/${projectId}/objects`, 
          {
            name: uploadName,
            link: uploadLink,
            project: projectId, // Send the project ID
            // uploadDate is not explicitly sent; it defaults to the current date in the schema
          },
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        setError('');
        closeModal();
        onUpload();
      } catch (error) {
        console.error('Error uploading object:', error);
        setError('An error occurred while uploading. Please try again.');
      }
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg max-w-[40vw] min-w-[40vw]'>
        <p className='text-xl font-semibold mb-4'>Upload From Youtube</p>
        <div className="mb-4">
          <label htmlFor="uploadName" className="block text-gray-700 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="uploadName"
            value={uploadName}
            onChange={(e) => setUploadName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7e22ce]"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <label htmlFor="uploadLink" className="block text-gray-700 font-semibold mb-2 mt-5">
            Link
          </label>
          <input
            type="text"
            id="uploadLink"
            value={uploadLink}
            onChange={(e) => setUploadLink(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7e22ce]"
          />
        </div>
        <div className="flex justify-end gap-5">
          <button
            onClick={closeModal}
            className="text-[#f04f4f] font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 text-white font-semibold bg-[#7e22ce] rounded-lg"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProject;
