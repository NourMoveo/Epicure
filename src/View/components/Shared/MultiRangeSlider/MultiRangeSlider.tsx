import React, { ChangeEvent, FC, useEffect, useState, useRef } from "react";
import "./MultiRangeSlider.scss";
import classnames from "classnames";
import { ILSLogo } from "@/View/Photos";
import { RootState } from "@/Controller/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setData, setMax,setMin, setPage, setRestaurantByPrices } from "@/Controller/redux/slices/restaurantsPageSlice";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
  isOpen: boolean;
  togglePopup: () => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, onChange, isOpen, togglePopup }) => {
  const dispatch = useDispatch();
  const popupClassName = isOpen ? 'range-price-popup open' : 'range-price-popup';
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [valuesChanged, setValuesChanged] = useState(false);
  const [isRangeChanged, setIsRangeChanged] = useState(false);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const { restaurantsPrices, restaurantByPrices, page,limit,firstFilter} = useSelector((state: RootState) => state.restaurantsPage);

  useEffect(() => {
    setMinVal(Math.min(min, ...restaurantsPrices));
    setMaxVal(Math.max(max, ...restaurantsPrices));
  }, [restaurantsPrices]);

  useEffect(() => {
    const fetchData = async () => {
      if (isRangeChanged) {
        togglePopupHeight(14);
        setRestaurantByPrices(await restaurantAPI.getRestaurantsByPriceRange(page ,limit, minVal, maxVal,firstFilter));
        dispatch(setMax(maxVal));
        dispatch(setMin(minVal));
        dispatch(setPage(1))
        
       console.log("dispatch(setMax(maxVal)); ,",max);
       console.log("dispatch(setMax(minnnnVal)); ,",min);

        // console.log("restaurantByPrices",await restaurantAPI.getRestaurantsByPriceRange(minVal, maxVal))
        console.log("Fetching restaurants with price range:", minVal, "-", maxVal);
      } else {
        togglePopupHeight(11);
      }
    };
  
    fetchData();
  }, [isRangeChanged, minVal, maxVal, dispatch]);
  
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
    setValuesChanged(minVal !== min || maxVal !== max);
    setIsRangeChanged(minVal !== min || maxVal !== max);

    if (minVal === min && maxVal === max) {
      minValRef.current?.classList.remove('thumb--orange');
      maxValRef.current?.classList.remove('thumb--orange');
    }
  }, [minVal, maxVal, onChange, min, max]);

  useEffect(() => {
    console.log("restaurantByPrices:", restaurantByPrices);
  }, [restaurantByPrices]);

  const handleClear = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMinVal(min);
    setMaxVal(max);
    setRestaurantByPrices(await restaurantAPI.getRestaurantsByPriceRange(page ,limit, minVal, maxVal,firstFilter));
    setValuesChanged(false);
    setIsRangeChanged(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Stop event propagation
    const value = parseInt(event.target.value, 10);
    // Find the nearest value in the restaurantsPrices array
    const nearestValue = restaurantsPrices.reduce((prev, curr) => (
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    ));

    if (event.target === minValRef.current) {
      // Ensure that the minimum value is less than or equal to the maximum value
      if (nearestValue <= maxVal) {
        setMinVal(nearestValue);
      } else {
        setMinVal(maxVal); // Set the minimum value to the maximum value
      }
    } else if (event.target === maxValRef.current) {
      // Ensure that the maximum value is greater than or equal to the minimum value
      if (nearestValue >= minVal) {
        setMaxVal(nearestValue);
      } else {
        setMaxVal(minVal); // Set the maximum value to the minimum value
      }
    }
  };

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent popup from closing when clicking inside it
  };

  const togglePopupHeight = (height: number) => {
    const popupContainer = document.querySelector('.popup-container') as HTMLElement;
    if (popupContainer) {
      popupContainer.style.height = `${height}vw`;
    }
  };

  return (
    <div className="popup-container" onClick={togglePopup}>
      <div className="popup-title">Price Range Selected</div>
      <div className="range-display">
        <div className="ils-icon">
          <img className="ils-icon" src={ILSLogo} alt="ILS Icon" />
        </div>
        <div className="value">
          {minVal}
        </div>
        <div className="mini-line">-</div>
        <div className="ils-icon">
          <img className="ils-icon" src={ILSLogo} alt="ILS Icon" />
        </div>
        <div className="value">
          {maxVal}
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
          list="restaurantsPricesList"
        />
        <datalist id="restaurantsPricesList">
          {restaurantsPrices.map(price => (
            <option key={price} value={price} />
          ))}
        </datalist>
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={handleInputChange}
          className="thumb thumb--zindex-4"
          list="restaurantsPricesList"
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
    </div>
  );
};

export default MultiRangeSlider;