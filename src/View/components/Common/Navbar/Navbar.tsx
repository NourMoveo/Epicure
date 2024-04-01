import React, { useState, useEffect, useRef } from "react";
import {
  HamburMenu,
  LogoWithoutName,
  SearchIcon,
  UserIcon,
  BagIcon,
  ExitIcon,
} from "@/View/Photos";
import "./Navbar.scss";
import { MenuPopup, SearchPopup, ShoppingBagPopup, SignInPopup } from "@/View/components"; // Import UserPopup
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/Controller/redux/store/store";

const Navbar: React.FC = () => {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isBagPopupOpen, setIsBagPopupOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false); // State for user popup
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const navbarRef = useRef<HTMLDivElement>(null);
  const totalQuantity = useSelector((state: RootState) => state.dishOrderPage.totalQuantity);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
      if (window.innerWidth > 768) {
        closePopups();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        closePopups();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopup = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    closePopups(); // Close all other popups
    setter(prevState => !prevState);
  };

  const closePopups = () => {
    setIsMenuPopupOpen(false);
    setIsSearchPopupOpen(false);
    setIsBagPopupOpen(false);
    setIsUserPopupOpen(false); // Close user popup
  };

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    closePopups(); // Close all popups when a link is clicked
  };

  const handleBagIconClick = () => {
    setIsBagPopupOpen(prevState => !prevState); // Toggle bag popup
  };

  const handleUserIconClick = () => {
    setIsUserPopupOpen(prevState => !prevState); // Toggle user popup
  };

  return (
    <header className="navbar-container" ref={navbarRef}>
      {(isMenuPopupOpen || isSearchPopupOpen) && !isDesktop && (
        <div className="sub-navbar">
          <button
            className="exit-icon"
            onClick={closePopups} // Close all popups when exit icon is clicked
          >
            <img className="exit-icon" src={ExitIcon} alt="Exit" />
            <div className="search-popup-title">
              {isSearchPopupOpen && <span>Search</span>}
            </div>
          </button>
        </div>
      )}
      <div className="navbar-left">
        <button className="navbar-hamburger-menu" onClick={() => togglePopup(setIsMenuPopupOpen)}>
          <img className="navbar-icon-left-menu" src={HamburMenu} alt="Menu" />
        </button>
        <button className="navbar-logo" >
          <Link to="/">
            <img
              className="navbar-icon-left-logo"
              src={LogoWithoutName}
              alt="Epicure Logo"
            />
          </Link>
        </button>
        <div className="navbar-links">
          <div className='big-link'>
            <Link to="/" onClick={() => handleLinkClick("EPICURE")} className="navbar-link">EPICURE</Link>
          </div>
          <div className={`small-link ${activeLink === "Restaurants" ? "active" : ""}`}>
            <Link to="/restaurants" onClick={() => handleLinkClick("Restaurants")} className="navbar-link">Restaurants</Link>
          </div>
          <div className={`small-link ${activeLink === "Chefs" ? "active" : ""}`}>
            <Link to="/chefs" onClick={() => handleLinkClick("Chefs")} className="navbar-link">Chefs</Link>
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <div className="right-icons">
          <div className="desktop-searchbar">
            {isDesktop && (
              <div
                className="animated-search-bar"
                onClick={() => togglePopup(setIsSearchPopupOpen)}
              >
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search for a restaurant, cuisine and chef"
                />
                <img className="navbar-icon" src={SearchIcon} alt="Search" />
              </div>
            )}
          </div>
          {!isDesktop && (
            <img
              className="navbar-icon"
              src={SearchIcon}
              alt="Search"
              onClick={() => togglePopup(setIsSearchPopupOpen)}
            />
          )}
          <img
            className="navbar-icon"
            src={UserIcon}
            alt="User Account"
            onClick={handleUserIconClick} // Open user popup on user icon click
          />
          <img
            className="navbar-icon"
            src={BagIcon}
            alt="Shopping Bag"
            onClick={handleBagIconClick}
          />
          {totalQuantity > 0 && (<span className="bag-quantity">
            <span>{totalQuantity}</span>
          </span>)}
        </div>
      </div>
      {isMenuPopupOpen && (
        <MenuPopup isOpen={isMenuPopupOpen} togglePopup={() => togglePopup(setIsMenuPopupOpen)} />
      )}
      {!isDesktop && isSearchPopupOpen && (
        <SearchPopup
          isOpen={isSearchPopupOpen}
          togglePopup={() => togglePopup(setIsSearchPopupOpen)}
        />
      )}
      {isBagPopupOpen && <ShoppingBagPopup isOpen={isBagPopupOpen} />}
      {isUserPopupOpen && <SignInPopup isOpen={isUserPopupOpen} />} {/* Render UserPopup */}
    </header>
  );
};

export default Navbar;
