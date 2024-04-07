import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Controller/redux/store/store";
import { fetchChefsPageData } from "../../../Controller/redux/thunks/chefsPageThunk";
import { setChefsToShow, setPage } from "@/Controller/redux/slices/chefsPageSlice";
import { chefAPI } from "@/Model/APIs/ChefAPI";
import { Fade } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SwiperConfig, ChefCard } from "@/View/components";
import { Chef } from "@/Model/Interfaces";
import { LoadingGif } from "@/View/Photos";

// const ChefCard = React.lazy(() => import("@/View/components/Shared/ChefCard/ChefCard"));
import "./ChefsPage.scss";

const menuButtons = [
  { name: "All", label: "All" },
  { name: "New", label: "New" },
  { name: "Most Viewed", label: "Most Viewed" },
];

const ChefsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");
  const [chefs, setChefs] = useState([]);
  const { page, limit, chefsToShow } = useSelector((state: RootState) => state.chefsPage);
  const [pastButton, setPastButton] = useState("All");

  const handleClick = (buttonName: string) => {
    setPastButton(activeButton);
    dispatch(setPage(1));
    setActiveButton(buttonName);
    dispatch(setChefsToShow([]));
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Active button: ", activeButton);
      try {
        let res: Chef[] = [];
        switch (activeButton) {
          case "All":
            res = await chefAPI.getAllChefs(page, limit);
            if (page === 1) {
              dispatch(setChefsToShow(res));
            }
            if (pastButton === activeButton && chefsToShow.length && res.length) {
              if (chefsToShow[chefsToShow.length - 1]._id !== res[res.length - 1]._id) {
                const newChefs = await chefAPI.getAllChefs(page, limit);
                dispatch(setChefsToShow(chefsToShow.concat(newChefs)));
              }
            }
            break; // Add break statement here
          case "New":
            res = await chefAPI.getNewChefs(page, limit);
            if (page === 1) {
              dispatch(setChefsToShow(res));
            }
            console.log("iin New")
            if (pastButton === activeButton && chefsToShow.length && res.length) {
              if (chefsToShow[chefsToShow.length - 1]._id !== res[res.length - 1]._id) {
                const newChefs = await chefAPI.getNewChefs(page, limit);
                dispatch(setChefsToShow(chefsToShow.concat(newChefs)));
              }
            }
            break; // Add break statement here
          case "Most Viewed":
            res = await chefAPI.getMostViewedChefs(page, limit);
            if (page === 1) {
              dispatch(setChefsToShow(res));
            }
            if (pastButton === activeButton && chefsToShow.length && res.length) {
              if (chefsToShow[chefsToShow.length - 1]._id !== res[res.length - 1]._id) {
                const newChefs = await chefAPI.getMostViewedChefs(page, limit);
                dispatch(setChefsToShow(chefsToShow.concat(newChefs)));
              }
            }
            break; // Add break statement here
          default:
            break;
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching chefs: ", error);
      }
    };


    fetchData();

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
  }, [activeButton, page]);

  function renderLoading() {
    return (
      <div className="loading-spinner">
        <img className="loading" src={LoadingGif} alt="Loading..." />
      </div>
    );
  }

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
        {isLoading && chefsToShow.length === 0 ? (
          renderLoading()
        ) : chefsToShow && chefsToShow.length > 0 ? (
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
        ) : (
          <div className="empty-data-message">
            <p>No Chefs found.</p>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ChefsPage;
