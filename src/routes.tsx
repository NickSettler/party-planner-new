import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import EmptyLayout from "./layouts/EmptyLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const DashboardMain = lazy(() => import("./pages/dashboard/Main"));
const DashboardEvents = lazy(() => import("./pages/dashboard/Events"));

const Router: () => React.ReactElement | null = () => {
  return useRoutes([
    {
      path: "/dashboard/*",
      element: <DashboardLayout />,
      children: [
        { path: "*", element: <Navigate to={"/dashboard/app"} replace /> },
        { path: "app", element: <DashboardMain /> },
        { path: "profile", element: <DashboardMain /> },
        { path: "events", element: <DashboardEvents /> },
      ],
    },
    {
      path: "/",
      element: <EmptyLayout />,
      children: [
        { path: "signup", element: <SignUpPage /> },
        { path: "signin", element: <SignInPage /> },
        { path: "/", element: <MainPage /> },
      ],
    },
  ]);
};

export default Router;
