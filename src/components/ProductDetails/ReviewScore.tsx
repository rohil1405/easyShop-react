import React from "react";

interface ReviewScoreProps {
  rating: number;
}

const ReviewScore: React.FC<ReviewScoreProps> = ({ rating }) => {
  return (
    <div className="review-score">
      <div className="score-left">
        <svg
          fill="#228BE6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path d="M 11 4 C 7.101563 4 4 7.101563 4 11 L 4 39 C 4 42.898438 7.101563 46 11 46 L 39 46 C 42.898438 46 46 42.898438 46 39 L 46 15 L 44 17.3125 L 44 39 C 44 41.800781 41.800781 44 39 44 L 11 44 C 8.199219 44 6 41.800781 6 39 L 6 11 C 6 8.199219 8.199219 6 11 6 L 37.40625 6 L 39 4 Z M 43.25 7.75 L 23.90625 30.5625 L 15.78125 22.96875 L 14.40625 24.4375 L 23.3125 32.71875 L 24.09375 33.4375 L 24.75 32.65625 L 44.75 9.03125 Z" />
        </svg>
      </div>
      <div className="score-right">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="48px"
          height="48px"
          viewBox="0 0 24 24"
          fill="#FFD700"
        >
          <path d="M12 17.27L18.18 21 16.54 14.83 22 9.24 15.81 8.63 12 3 8.19 8.63 2 9.24 7.46 14.83 5.82 21 12 17.27z" />
        </svg>
        <div className="rating">({rating})</div>
      </div>
    </div>
  );
};

export default ReviewScore;
