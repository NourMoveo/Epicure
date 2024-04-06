import React from "react";
import "./RestaurantsHeader.scss";
import { DownArrow } from "@/View/Photos";
import { MultiRangeSlider, SingleDistanceSlider, RangeFilter } from "../..";

interface PopupsState {
  [key: string]: boolean;
}

interface RestaurantsHeaderProps {
  primaryButton: string;
  setPrimaryButton: (buttonName: string) => void;
  secondaryButton: string;
  setSecondaryButton: (buttonName: string) => void;
  maxDistance: number;
  newDistance: number;
  setNewDistance: (distance: number) => void;
  newMin: number;
  newMax: number;
  min: number;
  max: number;
  setNewMin: (min: number) => void;
  setNewMax: (max: number) => void;
  selectedRating: number[];
  setSelectedRating: (selectedRating: number[]) => void;
  isPopupsOpen: PopupsState;
  togglePopup: (name: string) => void;
}

const primaryFilterButtons = [
  { name: "All" },
  { name: "New" },
  { name: "MostPopular" },
  { name: "OpenNow" },
  { name: "MapView" },
];

const secondaryFilterButtons = [
  { name: "PriceRange" },
  { name: "Distance" },
  { name: "Rating" },
];

const RestaurantsHeader: React.FC<RestaurantsHeaderProps> = ({ primaryButton, setPrimaryButton, secondaryButton, setSecondaryButton, newDistance, maxDistance, setNewDistance, newMin, newMax, setNewMin, setNewMax, selectedRating, setSelectedRating, min, max, isPopupsOpen, togglePopup, }) => {
  return (
    <div className="header-container">
      <div className="restaurants-header">
        {primaryFilterButtons.map(({ name }) => (
          <button key={name} className={primaryButton === name ? "active" : name} onClick={() => setPrimaryButton(name)}>{name}</button>))}
      </div>
      <div className="button-wrapper">
        {secondaryFilterButtons.map(({ name }) => (
          <button key={name} id={name} className={`additional-button ${secondaryButton === name && isPopupsOpen[name] ? "active" : ""}`} onClick={() => { setSecondaryButton(name), togglePopup(name); }}>
            {name} <img src={DownArrow} alt="Down Arrow" className="arrow-icon" />
          </button>))}
      </div>
      {isPopupsOpen.PriceRange && (<MultiRangeSlider newMin={newMin} newMax={newMax} setNewMin={setNewMin} setNewMax={setNewMax} min={min} max={max} />)}
      {isPopupsOpen.Distance && (<SingleDistanceSlider newDistance={newDistance} setNewDistance={setNewDistance} maxDistance={maxDistance} />)}
      {isPopupsOpen.Rating && (<RangeFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />)}
    </div>
  );
};

export default RestaurantsHeader;
