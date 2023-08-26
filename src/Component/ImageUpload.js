import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ImageUpload() {

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'assignment_mern');
    data.append('cloud_name', 'dhh8atda3');
  
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dhh8atda3/image/upload', {
        method: 'POST',
        body: data,
      });
  
      const img = await res.json();
      const publicId = img.public_id; // Get the uploaded image's public_id
  
      // Send the public_id to the server for tracking view count
      await fetch('http://localhost:8080/increment-image-views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });
  
      console.log(publicId);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-grey-400 p-4">
      <div className="max-w-lg mx-auto p-4 bg-slate-200 rounded-lg shadow-xl">
      
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input className="border border-gray-400 p-2 w-full rounded-xl" type="text" id="title"  
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea className="border border-gray-400 p-2 w-full rounded-xl" id="description"
           placeholder="Description"
           value={desc}
           onChange={(e) => setDesc(e.target.value)}></textarea>
        </div>

        <div className="mb-4">
          <input className="border border-gray-400 p-2 w-full rounded-xl" type="file" id="file" onChange={(e) => setImage(e.target.files[0])}/>
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={handleSubmit}  >
          Upload
        </button> 
    </div>
    </div>
  )

}