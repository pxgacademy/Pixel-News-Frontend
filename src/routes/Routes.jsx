import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/mainLayout/MainLayout";
import Home from "../pages/home/home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import AddArticles from "../pages/addArticles/AddArticles";
import AllArticles from "../pages/allArticles/AllArticles";
import PrivateRoutes from "./PrivateRoutes";
import ArticleDetails from "../pages/articleDetails/ArticleDetails";
import PremiumArticles from "../pages/premiumArticles/PremiumArticles";
import Subscription from "../pages/subscription/Subscription";
import MyArticles from "../pages/myArticles/MyArticles";
import UpdateArticles from "../pages/updateArticles/UpdateArticles";
import axios from "axios";
import Dashboard from "../layout/dashboard/Dashboard";
import Admin from "../pages/dashboard/admin/Admin";
import AdminRoutes from "./AdminRoutes";
import AllUsers from "../pages/dashboard/allUsers/AllUsers";
import AddPublisher from "../pages/dashboard/addPublisher/AddPublisher";
import AllArticlesDashboard from "../pages/dashboard/allArticles/AllArticlesDashboard";
import MyProfile from "../pages/myProfile/MyProfile";
import ErrorPage from "../components/errorPage/ErrorPage";
import Contact from "../pages/contact/Contact";

const API_LINK = import.meta.env.VITE_API_LINK;

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
        loader: () => axios(`${API_LINK}/publishers`),
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
        loader: () => axios(`${API_LINK}/publishers`),
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
        path: "my-profile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
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
    path: "dashboard",
    element: (
      <AdminRoutes>
        <Dashboard />
      </AdminRoutes>
    ),
    children: [
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-articles",
        element: <AllArticlesDashboard />,
      },
      {
        path: "add-publisher",
        element: <AddPublisher />,
      },
    ],
  },
  // error page
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);
