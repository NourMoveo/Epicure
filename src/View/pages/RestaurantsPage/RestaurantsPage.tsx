import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Controller/redux/store/store";
import { Map, LoadingGif, SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
import { setData, setPage } from "@/Controller/redux/slices/restaurantsPageSlice";
import { fetchRestaurantsPageData } from "@/Controller/redux/thunks/restaurantsPageThunk";
import { useDispatch } from "react-redux";
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));

const RestaurantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Restaurants, page, limit, data } = useSelector(
    (state: RootState) => state.restaurantsPage
  );
  const { restaurantsPrices, restaurantsDistances } = useSelector(
    (state: RootState) => state.homePage
  );
  const [isLoading, setIsLoading] = useState(true);

  const [primaryButton, setPrimaryButton] = useState("All");
  const [secondaryButton, setSecondaryButton] = useState("");
  const [maxDistance, setMaxDistance] = useState(Math.max(...Restaurants.map(({ distance }: any) => distance)));
  const [newDistance, setNewDistance] = useState(maxDistance);
  const [newMin, setNewMin] = useState(Math.min(...restaurantsPrices));
  const [newMax, setNewMax] = useState(Math.max(...restaurantsPrices));
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  console.log("dis  :", newDistance)
  // useEffect(() => {
  //   dispatch(fetchHomePageData());
  // }, [dispatch]);

  useEffect(() => {
    console.log("Restaurants: ", maxDistance);
  }, [Restaurants])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        dispatch(setPage(1));
        const data1: any = (await dispatch(fetchRestaurantsPageData({
          page, limit, newMax, newMin, newDistance, selectedRating, primaryButton,
          secondary: secondaryButton
        }))).payload;
        setIsLoading(false);
        dispatch(setData(data1.Restaurants));
        // console.log("Restaurants without concat: ", data1.Restaurants);
      } catch (error) {
        console.error("Error fetching restaurants page data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, newMax, newMin, newDistance, selectedRating, primaryButton]);

  useEffect(() => {
    const handleScroll = async () => {
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
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data1: any = await dispatch(fetchRestaurantsPageData({
  //         page, limit, newMax, newMin, newDistance, selectedRating, primaryButton,
  //         secondary: secondaryButton
  //       }));
  //       if(page!=1)
  //         dispatch(setData(data.concat(data1.payload.Restaurants)));
  //     } catch (error) {
  //       console.error("Error fetching restaurants page data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, page]);


  console.log("pageee: ", page);
  return (
    <div className="restaurants-page">
      <Suspense fallback={renderLoading()}>
        <h2 className="restaurant-header">Restaurants</h2>
        <RestaurantsHeader
          primaryButton={primaryButton}
          setPrimaryButton={setPrimaryButton}
          secondaryButton={secondaryButton}
          setSecondaryButton={setSecondaryButton}
          maxDistance={newDistance}
          newDistance={newDistance}
          setNewDistance={setNewDistance}
          newMax={newMax}
          newMin={newMin}
          setNewMin={setNewMin}
          setNewMax={setNewMax}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          restaurantsPrices={restaurantsPrices}
        />
        <div className="container-content">{renderContent()}</div>
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
        {primaryButton === "MapView" ? (
          <div className="map-image-container">
            <img className="map-img" src={Map} alt="Map" />
          </div>
        ) : (
          <div className="cards">
            {isLoading ? (
              renderLoading()
            ) : (
              <CustomCardsSection cardsData={data} cardType={1} pageType={2} layoutDirection="vertical" />
            )}
          </div>
        )}
      </>
    );
  }
};

export default RestaurantsPage;
