import { FC } from 'react';
import { RatingComponent } from '@/View/components';
import './RatingFilter.scss';
interface RatingFilterProps {
  selectedRating: number[];
  setSelectedRating: (selectedRating: number[]) => void;
}
const RatingFilter: FC<RatingFilterProps> = ({ selectedRating, setSelectedRating }) => {
  return (
    <div id="Rating" className={`range-checkbox-filter-popup ${(selectedRating.length > 0 ? 'rating-popup-open-clear' : 'rating-popup-open')}`}>
      <div className="rating-popup-title">Rating</div>
      <div className="filter-options">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} className="checkbox-rating">
            <input
              id="Rating"
              type="checkbox"
              checked={selectedRating.includes(rating)}
              onChange={(event) => {
                setSelectedRating(event.target.checked
                  ? [...selectedRating, rating]
                  : selectedRating.filter((r) => r !== rating));
              }}
            />
            <div id="Rating" className="rating">
              <RatingComponent number={rating} />
            </div>
          </div>
        ))}
      </div>
      <div id="Rating" className="button-container">
        {selectedRating.length > 0 && (<button id="clear" className="clear-button" onClick={() => setSelectedRating([])}>Clear</button>
        )}
      </div>
    </div>
  );
};

export default RatingFilter;
