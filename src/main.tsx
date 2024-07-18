import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout.tsx";
import { Home } from "./pages/home.tsx";
import { Login } from "./pages/login.tsx";
import { Register } from "./pages/register.tsx";
import { Settings } from "./pages/settings.tsx";
import { Profile } from "./pages/profile.tsx";
import { Article } from "./pages/article.tsx";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          },
          {
            path: "settings",
            element: <Settings />
          },
          {
            path: "profile/:username",
            element: <Profile />
          },
          {
            path: "article/:slug",
            element: <Article />
          }

        ]
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </React.StrictMode>
);
