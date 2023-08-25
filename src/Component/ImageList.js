import { useEffect, useRef } from 'react';

const ImageList = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window && containerRef.current) {
      window.cloudinary.galleryWidget({
        container: containerRef.current,
        cloudName: 'dhh8atda3',
        mediaAssets: [{ tag: 'gallery-images' }], // Use 'tag' instead of 'tags'
      }).render();
    }
  }, []);

  return (
    <>
    
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a>
        <img class="rounded-t-lg" ref={containerRef} alt="" />
    </a>
</div>
</>
    
    );
};

export default ImageList;
