import React, { useState, useEffect, useRef, MouseEvent } from "react";
import "./RestaurantsHeader.scss";
import { DownArrow } from "@/View/Photos";
import { MultiRangeSlider, SingleDistanceSlider, RangeFilter } from "../..";
import { useSelector } from "react-redux";
import { RootState } from "@/Controller/redux/store/store";

interface ButtonData {
  name: string;
  label: string;
}

interface PopupsState {
  [key: string]: boolean;
  PriceRange: boolean;
  Distance: boolean;
  Rating: boolean;
}

interface RestaurantsHeaderProps {
  onPrimaryButtonClick: (buttonName: string) => void;
  onSecondaryButtonClick: (buttonName: string) => void;
  maxDistance: number;
  newDistance: number;
  setNewDistance: (buttonName: number) => void;
}

const primaryFilterButtons: ButtonData[] = [
  { name: "All", label: "All" },
  { name: "New", label: "New" },
  { name: "MostPopular", label: "Most Popular" },
  { name: "OpenNow", label: "Open Now" },
  { name: "MapView", label: "Map View" },
];

const secondaryFilterButtons: ButtonData[] = [
  { name: "PriceRange", label: "Price Range" },
  { name: "Distance", label: "Distance" },
  { name: "Rating", label: "Rating" },
];

const RestaurantsHeader: React.FC<RestaurantsHeaderProps> = ({ onPrimaryButtonClick, onSecondaryButtonClick, newDistance, setNewDistance, maxDistance }) => {
  const { restaurantsPrices } = useSelector((state: RootState) => state.restaurantsPage);
  const { restaurantsDistances } = useSelector((state: RootState) => state.restaurantsPage);
  const [activePrimaryButton, setActivePrimaryButton] = useState<string>(primaryFilterButtons[0].name);
  const [activeSecondaryButton, setActiveSecondaryButton] = useState<string>("");
  const [isSecondaryFilterOpen, setIsSecondaryFilterOpen] = useState<boolean>(false);
  const [isPopupsOpen, setIsPopupsOpen] = useState<PopupsState>({
    PriceRange: false,
    Distance: false,
    Rating: false,
  });
  const popupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onPrimaryButtonClick(activePrimaryButton);
    onSecondaryButtonClick(activeSecondaryButton);
    console.log(activePrimaryButton);
    console.log(activeSecondaryButton);
  }, [activePrimaryButton, activeSecondaryButton]);

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  const handleClick = (buttonName: string, isPrimary: boolean) => {
    if (isPrimary) {
      setActivePrimaryButton(buttonName);
      console.log("Primary Filter Selected:", buttonName);
      setActiveSecondaryButton(""); // Reset the secondary button
      setIsSecondaryFilterOpen(false); // Close secondary filter popups when primary filter is selected
    } else {
      setActiveSecondaryButton(buttonName);
      setIsSecondaryFilterOpen((prevState) => !prevState); // Toggle the secondary filter popup
      console.log("Secondary Filter Selected:", buttonName);
      togglePopup(buttonName);
    }
  };


  const togglePopup = (buttonName: string) => {
    setIsPopupsOpen((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));

    if (isPopupsOpen[buttonName]) {
      setIsPopupsOpen({
        ...isPopupsOpen,
        [buttonName]: false,
      });
    }
  };

  const closePopups = () => {
    setIsPopupsOpen({
      PriceRange: false,
      Distance: false,
      Rating: false,
    });
    setActiveSecondaryButton(""); // Reset the secondary button
    setIsSecondaryFilterOpen(false);
  };


  const handleOutsideClick = (event: MouseEvent) => {
    if (popupsRef.current && !popupsRef.current.contains(event.target as Node)) {
      closePopups();
    }
  };

  const handleDoubleClick = () => {
    setActiveSecondaryButton(""); // Reset the secondary button
    setIsSecondaryFilterOpen(false);
  };

  return (
    <div className="header-container">
      <div className="restaurants-header">
        {primaryFilterButtons.map(({ name, label }) => (
          <button
            key={name}
            className={activePrimaryButton === name ? "active" : name}
            onClick={() => handleClick(name, true)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="button-wrapper" ref={popupsRef}>
        {secondaryFilterButtons.map(({ name, label }) => (
          <button
            key={name}
            id={name} // added id to identify the button
            className={`additional-button ${activeSecondaryButton === name ? "active" : ""}`}
            onClick={() => handleClick(name, false)}
            onDoubleClick={() => handleDoubleClick()}
          >
            {label} <img src={DownArrow} alt="Down Arrow" className="arrow-icon" />
          </button>
        ))}
      </div>
      {isPopupsOpen.PriceRange && isSecondaryFilterOpen && (
        <MultiRangeSlider
          min={restaurantsPrices[0]}
          max={restaurantsPrices[restaurantsPrices.length - 1]}
          onChange={({ min, max }) => { }} // Placeholder onChange function
          isOpen={isPopupsOpen.PriceRange}
          togglePopup={() => togglePopup("PriceRange")}
        />
      )}
      {isPopupsOpen.Distance && isSecondaryFilterOpen && (
        <SingleDistanceSlider
          maxDistance={maxDistance}
          newDistance={newDistance}
          setNewDistance={setNewDistance}
          isOpen={isPopupsOpen.Distance}
          togglePopup={() => togglePopup("Distance")}
          isPopupsOpen={isPopupsOpen}
        />
      )}
      {isPopupsOpen.Rating && isSecondaryFilterOpen && <RangeFilter />}
    </div>
  );
};

export default RestaurantsHeader;
