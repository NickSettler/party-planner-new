import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardIndex from "./pages/dashboard/Index/DashboardIndex";
import DashboardMain from "./pages/dashboard/Main/DashboardMain";

const Router: () => React.ReactElement | null = () => {
  return useRoutes([
    {
      path: "/dashboard/*",
      element: <DashboardIndex />,
      children: [
        { path: "*", element: <Navigate to={"/dashboard/app"} replace /> },
        { path: "app", element: <DashboardMain /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <SignUpPage /> },
        { path: "signin", element: <SignInPage /> },
        { path: "/", element: <MainPage /> },
      ],
    },
  ]);
};

export default Router;
