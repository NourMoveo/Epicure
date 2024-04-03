import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Controller/redux/store/store";
import { Map, LoadingGif, SadChefIcon } from "@/View/Photos";
import "./RestaurantsPage.scss";
const DishOrderPopup = React.lazy(() => import("@/View/components/Common/PopUps/dishOrderPopup/dishOrderPopup"));
const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
const RestaurantsHeader = React.lazy(() => import("@/View/components/Shared/RestaurantsHeader/RestaurantsHeader"));

const RestaurantsPage = () => {
  const [newDistance, setNewDistance] = useState(100);

  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");
  const [isMapView, setIsMapView] = useState(false);

  const { isModalOpen } = useSelector((state: RootState) => state.homePage);

  const { Restaurants, page, limit } = useSelector(
    (state: RootState) => state.restaurantsPage
  );

  const handlePrimaryButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    // Handle primary filter button click logic here
  };

  const handleSecondaryButtonClick = (buttonName: string) => {
    // Handle secondary filter button click logic here
  };

  return (
    <div className="restaurants-page">
      <Suspense fallback={renderLoading()}>
        <h2 className="restaurant-header">Restaurants</h2>
        <RestaurantsHeader
          onPrimaryButtonClick={handlePrimaryButtonClick}
          onSecondaryButtonClick={handleSecondaryButtonClick}
          newDistance={newDistance}
          setNewDistance={setNewDistance}
        />
        <div className="container-content">{renderContent()}</div>
        {/* {isModalOpen && <DishOrderPopup />} */}
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
