import React, { useState } from 'react';
import ImageSelector from './components/ImageSelector';
import PersonalizedCard from './components/PersonalizedCard';


const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleDownload = () => {
    if (!selectedImage || !userName) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);

        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';

        // "Thank You" text
        ctx.fillText('Thank You', canvas.width / 2, 60);

        // User's name
        ctx.fillText(userName, canvas.width / 2, canvas.height - 60);

        const link = document.createElement('a');
        link.download = 'thank-you-card.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!selectedImage ? (
        <>
          <h1 className="mb-8 text-3xl font-bold">Select an Image</h1>
          <ImageSelector onSelect={(image) => setSelectedImage(image.urls.regular)} />
        </>
      ) : (
        <>
          <PersonalizedCard image={selectedImage} userName={userName} />
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="p-2 mt-4 border border-gray-300 rounded"
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Download Card
          </button>
        </>
      )}
    </div>
  );
};

export default App;
