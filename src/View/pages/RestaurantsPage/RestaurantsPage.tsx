import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Controller/redux/store/store";
import { fetchRestaurantsPageData } from "../../../Controller/redux/thunks/restaurantsPageThunk";
import { Map, LoadingGif, SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
import { setData, setFirstFilter, setNewData, setPage, setSecondFilter } from "@/Controller/redux/slices/restaurantsPageSlice";
import { Restaurant } from "@/Model/Interfaces";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";
const DishOrderPopup = React.lazy(() => import("@/View/components/Common/PopUps/dishOrderPopup/dishOrderPopup"));
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));

const RestaurantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");
  const [pastButton, setPastButton] = useState("All");
  const [isMapView, setIsMapView] = useState(false);
  const { isModalOpen } = useSelector((state: RootState) => state.homePage);
  const { data, firstFilter, distance, min, max, selectedRating } = useSelector((state: RootState) => state.restaurantsPage);
  const { page, limit } = useSelector((state: RootState) => state.restaurantsPage);

  const handleButtonClick = async (buttonName: string) => {
    setPastButton(activeButton);
    dispatch(setFirstFilter(buttonName));
    setActiveButton(buttonName);
    dispatch(setPage(0));
    if (buttonName === "MapView") {
      setIsMapView(true);
    }
  };

  const handleAdditionalButtonClick = async (buttonName: string) => {
    setPastButton(activeButton);
    dispatch(setSecondFilter(buttonName));
    setActiveButton(buttonName);
    dispatch(setPage(0));
  };

  useEffect(() => {
    dispatch(fetchRestaurantsPageData({ page, limit, firstFilter, distance, min, max, selectedRating }))
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error fetching restaurants page data:", error);
        setIsLoading(false);
      });

    const fetchData = async () => {
      console.log("activeButton:", activeButton);
      try {
        let res: Restaurant[] = [];
        switch (activeButton) {
          case "All":
            res = await restaurantAPI.getAllRestaurants(page, limit);
            if (page === 1) {
              dispatch(setData(res));
            }
            break;
          case "New":
            res = await restaurantAPI.getNewRestaurants(page, limit);
            break;
          case "MostPopular":
            res = await restaurantAPI.getPopularRestaurants(page, limit);
            break;
          case "OpenNow":
            res = await restaurantAPI.getOpenNowRestaurants(page, limit);
            break;
          case "PriceRange":
            res = [];
            break;
          case "Distance":
            res = await restaurantAPI.getRestaurantsByDistance(page, limit, distance, firstFilter);
            break;
          case "Rating":
            console.log("selectedRating:", selectedRating);
            res = await restaurantAPI.getRestaurantsByRatings(page, limit, selectedRating, firstFilter);
            break;
          default:
            break;
        }
        console.log("page:", page, "res:", res);
        if (pastButton === activeButton) {
          console.log("buttons equal");
          if (data && data.length > 0 && res && res.length > 0) {
            if (data[data.length - 1]._id !== res[res.length - 1]._id) {
              console.log("concat");
              dispatch(setData(data.concat(res)));
            }
          }
        } else {
          dispatch(setData(res));
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    console.log("data:", data);
    fetchData();
  }, [activeButton, page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        dispatch(setPage(page + 1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

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
            ) : data && data.length > 0 ? (
              <CustomCardsSection
                cardsData={data}
                cardType={1}
                pageType={2}
                layoutDirection="vertical"
              />
            ) : (
              <div className="empty-data-message">
                <p>No restaurants found.</p>
                {/* Uncomment the line below to render the sad chef icon */}
                {/* <img className="sad-chef" src={SadChefIcon} alt="Sad chef" /> */}
              </div>
            )}
          </div>
        )}
      </>
    );
  }
};

export default RestaurantsPage;
