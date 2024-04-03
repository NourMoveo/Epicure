import React, { FC } from 'react';
import { RatingComponent } from '@/View/components';
import './RatingFilter.scss';
interface RatingFilterProps {
  selectedRating: number[];
  setSelectedRating: (selectedRating: number[]) => void;
}
const RatingFilter: FC<RatingFilterProps> = ({ selectedRating, setSelectedRating }) => {

  const handleRatingChange = async (rating: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSelectedRating = event.target.checked
      ? [...selectedRating, rating] : selectedRating.filter((r) => r !== rating);
    setSelectedRating(updatedSelectedRating);
    console.log("Selected rating:", updatedSelectedRating);

  };




  selectedRating.length > 0
  return (

    <div className={`range-checkbox-filter-popup ${(selectedRating.length > 0 ? 'rating-popup-open-clear' : 'rating-popup-open')}`}>
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
        {selectedRating.length > 0 && (<button className="clear-button" onClick={() => setSelectedRating([])}>Clear</button>
        )}
      </div>
    </div>
  );
};

export default RatingFilter;
