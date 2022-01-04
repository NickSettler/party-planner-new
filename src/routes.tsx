import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardMain from "./pages/dashboard/Main/DashboardMain";
import EmptyLayout from "./layouts/EmptyLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const Router: () => React.ReactElement | null = () => {
  return useRoutes([
    {
      path: "/dashboard/*",
      element: <DashboardLayout />,
      children: [
        { path: "*", element: <Navigate to={"/dashboard/app"} replace /> },
        { path: "app", element: <DashboardMain /> },
        { path: "profile", element: <DashboardMain /> },
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
