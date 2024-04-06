import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  RestaurantsPage,
  RestaurantDetails,
  ChefsPage, DishOrder, CheckoutPage
} from "../pages";
import { Navbar, Footer } from "../components";
import { Outlet } from "react-router-dom";
import { DishOrderPopup } from "@/View/components";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "/dish/:title",
            element: <DishOrderPopup />,
          },
        ],
      },
      {
        path: "/chefs",
        element: <ChefsPage />,
      },
      {
        path: "/restaurants",
        element: <RestaurantsPage />,

      },
      {
        path: "/dishOrder/:title",
        element: <DishOrder />,
      },
      {
        path: "/restaurant/:title",
        element: <RestaurantDetails />,
      }, {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      // {
      //   path: "/dish/:title",
      //   element: <DishOrderPopup />,
      // },

    ],
  },
]);

export default router;
