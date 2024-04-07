import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Controller/redux/store/store";
import { fetchHomePageData } from "../../../Controller/redux/thunks/homePageThunk";
import { IconsData } from "@/Model/constants";
import { LoadingGif } from "../../Photos";
import "./HomePage.scss";
import { Restaurant } from "@/Model/Interfaces";
import { CustomCardsSection, Hero, IconsMeaning, WeekChef, AboutUs, DishOrderPopup } from "@/View/components"
// const CustomCardsSection = React.lazy(() => import("@/View/components/Shared/CustomCardsSection/CustomCardsSection"));
// const Hero = React.lazy(() => import("@/View/components/Sections/Hero/Hero"));
// const IconsMeaning = React.lazy(() => import("@/View/components/Sections/IconsMeaning/IconsMeaning"));
// const WeekChef = React.lazy(() => import("@/View/components/Sections/WeekChef/WeekChef"));
// const AboutUs = React.lazy(() => import("@/View/components/Sections/AboutUs/AboutUs"));
// const DishOrderPopup = React.lazy(() => import("@/View/components/Common/PopUps/dishOrderPopup/dishOrderPopup"));

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { popularRestaurants, signatureDishes, chefOfTheWeek, isModalOpen } = useSelector(
    (state: RootState) => state.homePage
  );
  useEffect(() => {
    dispatch(fetchHomePageData());
  }, [dispatch]);

  function renderLoading() {
    return (
      <div className="loading-spinner">
        <img className="loading" src={LoadingGif} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={renderLoading()}>
        <Hero />
        <div className="sub-title-home-page">Popular Restaurants in Epicure:</div>
        {popularRestaurants && popularRestaurants.length > 0 ? (
          <CustomCardsSection cardsData={popularRestaurants} cardType={1} pageType={1} layoutDirection="horizontal" />
        ) : (
          renderLoading()
        )}
        <h2 className="sub-title-home-page">Signature Dishes Of:</h2>
        {signatureDishes && signatureDishes.length > 0 ? (
          <CustomCardsSection cardsData={signatureDishes} cardType={2} pageType={1} layoutDirection="horizontal" />
        ) : (
          renderLoading()
        )}
        <IconsMeaning icons={IconsData} />
        {chefOfTheWeek ? (
          <>
            <WeekChef {...chefOfTheWeek} />
            {chefOfTheWeek.restaurant && chefOfTheWeek.restaurant.length > 0 ? (
              <CustomCardsSection
                cardsData={(chefOfTheWeek.restaurant) as Restaurant[]}
                cardType={3}
                pageType={1}
                layoutDirection="horizontal"
              />
            ) : (
              renderLoading()
            )}
          </>
        ) : (
          renderLoading()
        )}
        <AboutUs />
        {isModalOpen && <DishOrderPopup />}
      </Suspense>
    </>
  );
};

export default HomePage;
