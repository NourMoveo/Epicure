import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Controller/redux/store/store";
import { fetchChefsPageData } from "../../../Controller/redux/thunks/chefsPageThunk";
import { chefAPI } from "@/Model/APIs/ChefAPI";
import { Fade } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SwiperConfig, ChefCard } from "@/View/components";
import { Chef } from "@/Model/Interfaces";
import { LoadingGif, SadChefIcon } from "@/View/Photos";

// const ChefCard = React.lazy(() => import("@/View/components/Shared/ChefCard/ChefCard"));
import "./ChefsPage.scss";

const menuButtons = [
  { name: "All" },
  { name: "New" },
  { name: "Most Viewed" },
];

const ChefsPage = () => {
  const { chefsToShow, limit } = useSelector((state: RootState) => state.chefsPage);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("All");
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [nextData, setNextData] = useState<Chef[]>([])
  const page = Math.ceil(chefs.length / limit) + 1;
  const chefCardsRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    dispatch(fetchChefsPageData({ page: 1, limit, activeButton }));
    setChefs(chefsToShow)
  }, [dispatch, activeButton]);


  useEffect(() => {
    setIsLoading(true);
    const fetchDataAsync = async () => {
      setChefs([]);
      setIsLoading(true);
      const data = await chefAPI.getFilteredChefs(1, limit, activeButton);
      setChefs(data);
      setIsLoading(false);
      setNextData(await chefAPI.getFilteredChefs(2, limit, activeButton));
    };
    fetchDataAsync();
  }, [activeButton]);

  useEffect(() => {
    const handleScroll = async () => {

      if (!element) {
        return;
      }
      if (element.scrollTop + element.clientHeight > element.scrollHeight - 1 && element.scrollTop + element.clientHeight != element.scrollHeight - 1) {
        console.log("test 1  : ", chefs)
        setChefs(chefs.concat(await chefAPI.getFilteredChefs(page, limit, activeButton)));
        setNextData(await chefAPI.getFilteredChefs(page + 1, limit, activeButton))
        console.log("test 2  : ", chefs)
      }
    };
    const element = chefCardsRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => {
        element.removeEventListener("scroll", handleScroll);
        document.body.style.overflow = "auto";
      };
    }
  }, [chefs.length]);


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
          <p>No More Chefs.</p>
        </div>
      </div>
    );
  }
  function renderNoData() {
    return (
      <div className="no-more-data">
        <div className="empty-data-message">
          <p>No Chefs Found.</p>
          <img className="sad-chef" src={SadChefIcon} />
        </div>
      </div>
    );
  }


  return (
    <div className="chefs-page">
      <Suspense fallback={renderLoading()}>
        <h2 className="chefs-title">Chefs</h2>
        <div className="header-container">
          <div className="chefs-header">
            {menuButtons.map(({ name }) => (
              <button
                key={name}
                className={`menu-button ${activeButton === name ? "active" : ""}`}
                onClick={() => setActiveButton(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div ref={chefCardsRef} className="container-content-chefs">
          {page == 1 && chefsToShow.length == 0 ? (
            renderLoading()
          ) : page == 1 && chefsToShow.length > 0 ? (
            console.log("chefsToShow3: ", chefsToShow),
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

                <div className="desktop-section">
                  {chefsToShow.map((chef: Chef) => (
                    <div key={chef.fName}>
                      <ChefCard chef={chef} />
                    </div>
                  ))}
                </div>
              </Fade>
            </div>
          )
            :
            chefs && chefs.length > 0 ? (
              <>
                <div className="chefs-card">
                  <Fade>
                    <Swiper className="swiper" {...SwiperConfig("vertical")}>
                      {chefs.map((chef: Chef) => (
                        <SwiperSlide className="swiper-slide" key={chef.fName}>
                          <div>
                            <ChefCard chef={chef} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div className="desktop-section">
                      {chefs.map((chef: Chef) => (
                        <div key={chef.fName}>
                          <ChefCard chef={chef} />
                        </div>
                      ))}
                    </div>
                    {nextData.length === 0 && renderNoMoreData()}
                  </Fade>
                </div>
              </>

            ) : isLoading ? (
              renderLoading()
            ) : (
              renderNoData()
            )}
        </div>
      </Suspense >
    </div >
  );
};

export default ChefsPage;
