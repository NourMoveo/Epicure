import React, { ChangeEvent, FC, useEffect } from "react";
import "./SingleDistanceSlider.scss";


interface SingleDistanceSliderProps {
    maxDistance: number;
    isOpen: boolean;
    togglePopup: () => void;
    newDistance: number;
    setNewDistance: (buttonName: number) => void;
    isPopupsOpen: any;
}

const SingleDistanceSlider: FC<SingleDistanceSliderProps> = ({ maxDistance, togglePopup, newDistance, setNewDistance, isPopupsOpen }) => {
    // const range = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (range.current) {
            const maxPercent = (newDistance === 0) ? 0 : Math.round((newDistance / 4) * 4);
            range.current.style.width = `${maxPercent}%`;
        }
    }, [newDistance, maxDistance]);

    const handleSliderChange =
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setNewDistance(parseInt(value));
            console.log("Selected distance:", value); // Log the selected distance
        }


    return (
        <div className={`distance-popup-container ${isPopupsOpen.Distance && (newDistance !== maxDistance ? 'popup-open-clear' : 'popup-open')}`} onClick={togglePopup}>
            <div className="distance-popup-title">Distance</div>
            <div className="distance-container">
                <div className="distance-slider">
                    <div className="distance-slider__track"></div>
                    <div className="distance-slider__range"></div>
                    {/* <div ref={range} className="distance-slider__range"></div> */}
                    <div className={`distance-slider__left-value ${newDistance !== maxDistance && "distance-slider__left-value--orange"})`}>
                        <div className="distance-left-circle"></div>
                        <div className="distance-min-value">My location</div>
                    </div>

                    <input
                        type="range"
                        min={0}
                        max={4}
                        step={0.1} // Set step to 0.1
                        value={newDistance}
                        onChange={handleSliderChange}
                        className="distance-thumb distance-thumb--zindex-4"
                    />
                    <div className={`distance-slider__right-value ${newDistance !== maxDistance && "distance-slider__right-value--orange"})`}>
                        <div className="distance-max-value">{newDistance}km</div>
                    </div>
                    {newDistance !== maxDistance && <button className="distance-clear-button" onClick={() => setNewDistance(maxDistance)}>Clear</button>}
                </div>
            </div>
        </div>
    );
};

export default SingleDistanceSlider;
