import React, { useEffect, useRef, useState } from 'react';
import { BiLeftArrowAlt } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import cloudUpload from '../../assets/cloudUpload.png';
import rssfeedlogo from '../../assets/rssfeedlogo.png';
import upload from '../../assets/upload.png';
import youtubeVideo from '../../assets/youtubeVideo.png';
import Card from '../Card';
import UploadProject from '../UploadProject';

function AddYourPodcastSection({ onView }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isEditTranscript, setIsEditTranscript] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleProjectView = () => {
    setIsEditTranscript(!isEditTranscript);
  };
  
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`);
  const [originalText, setOriginalText] = useState(text); // Store the original text

  const textareaRef = useRef(null); // Create a ref for the textarea

  const handleClick = () => {
    setOriginalText(text); // Save the current text as the original text
    setIsEditing(true);
  };


  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDiscard = () => {
    setText(originalText); // Revert to the original text
    setIsEditing(false);
  };

  const handleSave = () => {
    setOriginalText(text); // Save the current text as the original text
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length; // Move cursor to the end
    }
  }, [isEditing]);

  const data = [
    { no: 1, name: 'Project A', date: '2024-08-15 10:30 AM', status: 'Completed' },
    { no: 2, name: 'Project B', date: '2024-08-14 2:45 PM', status: 'In Progress' },
    { no: 3, name: 'Project C', date: '2024-08-13 11:15 AM', status: 'Pending' },
    { no: 4, name: 'Project A', date: '2024-08-15 10:30 AM', status: 'Completed' },
    { no: 5, name: 'Project B', date: '2024-08-14 2:45 PM', status: 'In Progress' },
    { no: 6, name: 'Project C', date: '2024-08-13 11:15 AM', status: 'Pending' }
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = () => {
    setIsUpload(true);
  };

  return (
    <div>
      {!isEditTranscript ? (
        <>
          <p className='heading mt-10 text-[4vh] font-semibold'>Add Your Podcast</p>
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
              <div>
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
                      {data.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr className="text-[#8b8b8b] font-semibold">
                            <td className="py-4 px-6 text-[2vh]">{item.no}</td>
                            <td className="py-4 px-6 text-[2vh]">{item.name}</td>
                            <td className="py-4 px-6 text-[2vh]">{item.date}</td>
                            <td className="py-4 px-6 text-[2vh]">
                              <div className="flex items-center  justify-center ">
                                <button className="text-black py-1 px-3 border rounded-l-lg w-[4vw] border-r-0" onClick={handleProjectView}>View</button>
                                <button className="text-red-500 py-1 px-1 border rounded-r-lg w-[4vw] ">Delete</button>
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
            </div>
          )}
          {isModalOpen && (
            <UploadProject
              closeModal={closeModal}
              onUpload={handleUpload}
            />
          )}
        </>
      ) : (
        <div>
          <div className="nav flex mt-10 items-center justify-between">
              <div className='flex items-center '>
                  <button onClick={handleProjectView}><BiLeftArrowAlt size={60} /></button>
                  <p className='text-[4vh] font-semibold ' 
                    
                  >Edit Transcript</p>
              </div>
              <div>
                {!isEditing?(
                  <button onClick={handleClick} className='border bg-black text-white text-[2vh] p-[6px] px-[3vw] rounded-lg' >Edit</button>
                ):(
                  <div>
                    <button onClick={handleDiscard} className='border w-[10vw]  text-red-600 border-red-600 text-[2vh] p-[6px] px-[3vw] rounded-lg mr-2'>Discard</button>
                    <button onClick={handleSave} className='border w-[10vw] bg-black text-white text-[2vh] p-[6px] px-[3vw] rounded-lg'>Save</button>
                  </div>
                )}
              </div>
          </div>
              
          <div className="mt-4 bg-white rounded-lg shadow-lg border p-10" style={{height: '60vh'}}>
            <div className="p-3 rounded-t-lg">
              <h2 className="text-[#7e22ce] text-[28px] font-semibold">Speaker</h2>
            </div>
            <div 
              className="p-4 h-[calc(100%-48px)] overflow-y-auto scrollbar-hide"
            >
              {isEditing ? (
                <textarea
                  ref={textareaRef} // Attach ref to the textarea
                  className="w-full h-full bg-transparent outline-none resize-none scrollbar-hide text-[#63635e] text-[2vh] "
                  value={text}
                  onChange={handleChange}
                  autoFocus
                />
              ) : (
                <p className='text-[#63635e] text-[2vh]'>{text}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddYourPodcastSection;