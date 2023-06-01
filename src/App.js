// import React from "react";

// import 'swiper/dist/js/swiper.js'

import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import Detail from "./pages/detail/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register"

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };
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
          path:"/home",
          element:<Home/>,
        },
        {
          path: "/:category/search/:keyword",
          element: <Catalog />,
        },
        {
          path: "/:category",
          element: <Catalog />,
        },
        {
          path: "/:category/:id",
          element: <Detail />,
        },
        {
          path:"/login",
          element:<Login />,
        },
        {
          path:"/register",
          element:<Register />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
