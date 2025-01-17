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
import PremiumArticles from "../pages/premiumArticles/PremiumArticles";
import Subscription from "../pages/subscription/Subscription";
import MyArticles from "../pages/myArticles/MyArticles";
import UpdateArticles from "../pages/updateArticles/UpdateArticles";
import axios from "axios";
import Dashboard from "../layout/dashboard/Dashboard";

const API_LINK = import.meta.env.VITE_API_LINK

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
        path: "premium-articles",
        element: (
          <PrivateRoutes>
            <PremiumArticles />
          </PrivateRoutes>
        ),
      },
      {
        path: "subscriptions",
        element: (
          <PrivateRoutes>
            <Subscription />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-articles",
        element: (
          <PrivateRoutes>
            <MyArticles />
          </PrivateRoutes>
        ),
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
        path: "articles/update/:id",
        element: (
          <PrivateRoutes>
            <UpdateArticles />
          </PrivateRoutes>
        ),
        loader: () => axios(`${API_LINK}/publishers`)
      },
      {
        path: "add-articles",
        element: (
          <PrivateRoutes>
            <AddArticles />
          </PrivateRoutes>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard/>,
  }
]);
