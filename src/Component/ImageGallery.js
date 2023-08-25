import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://localhost:8080/fetch-images');

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();

        const imageUrls = data.resources
          .filter((resource) => resource.type === 'upload')
          .map((resource) => resource.url);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);

  useEffect(() => {
    // Retrieve view counts from localStorage when the component mounts
    const storedViewCounts = JSON.parse(localStorage.getItem('viewCounts')) || {};
    setViewCounts(storedViewCounts);
  }, []);
  
  useEffect(() => {
    // Update view counts in localStorage whenever viewCounts changes
    localStorage.setItem('viewCounts', JSON.stringify(viewCounts));
  }, [viewCounts]);
  

  const incrementViewCount = async (imageId) => {
    try {
      const response = await fetch('http://localhost:8080/increment-image-views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to increment view count');
      }
  
      // Update view counts in state
      setViewCounts((prevViewCounts) => ({
        ...prevViewCounts,
        [imageId]: (prevViewCounts[imageId] || 0) + 1,
      }));
  
      // Update view counts in localStorage after updating state
      localStorage.setItem('viewCounts', JSON.stringify(viewCounts));
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <Link to={imageUrl} key={index}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                className="w-full h-auto"
                onClick={() => incrementViewCount(index)}
              />
              <p>Views: {viewCounts[index] || 0}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
