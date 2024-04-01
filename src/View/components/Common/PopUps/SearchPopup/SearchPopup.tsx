// SearchPopup.tsx

// This component renders a search popup used for searching for restaurants and chefs.
// It displays an input field and a search button when isOpen is true.
// The togglePopup function is used to control the visibility of the popup.

import React from 'react';
import './SearchPopup.scss';
import { SearchIcon } from '../../../../Photos';

interface SearchPopupProps {
  isOpen: boolean;
  togglePopup: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, togglePopup }) => {
  const popupClassName = isOpen ? 'search-popup open' : 'search-popup';

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={popupClassName}>
      {isOpen && (
        <div className="search-bar">
          <button className="search-button" onClick={handleSearchButtonClick}>
            <img src={SearchIcon} alt="Search Icon" className='navbar-icon' />
          </button>
          <input className="search-input" type="text" placeholder="Search for a restaurant, cuisine and chef" />
        </div>
      )}
    </div>
  );
}

export default SearchPopup;
