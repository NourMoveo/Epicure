import { ChangeEvent, FC } from "react";
import "./SingleDistanceSlider.scss";
interface SingleDistanceSliderProps {
    newDistance: number;
    setNewDistance: (distance: number) => void;
}
const SingleDistanceSlider: FC<SingleDistanceSliderProps> = ({ newDistance, setNewDistance }) => {
    const maxDistance = 4;
    const handleSliderChange =
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setNewDistance(parseFloat(value));
            console.log("Selected distance:", value);
        }
    return (
        <div className={`distance-popup-container ${(newDistance !== maxDistance ? 'popup-open-clear' : 'popup-open')}`}>
            <div className="distance-popup-title">Distance</div>
            <div className="distance-container">
                <div className="distance-slider">
                    <div className="distance-slider__track"></div>
                    <div className={`distance-slider__left-value ${newDistance !== maxDistance && "distance-slider__left-value--orange"}`}>
                        <div className="distance-left-circle"></div>
                        <div className="distance-min-value">My location</div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={4}
                        step={0.1}
                        value={newDistance}
                        onChange={handleSliderChange}
                        className="distance-thumb distance-thumb--zindex-4"
                    />
                    <div className={`distance-slider__right-value ${newDistance !== maxDistance && "distance-slider__right-value--orange"}`}>
                        <div className="distance-max-value">{newDistance}km</div>
                    </div>
                    {newDistance !== maxDistance && <button className="distance-clear-button" onClick={() => setNewDistance(maxDistance)}>Clear</button>}
                </div>
            </div>
        </div>
    );
};

export default SingleDistanceSlider;
