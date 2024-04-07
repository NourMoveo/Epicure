import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Controller/redux/store/store";
import { Map, LoadingGif, SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
import { setData } from "@/Controller/redux/slices/restaurantsPageSlice";
import { fetchRestaurantsPageData } from "@/Controller/redux/thunks/restaurantsPageThunk";
import { useDispatch } from "react-redux";
import { RestaurantsHeader } from "@/View/components";
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
// const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));
interface PopupsState {
  [key: string]: boolean;
  PriceRange: boolean;
  Distance: boolean;
  Rating: boolean;
}

const RestaurantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { restaurantsDistances, restaurantsPrices } = useSelector(
    (state: RootState) => state.homePage
  );
  const { Restaurants, limit, data } = useSelector(
    (state: RootState) => state.restaurantsPage
  );

  const MAX_DISTANCE = Math.max(...restaurantsDistances);
  const MIN_PRICE = Math.min(...restaurantsPrices);
  const MAX_PRICE = Math.max(...restaurantsPrices);

  const [primaryButton, setPrimaryButton] = useState("All");
  const [secondaryButton, setSecondaryButton] = useState("");
  const [newDistance, setNewDistance] = useState(MAX_DISTANCE);
  const [newMin, setNewMin] = useState(MIN_PRICE);
  const [newMax, setNewMax] = useState(MAX_PRICE);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupsOpen, setIsPopupsOpen] = useState<PopupsState>({
    PriceRange: false,
    Distance: false,
    Rating: false,
  });
  const page = Math.ceil(data.length / limit) + 1;
  const restaurantCardsRef = useRef<HTMLDivElement>(null);

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



  const fetchData = async () => {
    try {
      const data1: any = (await dispatch(fetchRestaurantsPageData({
        page, limit, newMax, newMin, newDistance, selectedRating, primaryButton,
        secondary: secondaryButton
      }))).payload;
      return data1.Restaurants;
    } catch (error) {
      console.error("Error fetching restaurants page data:", error);
      return [];
    }
  };

  // useEffect(() => {
  //   const fetchDataAsync = async () => {
  //     dispatch(setPage(1));

  //     dispatch(setData([]));
  //     const data = await fetchData();
  //     dispatch(setData(data));
  //     // dispatch(setPage(Math.ceil(data.length / limit) + 1));
  //   };
  //   fetchDataAsync();
  //   // setPage(Math.ceil(data.length / limit) + 1)
  // }, [primaryButton, newMax, newMin, newDistance, selectedRating]);

  useEffect(() => {
    console.log("page= , ", page)
    const fetchDataAsync = async () => {
      dispatch(setData([]));
      const data = await fetchData();
      dispatch(setData(data));
    };
    fetchDataAsync();
    // setPage(page + 1);
  }, [primaryButton, newMax, newMin, newDistance, selectedRating]);


  useEffect(() => {

    const handleScroll = async () => {

      if (!element) {
        return;
      }
      if (element.scrollTop + element.clientHeight > element.scrollHeight - 1 && element.scrollTop + element.clientHeight != element.scrollHeight - 1) {
        console.log("data ?: ,", page)
        dispatch(setData(data.concat(await fetchData())));
      }
    };
    const element = restaurantCardsRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      // Disable body scroll when scrolling within restaurant-cards
      return () => {
        element.removeEventListener("scroll", handleScroll);
        // Enable body scroll when component unmounts
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
            <div className="restaurant-cards">
              {/* {page == 1 && primaryButton == "All" ? (
                <CustomCardsSection cardsData={Restaurants} cardType={1} pageType={2} layoutDirection="vertical" />
              )
                :  */}
              {data && data.length > 0 ? (
                <>
                  <CustomCardsSection cardsData={data} cardType={1} pageType={2} layoutDirection="vertical" />
                  {/* {data && renderNoMoreData()} */}
                </>
              ) : (

                renderLoading()

              )}
            </div>
          )}
        </div>
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
};

export default RestaurantsPage;
