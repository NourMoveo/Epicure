import React, { useState } from "react";
import "./RestaurantsHeader.scss";
import { DownArrow } from "@/View/Photos";
import { MultiRangeSlider, SingleDistanceSlider, RangeFilter } from "../..";

interface ButtonData {
  name: string;
}
interface PopupsState {
  [key: string]: boolean;
  PriceRange: boolean;
  Distance: boolean;
  Rating: boolean;
}
interface RestaurantsHeaderProps {
  primaryButton: string
  setPrimaryButton: (buttonName: string) => void;
  secondaryButton: string
  setSecondaryButton: (buttonName: string) => void;
  maxDistance: number;
  newDistance: number;
  setNewDistance: (buttonName: number) => void;
  newMin: number,
  newMax: number,
  setNewMin: (min: number) => void,
  setNewMax: (max: number) => void,
  selectedRating: number[],
  setSelectedRating: (selectedRating: number[]) => void,
  restaurantsPrices: number[],
}
const primaryFilterButtons: ButtonData[] = [
  { name: "All" },
  { name: "New" },
  { name: "MostPopular" },
  { name: "OpenNow" },
  { name: "MapView" },
];
const secondaryFilterButtons: ButtonData[] = [
  { name: "PriceRange" },
  { name: "Distance" },
  { name: "Rating" },
];
const RestaurantsHeader: React.FC<RestaurantsHeaderProps> = ({ primaryButton, setPrimaryButton, secondaryButton, setSecondaryButton, newDistance, maxDistance, setNewDistance, newMin, newMax, setNewMax, setNewMin, selectedRating, setSelectedRating, restaurantsPrices }) => {
  const [isPopupsOpen, setIsPopupsOpen] = useState<PopupsState>({
    PriceRange: false,
    Distance: false,
    Rating: false,
  });
  const handleClick = (buttonName: string, isPrimary: boolean) => {
    if (isPrimary) {
      setPrimaryButton(buttonName);
      console.log("Primary Filter Selected:", buttonName);
      setSecondaryButton("");
    } else {
      setSecondaryButton(buttonName);
      console.log("Secondary Filter Selected:", buttonName);
      togglePopup(buttonName);
    }
  };
  const togglePopup = (buttonName: string) => {
    setIsPopupsOpen((prevState) => ({
      ...prevState,
      [secondaryButton]: !prevState[secondaryButton],
      [buttonName]: !prevState[buttonName]
    }));
  };
  return (
    <div className="header-container">
      <div className="restaurants-header">
        {primaryFilterButtons.map(({ name }) => (
          <button
            key={name}
            className={primaryButton === name ? "active" : name}
            onClick={() => handleClick(name, true)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="button-wrapper" >
        {secondaryFilterButtons.map(({ name }) => (
          <button
            key={name}
            id={name} // added id to identify the button
            className={`additional-button ${secondaryButton === name ? "active" : ""}`}
            onClick={() => handleClick(name, false)}
          >
            {name} <img src={DownArrow} alt="Down Arrow" className="arrow-icon" />
          </button>
        ))}
      </div>
      {isPopupsOpen.PriceRange && (
        <MultiRangeSlider
          newMin={newMin}
          newMax={newMax}
          setNewMin={setNewMin}
          setNewMax={setNewMax}
          restaurantsPrices={restaurantsPrices}
        />
      )}
      {isPopupsOpen.Distance && (
        <SingleDistanceSlider
          newDistance={newDistance}
          setNewDistance={setNewDistance}
          maxDistance={maxDistance}
        />
      )}
      {isPopupsOpen.Rating && <RangeFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />}
    </div>
  );
};

export default RestaurantsHeader;
