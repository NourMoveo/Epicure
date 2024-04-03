import React, { ChangeEvent, FC, useEffect, useState, useRef } from "react";
import "./MultiRangeSlider.scss";
import classnames from "classnames";
import { ILSLogo } from "@/View/Photos";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
  isOpen: boolean;
  togglePopup: () => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, onChange,  togglePopup }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [valuesChanged, setValuesChanged] = useState(false);
  const [isRangeChanged, setIsRangeChanged] = useState(false);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRangeChanged) {
      togglePopupHeight(14);
    } else {
      togglePopupHeight(11);
    }
  }, [isRangeChanged]);

  const togglePopupHeight = (height: number) => {
    const popupContainer = document.querySelector('.popup-container') as HTMLElement;
    if (popupContainer) {
      popupContainer.style.height = `${height}vw`;
    }
  };

  const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
    setValuesChanged(minVal !== min || maxVal !== max);
    setIsRangeChanged(minVal !== min || maxVal !== max);

    if (minVal === min && maxVal === max) {
      minValRef.current?.classList.remove('thumb--orange');
      maxValRef.current?.classList.remove('thumb--orange');
    }
  }, [minVal, maxVal, onChange, min, max]);

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMinVal(min);
    setMaxVal(max);
    setValuesChanged(false);
    setIsRangeChanged(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Stop event propagation
    const value = parseInt(event.target.value, 10);
    if (event.target === minValRef.current) {
      const newValue = Math.min(value, maxVal - 1);
      setMinVal(newValue);
      console.log("Minimum value:", newValue); // Log the updated minimum value
    } else if (event.target === maxValRef.current) {
      const newValue = Math.max(value, minVal + 1);
      setMaxVal(newValue);
      console.log("Maximum value:", newValue); // Log the updated maximum value
    }
  };
  

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent popup from closing when clicking inside it
  };

  return (
    <div className="popup-container" onClick={togglePopup}>
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
      <div className="container" onClick={handleSliderClick}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={handleInputChange}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={handleInputChange}
          className="thumb thumb--zindex-4"
        />
        <div className="slider">
          <div className="slider__track"></div>
          <div ref={range} className="slider__range"></div>
          <div className={classnames("slider__left-value", { "slider__left-value--orange": valuesChanged })}>
            <div className={classnames("ils-icon", { "ils-icon-value--orange": valuesChanged })}><img className="ils-img" src={ILSLogo} alt="ILS Icon" /></div>
            <div className="min-value">{minVal}</div>
          </div>
          <div className={classnames("slider__right-value", { "slider__right-value--orange": valuesChanged })}>
            <div className="ils-icon"><img src={ILSLogo} alt="ILS Icon" className="ils-img"/></div>
            <div className="max-value">{maxVal}</div>
          </div>
          {valuesChanged && <button className="clear-button" onClick={handleClear}>Clear</button>}
        </div>
      </div>
    </div>);
};

export default MultiRangeSlider;