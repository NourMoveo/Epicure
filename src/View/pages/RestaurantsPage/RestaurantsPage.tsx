import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Controller/redux/store/store";
import { fetchRestaurantsPageData } from "../../../Controller/redux/thunks/restaurantsPageThunk";
import { Map, LoadingGif ,SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
import { setIsHomePage } from "@/Controller/redux/slices/homePageSlice";
import { setData, setFirstFilter, setPage, setSecondFilter } from "@/Controller/redux/slices/restaurantsPageSlice";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";
import { Restaurant } from "@/Model/Interfaces";
const DishOrderPopup = React.lazy(() => import("@/View/components/Common/PopUps/dishOrderPopup/dishOrderPopup"));
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));

const RestaurantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");
  const [isMapView, setIsMapView] = useState(false);
  const [activeAdditionalButton, setActiveAdditionalButton] = useState<string | null>(null);
  const { isModalOpen } = useSelector((state: RootState) => state.homePage);
  const { data, page, limit, max, min, distance, selectedRating, firstFilter, secondFilter } = useSelector((state: RootState) => state.restaurantsPage);

  const [pastButton, setPastButton] = useState("All");


  const handleButtonClick = async (buttonName: string) => {

    if (isMainButton(buttonName)) {
      dispatch(setFirstFilter(buttonName));
      setActiveButton(buttonName);
    } else {
      dispatch(setSecondFilter(buttonName));
    }
    setIsMapView(buttonName === "MapView");
    setIsLoading(true); // Set loading state to true while fetching data

    try {
      let newData: any[] = [];
      switch (buttonName) {
        case "All":
          newData = await restaurantAPI.getAllRestaurants(page, limit);
          dispatch(setData(newData));
          break;
        case "New":
          newData = await restaurantAPI.getNewRestaurants(page, limit);
          dispatch(setData(newData));
          break;
        case "MostPopular":
          newData = await restaurantAPI.getPopularRestaurants(page, limit);
          dispatch(setData(newData));
          break;
        case "OpenNow":
          newData = await restaurantAPI.getOpenNowRestaurants(page, limit);
          dispatch(setData(newData));
          break;
      }
      switch (activeAdditionalButton) {
        case "PriceRange":
          newData = await restaurantAPI.getRestaurantsByPriceRange(page, limit, min, max, firstFilter);
          break;
        case "Distance":
          newData = await restaurantAPI.getRestaurantsByDistance(page, limit, distance, firstFilter);
          break;
        case "Rating":
          newData = await restaurantAPI.getRestaurantsByRatings(page, limit, selectedRating, firstFilter);
          break;
      }

      // Dispatch action to update the data in the Redux store
      if (buttonName === pastButton) {
        if (newData.length > 0) {
          if ((newData[newData.length-1] as Restaurant).title != (data[data.length-1]).title) {
            dispatch(setData(data.concat(newData)));
          } else {
            dispatch(setData(data));
          }

        }

      } else {
        if (newData.length > 0) {
          dispatch(setData(newData));
        }
        dispatch(setPage(0));
        setPastButton(buttonName);
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      // Set loading state to false after fetching data
      setIsLoading(false);
    }
  };

  const handleAdditionalButtonClick = (buttonName: string) => {
    if (isAdditionalButton(buttonName)) {
      setActiveAdditionalButton(buttonName);
    }
  };

  const isMainButton = (buttonName: string) => {
    const mainButtons = ["All", "New", "MostPopular", "OpenNow", "MapView"];
    return mainButtons.includes(buttonName);
  };

  const isAdditionalButton = (buttonName: string) => {
    const additionalButtons = ["PriceRange", "Distance", "Rating"];
    return additionalButtons.includes(buttonName);
  };

  useEffect(() => {
    setIsHomePage(false);
    // Fetch initial data
    dispatch(fetchRestaurantsPageData({ page, limit }))
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error fetching home page data:", error);
        setIsLoading(false);
      });

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        handleButtonClick(activeButton);
        dispatch(setPage(page));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, page, limit, activeButton]);

  // Listen for changes in data to update isLoading state
  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  return (
    <div className="restaurants-page">
      <Suspense fallback={renderLoading()}>
        <h2 className="restaurant-header">Restaurants</h2>
        <RestaurantsHeader
          onButtonClick={handleButtonClick}
          onAdditionalButtonClick={handleAdditionalButtonClick}
        />
        <div className="container-content">
          {renderContent()}
        </div>
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

  function renderContent() {
    return (
      <>
        {isMapView ? (
          <div className="map-image-container">
            <img className="map-img" src={Map} alt="Map" />
          </div>
        ) : (
          <div className="cards">
            {isLoading ? (
              renderLoading()
            ) :
              data && data.length > 0 ?
                (
                  <CustomCardsSection
                    cardsData={data}
                    cardType={1}
                    pageType={2}
                    layoutDirection="vertical"
                  />
                )
                :(
                  <div className="empty-data-message">
                    <p>No restaurants found.</p>
                    <img className="sad-chef" src={SadChefIcon}/>
                  </div>
                  
                )}
          </div>
        )}
      </>
    );
  }
};

export default RestaurantsPage;
