import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Controller/redux/store/store";
import { fetchRestaurantsPageData } from "../../../Controller/redux/thunks/restaurantsPageThunk";
import { Map, LoadingGif, SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
import { setIsHomePage } from "@/Controller/redux/slices/homePageSlice";
import { setData, setFirstFilter, setNewData, setPage, setSecondFilter } from "@/Controller/redux/slices/restaurantsPageSlice";
import { Restaurant } from "@/Model/Interfaces";
const DishOrderPopup = React.lazy(() => import("@/View/components/Common/PopUps/dishOrderPopup/dishOrderPopup"));
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));

const RestaurantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");
  const [pastButton, setPastButton] = useState("All");
  const [isMapView, setIsMapView] = useState(false);
  const [activeAdditionalButton, setActiveAdditionalButton] = useState<string | null>(null);
  const { isModalOpen } = useSelector((state: RootState) => state.homePage);
  const { newData, allRestaurants, newRestaurants, openNowRestaurants, popularRestaurants, restaurantsByDistance, restaurantsByPriceRange, restaurantsByRatings, data, page, limit, max, min, distance, selectedRating, firstFilter, secondFilter } = useSelector((state: RootState) => state.restaurantsPage);

  const getDataByButton = async (buttonName: string): Promise<Restaurant[]> => {
    console.log("buttonName  :", buttonName);
    console.log("pageeeee ---------- : , ", page)
    let temp: any[] = [];
    switch (buttonName) {
      case "All":
        temp = allRestaurants;
        break;
      case "New":
        temp = newRestaurants;
        break;
      case "MostPopular":
        temp = popularRestaurants;
        break;
      case "OpenNow":
        temp = openNowRestaurants;
        break;
      case "PriceRange":
        temp = restaurantsByPriceRange;
        break;
      case "Distance":
        temp = restaurantsByDistance;
        break;
      case "Rating":
        temp = restaurantsByRatings;
        break;
    }
    console.log("in the temppppp , ",temp)
    return temp;
  }

  const handleButtonClick = async (buttonName: string) => {
    setPastButton(activeButton);
    dispatch(setFirstFilter(buttonName));
    setActiveButton(buttonName);
    dispatch(setData(await getDataByButton(activeButton)));
  };

  const handleAdditionalButtonClick = async (buttonName: string) => {
    setPastButton(activeButton);
    dispatch(setSecondFilter(buttonName));
    setActiveButton(buttonName);
    dispatch(setData(await getDataByButton(activeButton)));
  };


  useEffect(() => {
    dispatch(fetchRestaurantsPageData({ page, limit, firstFilter, distance, min, max, selectedRating }))
      .then(() => {
        setIsLoading(false);})
        let temp: any[] = [];
        switch (activeButton) {
          case "All":
            temp = allRestaurants;
            break;
          case "New":
            temp = newRestaurants;
            break;
          case "MostPopular":
            temp = popularRestaurants;
            break;
          case "OpenNow":
            temp = openNowRestaurants;
            break;
          case "PriceRange":
            temp = restaurantsByPriceRange;
            break;
          case "Distance":
            temp = restaurantsByDistance;
            break;
          case "Rating":
            temp = restaurantsByRatings;
            break;
        }
        dispatch(setData(temp));
      })
      .catch((error) => {
        console.error("Error fetching home page data:", error);
      });
    const handleScroll = async () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      console.log("before scroll data", data)
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        dispatch(setPage(page));
        console.log("await getDataByButton(activeButton)  ,",await getDataByButton(activeButton))
        
        if(pastButton==activeButton){
          
          dispatch(setData(data.concat(await getDataByButton(activeButton))));
          console.log("after scroll data ", data)
        }else{
          dispatch(setData(data.concat(await getDataByButton(activeButton))));
        }
        
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, limit, activeButton]);


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
              <>
                {console.log("CustomCardsSection data", data)}
                {console.log("CustomCardsSection newData", newData)}
                <CustomCardsSection
                  cardsData={data}
                  cardType={1}
                  pageType={2}
                  layoutDirection="vertical"
                />

                {newData && newData.length > 0 && (
                  <CustomCardsSection
                    cardsData={newData}
                    cardType={1}
                    pageType={2}
                    layoutDirection="vertical"
                  />
                )}
              </>
            )
              : (
                <div className="empty-data-message">
                  {/* <p>No restaurants found.</p>
                <img className="sad-chef" src={SadChefIcon} alt="Sad chef" /> */}
                </div>
              )
            }
          </div>
        )}
      </>
    );
  }
};

export default RestaurantsPage;
