import React, { useState, useEffect } from 'react';

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface ImageSelectorProps {
  onSelect: (image: Image) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=4&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        console.log('===========DATA', data);
        console.log('======ACCESS', process.env.REACT_APP_UNSPLASH_ACCESS_KEY);
        
        
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image) => (
        <img
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
          className="cursor-pointer hover:opacity-75"
          onClick={() => onSelect(image)}
        />
      ))}
    </div>
  );
};

export default ImageSelector;
