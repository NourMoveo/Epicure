import { ChangeEvent, FC, useEffect, useState } from "react";
import "./MultiRangeSlider.scss";
import classnames from "classnames";
import { ILSLogo } from "@/View/Photos";
interface MultiRangeSliderProps {
  newMin: number,
  newMax: number,
  setNewMin: (min: number) => void,
  setNewMax: (max: number) => void,
  restaurantsPrices: number[]
}
const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ newMin, newMax, setNewMax, setNewMin, restaurantsPrices }) => {

  const [min, setMin] = useState(restaurantsPrices[0]);
  const [max, setMax] = useState(restaurantsPrices[restaurantsPrices.length - 1]);

  const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>, isMin: boolean) => {
    if (isMin) {
      setNewMin(parseInt(value));
      console.log("Selected minimum value:", value);
    } else {
      setNewMax(parseInt(value));
      console.log("Selected maximum value:", value);
    }
  };
  return (
    <div className={`range-popup-container ${(newMin !== min || newMax !== max ? 'range-popup-open-clear' : 'range-popup-open')}`}>
      <div className="popup-title">Price Range Selected</div>
      <div className="range-display">
        <div className="ils-icon">
          <img className="ils-icon" src={ILSLogo} alt="ILS Icon" />
        </div>
        <div className="value">
          {min}
        </div>
        <div className="mini-line">-</div>
        <div className="ils-icon">
          <img className="ils-icon" src={ILSLogo} alt="ILS Icon" />
        </div>
        <div className="value">
          {max}
        </div>
      </div>
      <div className="container" >
        <input
          type="range"
          min={min}
          max={max}
          value={newMin}
          onChange={(event) => handleInputChange(event, true)}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": newMin > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={newMax}
          onChange={(event) => handleInputChange(event, false)}
          className="thumb thumb--zindex-4"
        />
        <div className="slider">
          <div className="slider__track"></div>
          <div className="slider__range"></div>
          <div className={classnames("slider__left-value", { "slider__left-value--orange": newMin !== min || newMax !== max })}>
            <div className={classnames("ils-icon", { "ils-icon-value--orange": newMin !== min || newMax !== max })}><img className="ils-img" src={ILSLogo} alt="ILS Icon" /></div>
            <div className="min-value">{newMin}</div>
          </div>
          <div className={classnames("slider__right-value", { "slider__right-value--orange": newMin !== min || newMax !== max })}>
            <div className="ils-icon"><img src={ILSLogo} alt="ILS Icon" className="ils-img" /></div>
            <div className="max-value">{newMax}</div>
          </div>
          {(newMin !== min || newMax !== max) && <button className="clear-button" onClick={() => { setNewMin(min); setNewMax(max); }}>Clear</button>}
        </div>
      </div>
    </div>);
};

export default MultiRangeSlider;
