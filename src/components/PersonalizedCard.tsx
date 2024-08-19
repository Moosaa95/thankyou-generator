import React from 'react';

interface PersonalizedCardProps {
  image: string;
  userName: string;
}

const PersonalizedCard: React.FC<PersonalizedCardProps> = ({ image, userName }) => {
  return (
    <div className="relative w-full max-w-lg aspect-[4/5] bg-gray-200">
      <img src={image} alt="Selected" className="object-cover w-full h-full" />
      <div className="absolute top-0 left-0 w-full p-4 text-4xl font-bold text-center text-white">
        Thank You
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 text-3xl font-semibold text-center text-white">
        {userName}
      </div>
    </div>
  );
};

export default PersonalizedCard;
