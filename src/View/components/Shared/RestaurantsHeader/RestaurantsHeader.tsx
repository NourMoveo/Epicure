import React, { useState, useEffect, useRef } from "react";
import "./RestaurantsHeader.scss";
import { DownArrow } from "@/View/Photos";
import { MultiRangeSlider, SingleDistanceSlider, RangeFilter } from "../..";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Controller/redux/store/store";
import { setFirstFilter, setSecondFilter } from "@/Controller/redux/slices/restaurantsPageSlice";
import { useDispatch } from "react-redux";

const buttonsData = [
  { name: "All", label: "All" },
  { name: "New", label: "New" },
  { name: "MostPopular", label: "Most Popular" },
  { name: "OpenNow", label: "Open Now" },
  { name: "MapView", label: "Map View" },
];

const additionalButtonsData = [
  { name: "PriceRange", label: "Price Range" },
  { name: "Distance", label: "Distance" },
  { name: "Rating", label: "Rating" },
];

const RestaurantsHeader = ({ onButtonClick, onAdditionalButtonClick }) => {
  const { restaurantsPrices } = useSelector((state: RootState) => state.restaurantsPage);
  const { restaurantsDistances } = useSelector((state: RootState) => state.restaurantsPage);
  const dispatch = useDispatch<AppDispatch>();
  const [activeButton, setActiveButton] = useState(buttonsData[0].name);
  const [activeAdditionalButton, setActiveAdditionalButton] = useState(null);
  const [lastClickedButton, setLastClickedButton] = useState(null);
  const [isPopupsOpen, setIsPopupsOpen] = useState({
    PriceRange: false,
    Distance: false,
    Rating: false,
  });
  const popupsRef = useRef(null);

  useEffect(() => {
    onButtonClick(activeButton);
  }, [activeButton]);

  const handleClick = (buttonName) => {
    const isMainButton = buttonsData.some((button) => button.name === buttonName);
    if (isMainButton) {
      dispatch(setFirstFilter(buttonName));
      setActiveButton(buttonName);
      onButtonClick(buttonName);
    } else {

      setSecondFilter(buttonName);
      setActiveAdditionalButton(buttonName);
      onAdditionalButtonClick(buttonName);
      togglePopup(buttonName);
    }

    // Add double click event listener to remove 'active' class and close popup
    if (buttonName === lastClickedButton) {
      setLastClickedButton(null); // Reset lastClickedButton after handling double click
    } else {
      setLastClickedButton(buttonName);
    }
  };

  const togglePopup = (buttonName) => {
    setIsPopupsOpen((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
  };

  const closePopups = () => {
    setIsPopupsOpen({
      PriceRange: false,
      Distance: false,
      Rating: false,
    });
    setActiveAdditionalButton(null);
  };

  const handleOutsideClick = (event) => {
    if (popupsRef.current && !popupsRef.current.contains(event.target)) {
      closePopups();
    }
  };

  const handleDoubleClick = (buttonName) => {
    setActiveAdditionalButton(null);
  };

  return (
    <div className="header-container">
      <div className="restaurants-header">
        {buttonsData.map(({ name, label }) => (
          <button
            key={name}
            className={activeButton === name ? "active" : name}
            onClick={() => handleClick(name)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="button-wrapper" ref={popupsRef}>
        {additionalButtonsData.map(({ name, label }) => (
          <button
            key={name}
            id={name} // added id to identify the button
            className={`additional-button ${activeAdditionalButton === name ? "active" : ""}`}
            onClick={() => handleClick(name)}
            onDoubleClick={() => handleDoubleClick(name)}
          >
            {label} <img src={DownArrow} alt="Down Arrow" className="arrow-icon" />
          </button>
        ))}
      </div>
      {isPopupsOpen.PriceRange && (
        <MultiRangeSlider
          min={restaurantsPrices[0]}
          max={restaurantsPrices[restaurantsPrices.length - 1]}
          onChange={({ min, max }) => {}} // Placeholder onChange function
          isOpen={isPopupsOpen.PriceRange}
          togglePopup={() => togglePopup("PriceRange")}
        />
      )}
      {isPopupsOpen.Distance && (
        <SingleDistanceSlider
          currentLocation="Your Location"
          maxDistance={restaurantsDistances[restaurantsDistances.length - 1]}
          onChange={(value) => {}} // Placeholder onChange function
          isOpen={isPopupsOpen.Distance}
          togglePopup={() => togglePopup("Distance")}
        />
      )}
      {isPopupsOpen.Rating && <RangeFilter />}
    </div>
  );
};

export default RestaurantsHeader;
