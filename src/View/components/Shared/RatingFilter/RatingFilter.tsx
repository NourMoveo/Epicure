import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RatingComponent } from '@/View/components';
import './RatingFilter.scss';
import { setData, setSelectedRating } from '@/Controller/redux/slices/restaurantsPageSlice';
import { RootState } from '@/Controller/redux/store/store';
import { restaurantAPI } from '@/Model/APIs/RestaurantAPI';

const RatingFilter: React.FC = () => {
  const [popupHeight, setPopupHeight] = useState<number>(9.5); // Initial height
  const dispatch = useDispatch();
  const { selectedRating ,page ,limit,firstFilter } = useSelector((state: RootState) => state.restaurantsPage);

  const handleRatingChange = async (rating: number, event: React.ChangeEvent<HTMLInputElement>) => {
    // Stop event propagation to prevent the popup from closing automatically
    event.stopPropagation();

    const updatedRatings = selectedRating.includes(rating)
      ? selectedRating.filter((r: number) => r !== rating)
      : [...selectedRating, rating];
    console.log(updatedRatings);
    console.log(await restaurantAPI.getRestaurantsByRatings(page,limit,updatedRatings,firstFilter));
    dispatch(setSelectedRating(updatedRatings));
    dispatch(setData(await restaurantAPI.getRestaurantsByRatings(page,limit,updatedRatings,firstFilter)));

  };

  const handleClearFilter =  async () => {
    dispatch(setSelectedRating([])); 
    dispatch(setData(await restaurantAPI.getRestaurantsByRatings(page,limit,selectedRating,firstFilter)));

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
