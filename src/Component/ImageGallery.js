// components/ImageGallery.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../actions/Images';

function ImageGallery() {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.public_id} className="bg-white p-4 rounded-lg shadow-md">
          <img src={image.secure_url} alt={image.public_id} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
