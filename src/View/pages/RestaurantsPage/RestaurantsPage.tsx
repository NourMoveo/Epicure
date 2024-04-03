import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Controller/redux/store/store";
import { Map, LoadingGif, SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));

const RestaurantsPage = () => {
  const [newDistance, setNewDistance] = useState(4);
  const [newMin, setNewMin] = useState(0);
  const [newMax, setNewMax] = useState(100);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");
  const [isMapView, setIsMapView] = useState(false);
  const [primaryButton, setPrimaryButton] = useState("All");
  const [secondaryButton, setSecondaryButton] = useState("");

  const { Restaurants, page, limit } = useSelector(
    (state: RootState) => state.restaurantsPage
  );


  return (
    <div className="restaurants-page">
      <Suspense fallback={renderLoading()}>
        <h2 className="restaurant-header">Restaurants</h2>
        <RestaurantsHeader
          primaryButton={primaryButton}
          setPrimaryButton={setPrimaryButton}
          secondaryButton={secondaryButton}
          setSecondaryButton={setSecondaryButton}
          newDistance={newDistance}
          setNewDistance={setNewDistance}
          newMax={newMax}
          newMin={newMin}
          setNewMin={setNewMin}
          setNewMax={setNewMax}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
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
        {isMapView ? (
          <div className="map-image-container">
            <img className="map-img" src={Map} alt="Map" />
          </div>
        ) : (
          <div className="cards">
            {isLoading ? (
              renderLoading()
            ) : (
              <CustomCardsSection cardsData={Restaurants} cardType={1} pageType={2} layoutDirection="vertical" />
            )}
          </div>
        )}
      </>
    );
  }
};

export default RestaurantsPage;
