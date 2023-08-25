import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import ImageList from './ImageList';



const Home = (userDetails) => {
    const user = userDetails.user;
    const navigate = useNavigate();
    const logout = () => {
        window.open(
            "http://localhost:8080/auth/logout",
            "_self"
        )
    }
    const imageUpload = async () => {
        if (user) {
            navigate("/upload")
        }
        else {
            navigate("/login")
        }
    }
    return (
        <>
            <header>
                <nav className='flex items-center justify-around h-16 bg-slate-200'>
                    <h2>Welcome</h2>
                    <div className='navLinks flex items-center'>
                        <h2 className='mr-4'>{user.email}</h2>
                        <span><img src={user.picture} alt='User Profile' className='rounded-full w-1/2' /></span>

                        <button onClick={imageUpload} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>

                            <span>Upload Image</span>
                        </button>
                        <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={logout}>Logout</button>
                    </div>
                </nav>
            </header>
          <ImageGallery/>
        </>
    );
};

export default Home;
