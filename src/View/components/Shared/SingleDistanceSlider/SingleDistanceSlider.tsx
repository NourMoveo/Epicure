import React, { ChangeEvent, FC, useEffect, useState, useRef } from "react";
import "./SingleDistanceSlider.scss";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Controller/redux/store/store";
import { setData, setDistance } from "@/Controller/redux/slices/restaurantsPageSlice";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";

interface SingleDistanceSliderProps {
    maxDistance: number;
    isOpen: boolean;
    togglePopup: () => void;
}

const SingleDistanceSlider: FC<SingleDistanceSliderProps> = ({ maxDistance, isOpen, togglePopup }) => {
    const popupClassName = isOpen ? 'distance-popup open' : 'distance-popup';
    const [maxVal, setMaxVal] = useState(maxDistance);
    const [valuesChanged, setValuesChanged] = useState(false);
    const [isRangeChanged, setIsRangeChanged] = useState(false);
    const { restaurantsDistances,firstFilter,secondFilter,page,limit } = useSelector((state: RootState) => state.restaurantsPage);
    const dispatch = useDispatch();

    const range = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRangeChanged) {
            togglePopupHeight(12);
        } else {
            togglePopupHeight(9.5);
        }
    }, [isRangeChanged]);

    const togglePopupHeight = (height: number) => {
        const popupContainer = document.querySelector('.distance-popup-container') as HTMLElement;
        if (popupContainer) {
            popupContainer.style.height = `${height}vw`;
        }
    };

    const getPercent = (value: number) => {
        if (value === 0) return 0;
        const maxDistanceIndex = restaurantsDistances.length - 1;
        const maxDistanceValue = restaurantsDistances[maxDistanceIndex];
        return Math.round((value / maxDistanceValue) * 100);
    };

    useEffect(() => {
        if (range.current) {
            const maxPercent = getPercent(maxVal);
            range.current.style.width = `${maxPercent}%`;
        }
    }, [maxVal]);

    useEffect(() => {
        setValuesChanged(maxVal !== maxDistance);
        setIsRangeChanged(maxVal !== maxDistance);
    }, [maxVal, maxDistance]);

    const handleClear = async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setMaxVal(maxDistance);
        setValuesChanged(false);
        setIsRangeChanged(false);
    };

    const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); // Prevent popup from closing when clicking inside it
    };

    const handleSliderChange = async (value: number) => {
        try {
            setMaxVal(value);
            dispatch(setDistance(value));
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            // Handle error if necessary
        }
    };
    return (
        <div className="distance-popup-container" onClick={togglePopup}>
            <div className="distance-popup-title">Distance</div>
            <div className="distance-container" onClick={handleSliderClick}>
                <div className="distance-slider">
                    <div className="distance-slider__track"></div>
                    <div ref={range} className="distance-slider__range"></div>
                    <div className={classnames("distance-slider__left-value", { "distance-slider__left-value--orange": valuesChanged })}>
                        <div className="distance-left-circle"></div> 
                        <div className="distance-min-value">My location</div>
                    </div>

                    <input
                        type="range"
                        min={0}
                        max={restaurantsDistances[restaurantsDistances.length - 1]}
                        step={0.1} // Set step to 0.1
                        value={maxVal}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const value = Math.min(Math.max(+event.target.value, 0.1), restaurantsDistances[restaurantsDistances.length - 1]); // Ensure the value is within the range of the distances array
                            handleSliderChange(value); // Call handleSliderChange with the new value
                            event.target.value = value.toString();

                            if (!event.target.classList.contains('distance-thumb--orange')) {
                                event.target.classList.add('distance-thumb--orange');
                            }
                        }}
                        className="distance-thumb distance-thumb--zindex-4"
                    />
                    <div className={classnames("distance-slider__right-value", { "distance-slider__right-value--orange": valuesChanged })}>
                        <div className="distance-max-value">{maxVal}km</div>
                    </div>
                    {valuesChanged && <button className="distance-clear-button" onClick={handleClear}>Clear</button>}
                </div>
            </div>
        </div>
    );
};

export default SingleDistanceSlider;
