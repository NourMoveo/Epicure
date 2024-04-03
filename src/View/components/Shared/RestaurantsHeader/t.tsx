import React, { useState, useEffect, useRef } from "react";
import "./RestaurantsHeader.scss";
import { DownArrow } from "@/View/Photos";
import { MultiRangeSlider, SingleDistanceSlider, RangeFilter } from "../..";

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
    primaryButton: string
    setPrimaryButton: (buttonName: string) => void;
    secondaryButton: string
    setSecondaryButton: (buttonName: string) => void;
    newDistance: number;
    setNewDistance: (buttonName: number) => void;
    newMin: number,
    newMax: number,
    setNewMin: (min: number) => void,
    setNewMax: (max: number) => void,
    selectedRating: number[],
    setSelectedRating: (selectedRating: number[]) => void;
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

const RestaurantsHeader: React.FC<RestaurantsHeaderProps> = ({ primaryButton, setPrimaryButton, secondaryButton, setSecondaryButton, newDistance, setNewDistance, newMin, newMax, setNewMax, setNewMin, selectedRating, setSelectedRating }) => {
    const [isSecondaryFilterOpen, setIsSecondaryFilterOpen] = useState<boolean>(false);
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
            setIsSecondaryFilterOpen(false);
        } else {
            setSecondaryButton(buttonName);
            setIsSecondaryFilterOpen((prevState) => !prevState);
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



    const handleDoubleClick = () => {
        setSecondaryButton("");
        setIsSecondaryFilterOpen(false);
    };

    return (
        <div className="header-container">
            <div className="restaurants-header">
                {primaryFilterButtons.map(({ name, label }) => (
                    <button
                        key={name}
                        className={primaryButton === name ? "active" : name}
                        onClick={() => handleClick(name, true)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="button-wrapper" >
                {secondaryFilterButtons.map(({ name, label }) => (
                    <button
                        key={name}
                        id={name}
                        className={`additional-button ${secondaryButton === name ? "active" : ""}`}
                        onClick={() => handleClick(name, false)}
                        onDoubleClick={() => handleDoubleClick()}
                    >
                        {label} <img src={DownArrow} alt="Down Arrow" className="arrow-icon" />
                    </button>
                ))}
            </div>
            {isPopupsOpen.PriceRange && isSecondaryFilterOpen && (
                <MultiRangeSlider
                    newMin={newMin}
                    newMax={newMax}
                    setNewMin={setNewMin}
                    setNewMax={setNewMax}
                />
            )}
            {isPopupsOpen.Distance && isSecondaryFilterOpen && (
                <SingleDistanceSlider
                    newDistance={newDistance}
                    setNewDistance={setNewDistance}
                />
            )}
            {isPopupsOpen.Rating && isSecondaryFilterOpen && <RangeFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />}
        </div>
    );
};

export default RestaurantsHeader;
