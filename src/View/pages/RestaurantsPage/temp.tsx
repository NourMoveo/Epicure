import React, { useState } from "react";
import { CustomCardsSection, RestaurantsHeader } from "../../components";
import { RestaurantsData } from "../../data";
import "./RestaurantsPage.scss"; // Import SCSS file
import { Map } from "@/assets/Photos";

const Restaurants = () => {
  const [isMapView, setIsMapView] = useState(false);

  const handleMapViewClick = () => {
    setIsMapView(true);
  };

  const handleAllButtonClick = () => {
    setIsMapView(false); // Ensure cards are displayed when "All" button is clicked
  };

  return (
    <div className="restaurants-page">
      <h2 className="restaurant-header">Restaurants</h2>
      <RestaurantsHeader onMapViewClick={handleMapViewClick} onAllButtonClick={handleAllButtonClick} />
      <div className="container-content">
        {isMapView ? (
          <div className='map-image-container'><img className="map-img" src={Map} alt="Map" /></div>
        ) : (
          <div className="cards">
            <CustomCardsSection cardsData={RestaurantsData} cardType={1} pageType={2} layoutDirection="vertical" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;