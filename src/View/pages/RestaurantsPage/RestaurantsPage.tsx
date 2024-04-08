import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Controller/redux/store/store";
import { Map, LoadingGif, SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
import { restaurantAPI } from "@/Model/APIs/RestaurantAPI";
import { Restaurant } from "@/Model/Interfaces";
import { Fade } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { fetchRestaurantsPageData } from "@/Controller/redux/thunks/restaurantsPageThunk";
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));
interface PopupsState {
  [key: string]: boolean;
  PriceRange: boolean;
  Distance: boolean;
  Rating: boolean;
}

const RestaurantsPage = () => {
  const { restaurantsDistances, restaurantsPrices } = useSelector(
    (state: RootState) => state.homePage
  );
  const { Restaurants, limit } = useSelector(
    (state: RootState) => state.restaurantsPage
  );
  const dispatch = useDispatch<AppDispatch>();
  const MAX_DISTANCE = Math.max(...restaurantsDistances);
  const MIN_PRICE = Math.min(...restaurantsPrices);
  const MAX_PRICE = Math.max(...restaurantsPrices);

  const [primaryButton, setPrimaryButton] = useState("All");
  const [secondaryButton, setSecondaryButton] = useState("");
  const [newDistance, setNewDistance] = useState(MAX_DISTANCE);
  const [newMin, setNewMin] = useState(MIN_PRICE);
  const [newMax, setNewMax] = useState(MAX_PRICE);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [data, setData] = useState<Restaurant[]>([])
  const [nextData, setNextData] = useState<Restaurant[]>([])
  const [isPopupsOpen, setIsPopupsOpen] = useState<PopupsState>({
    PriceRange: false,
    Distance: false,
    Rating: false,
  });
  const page = Math.ceil(data.length / limit) + 1;
  const restaurantCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDataParams = {
      page: 1,
      limit: 9,
      newMax: 1,
      newMin: 1,
      newDistance: 1,
      selectedRating: [],
      primaryButton: primaryButton,
      secondary: "",
    };

    dispatch(fetchRestaurantsPageData(fetchDataParams));
  }, [dispatch, primaryButton]);

  const [isLoading, setIsLoading] = useState(true);
  const togglePopup = (name: string) => {
    const updatedState: PopupsState = {
      PriceRange: name === "PriceRange" ? !isPopupsOpen.PriceRange : false,
      Distance: name === "Distance" ? !isPopupsOpen.Distance : false,
      Rating: name === "Rating" ? !isPopupsOpen.Rating : false,
    };
    setIsPopupsOpen(updatedState);
  };

  const closeAllPopups = () => {
    setIsPopupsOpen({
      PriceRange: false,
      Distance: false,
      Rating: false,
    });
    setSecondaryButton("");
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id != "Rating" && target.id != "Distance" && target.id != "PriceRange" && target.id != "clear") {
        closeAllPopups();
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => { document.body.removeEventListener("click", handleClick) };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchDataAsync = async () => {
      setData([]);
      setIsLoading(true);
      console.log("test2, ", page);
      const data = await restaurantAPI.getFilteredRestaurants(1, limit, {
        filterBy: primaryButton,
        secondary: secondaryButton,
        ratingsArray: selectedRating,
        distance: newDistance,
        minPrice: newMin,
        maxPrice: newMax,
      });
      setData(data);
      setIsLoading(false);
      setNextData(await restaurantAPI.getFilteredRestaurants(2, limit, {
        filterBy: primaryButton,
        secondary: secondaryButton,
        ratingsArray: selectedRating,
        distance: newDistance,
        minPrice: newMin,
        maxPrice: newMax,
      }));
    };

    fetchDataAsync();
  }, [primaryButton, newMax, newMin, newDistance, selectedRating]);

  useEffect(() => {
    const handleScroll = async () => {

      if (!element) {
        return;
      }
      if (element.scrollTop + element.clientHeight > element.scrollHeight - 1 && element.scrollTop + element.clientHeight != element.scrollHeight - 1) {
        console.log("test 1  : ", page)
        setData(data.concat(await restaurantAPI.getFilteredRestaurants(page, limit, {
          filterBy: primaryButton,
          secondary: secondaryButton,
          ratingsArray: selectedRating,
          distance: newDistance,
          minPrice: newMin,
          maxPrice: newMax,
        })));
        setNextData(await restaurantAPI.getFilteredRestaurants(page + 1, limit, {
          filterBy: primaryButton,
          secondary: secondaryButton,
          ratingsArray: selectedRating,
          distance: newDistance,
          minPrice: newMin,
          maxPrice: newMax,
        }))
      }
    };
    const element = restaurantCardsRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => {
        element.removeEventListener("scroll", handleScroll);
        document.body.style.overflow = "auto";
      };
    }
  }, [data.length]);


  return (
    <div className="restaurants-page">
      <Suspense fallback={renderLoading()}>
        <h2 className="restaurant-header">Restaurants</h2>
        <RestaurantsHeader
          primaryButton={primaryButton}
          setPrimaryButton={setPrimaryButton}
          secondaryButton={secondaryButton}
          setSecondaryButton={setSecondaryButton}
          maxDistance={MAX_DISTANCE}
          newDistance={newDistance}
          setNewDistance={setNewDistance}
          newMax={newMax}
          newMin={newMin}
          setNewMin={setNewMin}
          setNewMax={setNewMax}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          min={MIN_PRICE}
          max={MAX_PRICE}
          isPopupsOpen={isPopupsOpen}
          togglePopup={togglePopup}
        />
        <div ref={restaurantCardsRef} className="container-content">
          {primaryButton === "MapView" ? (
            <div className="map-image-container">
              <img className="map-img" src={Map} alt="Map" />
            </div>
          ) : (
            <Fade>
              <div className="restaurant-cards">
                {primaryButton == "OpenNow" && Restaurants.length == 0 ? (
                  renderNoData()
                ) : page == 1 && secondaryButton == "" && Restaurants.length == 0 ? (
                  renderLoading()
                ) : page == 1 && secondaryButton == "" && Restaurants.length > 0 ? (
                  <>
                    <CustomCardsSection cardsData={Restaurants} cardType={1} pageType={2} layoutDirection="vertical" />
                  </>
                )
                  :
                  data && data.length > 0 ? (
                    <>
                      <CustomCardsSection cardsData={data} cardType={1} pageType={2} layoutDirection="vertical" />
                      {nextData.length == 0 && renderNoMoreData()}
                    </>
                  ) : isLoading ? (
                    renderLoading()
                  ) : (
                    renderNoData()
                  )}
              </div>
            </Fade>
          )}
        </div>
      </Suspense >
    </div >
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
          <p>No More Restaurants.</p>
        </div>
      </div>
    );
  }
  function renderNoData() {
    return (
      <div className="no-more-data">
        <div className="empty-data-message">
          <p>No Restaurants Found.</p>
          <img className="sad-chef" src={SadChefIcon} />
        </div>
      </div>
    );
  }
};
export default RestaurantsPage;
