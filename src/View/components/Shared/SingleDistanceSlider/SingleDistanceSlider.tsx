import { FC } from "react";
import "./SingleDistanceSlider.scss";
interface SingleDistanceSliderProps {
    newDistance: number;
    maxDistance: number;
    setNewDistance: (distance: number) => void;
}
const SingleDistanceSlider: FC<SingleDistanceSliderProps> = ({ newDistance, maxDistance, setNewDistance }) => (
    <div id="Distance" className={`distance-popup-container ${(newDistance !== maxDistance ? 'popup-open-clear' : 'popup-open')}`}>
        <div className="distance-popup-title">Distance</div>
        <div className="distance-container" id="Distance">
            <div className="distance-slider" id="Distance">
                <div className="distance-slider__track"></div>
                <div className={`distance-slider__left-value ${newDistance !== maxDistance && "distance-slider__left-value--orange"}`}>
                    <div className="distance-left-circle"></div>
                    <div className="distance-min-value">My location</div>
                </div>
                <input
                    id="Distance"
                    type="range"
                    min={0.1}
                    max={maxDistance}
                    value={newDistance}
                    step={0.1}
                    onChange={(event) => setNewDistance(parseFloat(event.target.value))}
                    className="distance-thumb distance-thumb--zindex-4"
                />
                <div className={`distance-slider__right-value ${newDistance !== maxDistance && "distance-slider__right-value--orange"}`}>
                    <div className="distance-max-value">{newDistance}km</div>
                </div>
                {newDistance !== maxDistance && <button id="clear" className="distance-clear-button" onClick={() => setNewDistance(maxDistance)}>Clear</button>}
            </div>
        </div>
    </div>
);


export default SingleDistanceSlider;
