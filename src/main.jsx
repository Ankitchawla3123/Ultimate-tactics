import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./store/store.js";
import App from "./App.jsx";

import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SIgnup from "./pages/SIgnup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout component with <Outlet/>
    children: [
      {
        index: true, // Default route "/"
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SIgnup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
