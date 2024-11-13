import React from 'react';

interface RatingBreakdownProps {
  onRatingClick: (rating: number) => void;
}

const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ onRatingClick }) => {
  const ratings = [
    { stars: 5, count: 255 },
    { stars: 4, count: 4 },
    { stars: 3, count: 3 },
    { stars: 2, count: 1 },
    { stars: 1, count: 10 },
  ];

  const maxRatingCount = Math.max(...ratings.map(r => r.count));

  return (
    <div className="space-y-2 w-full max-w-xs">
      {ratings.map(rating => (
        <div
          key={rating.stars}
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onRatingClick(rating.stars)}
        >
          <span className="text-sm font-medium">{rating.stars}★</span>
          <div className="flex-1 h-4 bg-gray-200 rounded">
            <div
              className="h-4 bg-green-600 rounded"
              style={{
                width: `${(rating.count / maxRatingCount) * 100}%`
              }}
            ></div>
          </div>
          <span className="text-sm font-medium">{rating.count}</span>
        </div>
      ))}
    </div>
  );
};

export default RatingBreakdown;
