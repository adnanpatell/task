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

        const imageInfo = data.resources
          .filter((resource) => resource.type === 'upload')
          .map((resource) => ({
            url: resource.url,
            publicId: resource.public_id, // Use public_id as the identifier
          }));

        setImages(imageInfo);
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

  const incrementViewCount = async (publicId) => {
    try {
      const response = await fetch('http://localhost:8080/increment-image-views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }), // Use the public_id as the identifier
      });

      if (!response.ok) {
        throw new Error('Failed to increment view count');
      }

      // Update view counts in state
      setViewCounts((prevViewCounts) => ({
        ...prevViewCounts,
        [publicId]: (prevViewCounts[publicId] || 0) + 1,
      }));
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  return (
    <div>
  <h1 className="text-2xl font-semibold mb-4">Image Gallery</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {images.map((imageInfo) => (
      <Link to={imageInfo.url} key={imageInfo.publicId}>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={imageInfo.url}
            alt={`Image ${imageInfo.publicId}`}
            className="w-full h-[300px] object-cover"
            onClick={() => incrementViewCount(imageInfo.publicId)}
          />
          <div className="mt-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="ml-2">{viewCounts[imageInfo.publicId] || 0}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>



  );
}

export default ImageGallery;

