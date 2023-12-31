import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Component/Home';
import AuthForm from './Component/AuthForm';
import ImageUpload from './Component/ImageUpload';
import ImageGallery from '../src/Component/ImageGallery';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = "http://localhost:8080/auth/login/success";
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
           
              <Home user={user} />
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <AuthForm />}
        />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/image-gallery" element={<ImageGallery />} />
      </Routes>
    </div>
  );
}

export default App;
