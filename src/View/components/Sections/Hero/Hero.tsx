import React from 'react';
import { SearchIcon } from "@/View/Photos";
import './Hero.scss';
/**
 * rendering the hero section of the application.
 *  It displays a background image with overlay content, including text and a search bar. 
 */
const Hero: React.FC = () => {
  return (
    <div className="background">
      <div className="overlay">
        <div className="text">Epicure works with the top chef restaurants in Tel Aviv</div>
        <div className="bar">
          <button className="button">
            <img className="icon" src={SearchIcon} alt="Search Icon" />
          </button>
          <input className="input" type="text" placeholder="Search for a restaurant, cuisine and chef" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
