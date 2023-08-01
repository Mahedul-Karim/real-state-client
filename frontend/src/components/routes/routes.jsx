import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../../page/Home";
import PropertiesPage from "../../page/propertys page/PropertiesPage";
import PropertyDetailsPage from "../../page/propertys page/PropertyDetailsPage";
import BookingsPage from "../../page/BookingsPage";
import FavouritesPage from "../../page/FavouritesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/properties",
        element: <PropertiesPage />,
      },
      {
        path: "/properties/:id",
        element: <PropertyDetailsPage />,
      },
      {
        path: "/bookings",
        element: <BookingsPage />,
      },
      {
        path: "/favourites",
        element: <FavouritesPage />,
      },
    ],
  },
]);

export default router;
