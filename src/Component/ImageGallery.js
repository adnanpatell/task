import React, { useEffect, useState } from 'react';

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://localhost:8080/fetch-images'); // This will now go to your Express server

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        // Extract image URLs from the resources
        const imageUrls = data.resources.map((resource) => resource.url);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div>
  <h1 className="text-2xl font-semibold mb-4">Image Gallery</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {images.map((imageUrl, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md">
        <img src={imageUrl} alt={`Image ${index}`} className="w-full h-auto" />
      </div>
    ))}
  </div>
</div>

  );
}

export default ImageGallery;
