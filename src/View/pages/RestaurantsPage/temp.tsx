import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Controller/redux/store/store";
import { fetchRestaurantsPageData } from "../../../Controller/redux/thunks/restaurantsPageThunk";
import { Map, LoadingGif, SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
import {
  setAllRestaurantsData,
  setData,
  setFirstFilter,
  setLimit,
  setNewData,
  setPage,
  setSecondFilter,
} from "@/Controller/redux/slices/restaurantsPageSlice";
import { Restaurant } from "@/Model/Interfaces";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";
const DishOrderPopup = React.lazy(() => import("@/View/components/Common/PopUps/dishOrderPopup/dishOrderPopup"));
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));

const RestaurantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");
  const [isNewData, setNewData] = useState(true);
  const [isMapView, setIsMapView] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isModalOpen } = useSelector((state: RootState) => state.homePage);

  const { allRestaurants, newRestaurants, popularRestaurants, openNowRestaurants, restaurantsByDistance, restaurantsByPriceRange, restaurantsByRatings, data, firstFilter, distance, min, max, selectedRating } = useSelector(
    (state: RootState) => state.restaurantsPage
  );
  const { page, limit } = useSelector((state: RootState) => state.restaurantsPage);

  const handleButtonClick = async (buttonName: string) => {
    dispatch(setFirstFilter(buttonName));
    setActiveButton(buttonName);
    dispatch(setPage(1));
    if (buttonName === "MapView") {
      setIsMapView(true);
    } else {
      setIsMapView(false);
    }
  };

  const handleAdditionalButtonClick = async (buttonName: string) => {
    dispatch(setSecondFilter(buttonName));
    setActiveButton(buttonName);
    dispatch(setPage(1));
  };

  const fetchData = async () => {
    setIsLoading(true); // Start loading
    try {
      let res: Restaurant[] = [];
      switch (activeButton) {
        case "All":
          res = allRestaurants;
          break;
        case "New":
          res = newRestaurants;
          break;
        case "MostPopular":
          res = popularRestaurants;
          break;
        case "OpenNow":
          res = openNowRestaurants;
          break;
        case "PriceRange":
          res = restaurantsByPriceRange;
          break;
        case "Distance":
          res = restaurantsByDistance;
          break;
        case "Rating":
          res = restaurantsByRatings;
          break;
        default:
          break;
      }
      if (res.length > 0) {
        dispatch(setData(res));
      } 
      dispatch(setData(res));
      setIsLoading(false); // Stop loading
      return res;
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Stop loading on error
      return [];
    }
  };

  const nextData = async () => {
    setIsLoadingMore(true); // Start loading more
    dispatch(setLimit(limit*(page + 1)));
  };

  useEffect(() => {
    if (isLoadingMore) {
      fetchData().then(() => setIsLoadingMore(false)); // Stop loading more after fetching data
    } else {
      dispatch(fetchRestaurantsPageData({ page, limit, firstFilter, distance, min, max, selectedRating }))
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Error fetching restaurants page data:", error);
          setIsLoading(false);
        });    
    }
  }, [activeButton, limit, isLoadingMore]);

  return (
    <div className="restaurants-page">
      <Suspense fallback={renderLoading()}>
        <h2 className="restaurant-header">Restaurants</h2>
        <RestaurantsHeader
          onButtonClick={handleButtonClick}
          onAdditionalButtonClick={handleAdditionalButtonClick}
        />
        <div className="container-content">{renderContent()}</div>
        {isModalOpen && <DishOrderPopup />}
      </Suspense>
    </div>
  );

  function renderLoading() {
    return (
      <div className="loading-spinner">
        <img className="loading" src={LoadingGif} alt="Loading..." />
      </div>
    );
  }

  function renderNoMoreData() {
    return (
      <div className="no-more-data">
        <div className="empty-data-message">
          <p>No more restaurants.</p>
        </div>
      </div>
    );
  }

  function renderContent() {
    return (
      <>
        {isMapView ? (
          <div className="map-image-container">
            <img className="map-img" src={Map} alt="Map" />
          </div>
        ) : (
          <div className="cards">
            {isLoading? (
              renderLoading()
            ): activeButton=="All" ?(
              <CustomCardsSection cardsData={allRestaurants} cardType={1} pageType={2} layoutDirection="vertical" />
            ): activeButton=="New" ?(
              <CustomCardsSection cardsData={newRestaurants} cardType={1} pageType={2} layoutDirection="vertical" />
            ): activeButton=="MostPopular" ?(
              <CustomCardsSection cardsData={popularRestaurants} cardType={1} pageType={2} layoutDirection="vertical" />
            ): activeButton=="OpenNow" ?(
              <CustomCardsSection cardsData={openNowRestaurants} cardType={1} pageType={2} layoutDirection="vertical" />
            ):activeButton=="PriceRange" ?(
              
              <CustomCardsSection cardsData={restaurantsByPriceRange} cardType={1} pageType={2} layoutDirection="vertical" />
            ):activeButton=="Distance" ?(
              <CustomCardsSection cardsData={restaurantsByDistance} cardType={1} pageType={2} layoutDirection="vertical" />
            ):activeButton=="Rating" ?(
              <CustomCardsSection cardsData={restaurantsByRatings} cardType={1} pageType={2} layoutDirection="vertical" />
            ):isNewData ? (
              renderNoMoreData()
            ) : (
               renderLoading()
            )}
            <div className="next-prev-button">
              <button className="load-more" onClick={nextData} disabled={page === 0 || isLoadingMore}>
                {isLoadingMore ? "Loading..." : "Load More"}
              </button>
              
            </div>
          </div>
        )}
      </>
    );
  }
};

export default RestaurantsPage;
