'use client'
import React, { useState } from 'react';

const Rating = ({ initialValue  }) => {
  const [rating, setRating] = useState(initialValue);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  return (
    <div className="flex ">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index)}
          className={`cursor-pointer text-4xl ${
            index <= rating ? 'text-yellow-500' : 'text-gray-400'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
