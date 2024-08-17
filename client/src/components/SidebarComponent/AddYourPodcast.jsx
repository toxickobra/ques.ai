import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { RiShareForwardFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import cloudUpload from '../../assets/cloudUpload.png';
import rssfeedlogo from '../../assets/rssfeedlogo.png';
import upload from '../../assets/upload.png';
import youtubeVideo from '../../assets/youtubeVideo.png';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../Card';
import UploadProject from '../UploadProject';

function AddYourPodcastSection({ onView }) {
  const { projectId } = useParams(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isEditTranscript, setIsEditTranscript] = useState(false);
  const [objects, setObjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(''); // Transcript text state
  const [originalText, setOriginalText] = useState(''); // Store original transcript text
  const [selectedObject, setSelectedObject] = useState(null); // Store the selected object
  const textareaRef = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${projectId}/objects`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setObjects(response.data);
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    };

    fetchObjects();
  }, [projectId, token]);

  const handleClick = () => {
    setOriginalText(text);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDiscard = () => {
    setText(originalText);
    setIsEditing(false);
  };

  const handleSave = async () => {
    await handleUpdateObjectLink(); // Update the object link
    setOriginalText(text); // Save the updated text
    setIsEditing(false); // Exit editing mode
  };

  const handleUpdateObjectLink = async () => {
    try {
      if (selectedObject) {
        await axios.put(`http://localhost:5000/api/objects/${selectedObject._id}`, 
        { link: text },
        {
          headers: {
            'x-auth-token': token,
          },
        });
        // Refresh the objects list after updating
        fetchUpdatedObjects();
        setIsEditTranscript(false); // Close the edit mode
      }
    } catch (error) {
      console.error('Error updating object link:', error);
    }
  };

  const fetchUpdatedObjects = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${projectId}/objects`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setObjects(response.data);
    } catch (error) {
      console.error('Error fetching updated objects:', error);
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }
  }, [isEditing]);

  useEffect(() => {
    setIsUpload(objects.length > 0);
  }, [objects]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = async () => {
    await fetchUpdatedObjects();
    setIsUpload(true);
  };

  const handleProjectView = (object) => {
    setSelectedObject(object); // Set the selected object
    setText(object.link); // Set the text in the textarea with the object’s content
    setOriginalText(object.link); // Also set the original text
    setIsEditTranscript(true); // Show the edit transcript view
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (objectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/objects/${objectId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      // Refresh the objects list after deletion
      fetchUpdatedObjects();
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  return (
    <div>
      {!isEditTranscript ? (
        <>
          <p className='heading mt-10 text-[3vh] font-semibold'>Add Your Podcast</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            <Card
              title="RSS Feed"
              description="Lorem ipsum dolor sit. Dolor lorem sit."
              logoSrc={rssfeedlogo}
            />
            <Card
              title="Youtube Video"
              description="Lorem ipsum dolor sit. Dolor lorem sit."
              logoSrc={youtubeVideo}
            />
            <Card
              title="Upload Files"
              description="Lorem ipsum dolor sit. Dolor lorem sit."
              logoSrc={upload}
              onClick={handleCardClick}
            />
          </div>
          {!isUpload ? (
            <div className="dragDropSection bg-white mt-12 h-[42vh] rounded-2xl border-[2px] shadow-lg flex flex-col justify-center items-center">
              <img src={cloudUpload} alt="Upload" />
              <p className='text-[3vh]'>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
              <p className='text-[2vh] text-[#9f9f9f]'>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
              <button className='text-[#7e22ce] px-5 py-2 border-2 text-[2vh] font-medium rounded-full border-[#7e22ce] mt-10'
                onClick={openModal}
              >
                Select File
              </button>
            </div>
          ) : (
            <div className='bg-white mt-12 h-[46vh] rounded-2xl border-[2px] shadow-lg'>
              <p className='text-[3vh] font-semibold p-10'>Your Files</p>
              <div className="mx-10 max-h-[30vh] overflow-y-auto">
                <table className="min-w-full text-left border-collapse border-0">
                  <thead className="rounded-xl bg-gray-200 text-gray-600 uppercase text-sm font-semibold">
                    <tr>
                      <th className="py-4 px-6 first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl last:rounded-br-xl">No.</th>
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6">Upload Date & Time</th>
                      <th className="py-4 px-6 first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl last:rounded-br-xl flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {objects.map((object, index) => (
                      <React.Fragment key={object._id}>
                        <tr className="text-[#8b8b8b] font-semibold">
                          <td className="py-4 px-6 text-[2vh]">{index + 1}</td>
                          <td className="py-4 px-6 text-[2vh]">{object.name}</td>
                          <td className="py-4 px-6 text-[2vh]">{new Date(object.uploadDate).toLocaleString()}</td>
                          <td className="py-4 px-6 text-[2vh]">
                            <div className="flex items-center justify-center">
                              <button className="text-black py-1 px-3 border rounded-l-lg w-[4vw] border-r-0" onClick={() => handleProjectView(object)}>View</button>
                              <button
                                className="text-red-500 py-1 px-1 border rounded-r-lg w-[4vw]"
                                onClick={() => handleDelete(object._id)}
                              >
                                Delete
                              </button>
                              <button><RiShareForwardFill /></button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4">
                            <hr className="border-gray-300" />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {isModalOpen && (
            <UploadProject
              closeModal={closeModal}
              onUpload={handleUpload}
              projectId={projectId}
            />
          )}
        </>
      ) : (
        <div className='px-10'>
          <div className="nav flex mt-10 items-center  justify-between ">
            <div className='flex items-center '>
              <button onClick={() => setIsEditTranscript(false)}><BiLeftArrowAlt size={60} /></button>
              <p className='text-[4vh] font-semibold'>Edit Transcript</p>
            </div>
            <div>
              {!isEditing ? (
                <button onClick={handleClick} className='border bg-black text-white text-[2vh] p-[1vh] mr-[2vh] rounded-lg px-10'>
                  Edit
                </button>
              ) : (
                <div>
                  <button
                    onClick={handleDiscard}
                    className='border-2 border-red-600 text-red-600 text-[2vh] p-[1vh] px-10 mr-[2vh] rounded-lg'
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    className='border-2 bg-black text-white text-[2vh] p-[1vh] px-10 mr-[2vh] rounded-lg'
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
          <textarea
            className='border-2 mt-5 p-[2vh] w-[100%] h-[60vh] mx-auto block'
            value={text}
            onChange={handleChange}
            ref={textareaRef}
            disabled={!isEditing}
          />
        </div>
      )}
    </div>
  );
}

export default AddYourPodcastSection;
