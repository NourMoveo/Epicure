import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/Controller/redux/store/store";
import { getFlavorIcon } from "@/Controller/utils/getSetFunc";
import { addDishOrder } from "@/Controller/redux/slices/dishOrderSlice";
import { ILSLogo } from "@/View/Photos";
import "./DishOrderCnt.scss";
import { Dish, OrderDish } from "@/Model/Interfaces";

const DishOrderContent: React.FC = () => {
  const selectedDish = useSelector((state: RootState) => state.homePage.selectedDish);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [selectedSides, setSelectedSides] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sideValue = e.target.value;
    if (e.target.checked) {
      setSelectedSides((prevSides) => [...prevSides, sideValue]);
    } else {
      setSelectedSides((prevSides) => prevSides.filter((side) => side !== sideValue));
    }
  };

  const handleChangesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changeValue = e.target.value;
    if (e.target.checked) {
      setSelectedChanges((prevChanges) => [...prevChanges, changeValue]);
    } else {
      setSelectedChanges((prevChanges) => prevChanges.filter((change) => change !== changeValue));
    }
  };

  const handleAddToBag = () => {
    if (selectedDish) {
      const dishWithDefaults: Dish = {
        _id: selectedDish._id || '',
        title: selectedDish.title || '',
        image: selectedDish.image || '',
        ingredients: selectedDish.ingredients || '',
        flavorIcon: selectedDish.flavorIcon || '',
        price: selectedDish.price || 0,
        restaurant: selectedDish.restaurant || '',
        isSignature: selectedDish.isSignature || false,
        type: selectedDish.type || '',
        dishSides: selectedSides,
        changes: selectedChanges,
      };

      // Construct newDish object
      const newDish: OrderDish = {
        dish: dishWithDefaults,
        quantity: quantity,
      };

      
      // Dispatch action to add new dish order
      dispatch(addDishOrder(newDish));
    }
  };

  const renderPopupContent = () => {
    if (!selectedDish) return null;
    return (
      <div className="popup-content">
        <div className="dish-img">
          <img src={selectedDish.image} alt="dish-image" />
        </div>
        <div className="dish-details">
          <div className="dish-title">{selectedDish.title}</div>
          <div className="dish-description">{selectedDish.ingredients}</div>
          <div className="dish-icon">
            {selectedDish.flavorIcon && (
              <img src={getFlavorIcon(selectedDish.flavorIcon)} alt="Food Icon" className="food-icon" />
            )}
          </div>
          <div className="dish-price">
            <div className="line" />
            <div className="value-logo-container">
              <img src={ILSLogo} alt="ILS" className="ils-icon" />
              <span className="price-value">{selectedDish.price}</span>
            </div>
            <div className="line" />
          </div>
          <div className="dish-side">
            <div className="side-title">Choose a side</div>
            <div className="side-choices">
              {selectedDish.dishSides?.map((dishSide, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    className="side-checkbox"
                    value={dishSide}
                    onChange={handleSideChange}
                  />
                  <div className="choose-label">{dishSide}</div>
                </label>
              ))}
            </div>
          </div>
          <div className="dish-changes">
            <div className="changes-title">Changes</div>
            <div className="side-choices">
              {selectedDish.changes?.map((dishChange, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    className="changes-checkbox"
                    value={dishChange}
                    onChange={handleChangesChange}
                  />
                  <div className="choose-label">{dishChange}</div>
                </label>
              ))}
            </div>
          </div>
          <div className="dish-quantity">
            <div className="quantity-title">Quantity</div>
            <div className="actions">
              <button className="reduce" onClick={handleDecreaseQuantity}><div className="line-reduce"/></button>
              <div className="quantity">{quantity}</div>
              <button className="add" onClick={handleIncreaseQuantity}>+</button>
            </div>
          </div>
        </div>
        <button className="add-to-bag" onClick={handleAddToBag}>ADD TO BAG</button>
      </div>
    );
  };

  return renderPopupContent();
};

export default DishOrderContent;
