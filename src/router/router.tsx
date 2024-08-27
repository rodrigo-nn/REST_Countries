import { createBrowserRouter, Navigate } from "react-router-dom";
import Countries from "../pages/Countries";
import Home from "../pages/Home";
import Country from "../pages/Country";
import NotFound from "../pages/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <Countries /> },
      { path: "/country/:countryID", element: <Country /> },
      { path: "/NotFound", element: <NotFound /> },
      { path: "*", element: <Navigate to="/NotFound" /> },
    ],
  },
]);

export default router;
