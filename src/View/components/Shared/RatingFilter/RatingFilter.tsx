import React, { useState, useEffect } from 'react';
import { RatingComponent } from '@/View/components';
import './RatingFilter.scss';

const RatingFilter: React.FC = () => {
  const [popupHeight, setPopupHeight] = useState<number>(9.5); 
  const [selectedRating, setSelectedRating] = useState<number[]>([]);

  const handleRatingChange = async (rating: number, event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const updatedSelectedRating = event.target.checked
        ? [...selectedRating, rating] // Add the selected rating to the array
        : selectedRating.filter((r) => r !== rating); // Remove the unselected rating from the array
      setSelectedRating(updatedSelectedRating);
      console.log("Selected rating:", updatedSelectedRating); 
    } catch (error) {
      console.error("Error setting selected rating:", error);
      // Handle error if necessary
    }
  };

  const handleClearFilter = async () => {
    setSelectedRating([]);
  };

  useEffect(() => {
    // Adjust popup height based on selected ratings
    if (selectedRating.length > 0) {
      setPopupHeight(26.5); // Increase height when checkboxes are selected
    } else {
      setPopupHeight(22.5); // Restore initial height when no checkboxes are selected
    }
  }, [selectedRating]);

  return (
    <div className="range-checkbox-filter-popup" style={{ height: `${popupHeight}vw` }}>
      <div className="rating-popup-title">Rating</div>
      <div className="filter-options">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} className="checkbox-rating">
            <input
              type="checkbox"
              checked={selectedRating.includes(rating)}
              onChange={(event) => handleRatingChange(rating, event)}
            />
            <div className="rating">
              <RatingComponent number={rating} />
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        {selectedRating.length > 0 && (
          <button className="clear-button" onClick={handleClearFilter}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default RatingFilter;
