import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/mainLayout/MainLayout";
import Home from "../pages/home/home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import AddArticles from "../pages/addArticles/AddArticles";
import AllArticles from "../pages/allArticles/AllArticles";
import PrivateRoutes from "./PrivateRoutes";
import ArticleDetails from "../pages/articleDetails/ArticleDetails";
import PremiumRoutes from "./PremiumRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "all-articles",
        element: <AllArticles />,
      },
      {
        path: "articles/details/:id",
        element: (
          <PrivateRoutes>
            <ArticleDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "add-articles",
        element: <AddArticles />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
