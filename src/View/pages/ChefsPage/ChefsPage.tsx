import "./ChefsPage.scss";
import { Fade } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SwiperConfig } from '@/View/components';
import { Chef } from "@/Model/Interfaces";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Controller/redux/store/store";
import { fetchChefsPageData } from "../../../Controller/redux/thunks/chefsPageThunk";
import { LoadingGif } from "@/View/Photos";
const ChefCard = React.lazy(() => import("@/View/components/Shared/ChefCard/ChefCard"));

const menuButtons = [
  { name: "All", label: "All" },
  { name: "New", label: "New" },
  { name: "Most Viewed", label: "Most Viewed" },
];

const ChefsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");

  const handleClick = (buttonName: string) => {
    if (buttonName !== activeButton) {
      setActiveButton(buttonName);
    }
  };

  useEffect(() => {
    dispatch(fetchChefsPageData())
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error fetching chef page data:", error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const { newChefs, mostViewedChefs, allChefs } = useSelector(
    (state: RootState) => state.chefsPage
  );

  const getChefsByButton = (buttonName: string): Chef[] => {
    switch (buttonName) {
      case "New":
        return newChefs;
      case "Most Viewed":
        return mostViewedChefs;
      case "All":
        return allChefs;
      default:
        return [];
    }
  };
  function renderLoading() {
    return (
      <div className="loading-spinner">
        <img className="loading" src={LoadingGif} alt="Loading..." />
      </div>
    );
  }
  const chefsToShow = getChefsByButton(activeButton);

  return (
    <div className="chefs-page">
      <Suspense fallback={renderLoading()}>
        <h2 className="chefs-title">Chefs</h2>
        <div className="header-container">
          <div className="chefs-header">
            {menuButtons.map(({ name, label }) => (
              <button
                key={name}
                className={`menu-button ${activeButton === name ? "active" : ""}`}
                onClick={() => handleClick(name)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {
          isLoading && chefsToShow.length == 0 ? (
            renderLoading()
          ) :
            chefsToShow && chefsToShow.length > 0 ?
              (
                <div className="chefs-card">
                  <Fade>
                    <Swiper className="swiper" {...SwiperConfig("vertical")}>
                      {chefsToShow.map((chef: Chef) => (
                        <SwiperSlide className="swiper-slide" key={chef.fName}>
                          <div>
                            <ChefCard chef={chef} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Fade>
                  <div className="desktop-section">
                    {chefsToShow.map((chef: Chef) => (
                      <div key={chef.fName}>
                        <ChefCard chef={chef} />
                      </div>
                    ))}
                  </div>
                </div>

              )
              : (
                <div className="empty-data-message">
                  <p>No Chefs found.</p>
                </div>
              )}
      </Suspense>

    </div>
  );
};

export default ChefsPage;
