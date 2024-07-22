import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { ArticleCreateForm } from "./components/article-create-form.tsx";
import { ArticleUpdateForm } from "./components/article-update.form.tsx";
import { Layout } from "./components/layout.tsx";
import "./index.css";
import { ArticlePage } from "./pages/article.tsx";
import { Home } from "./pages/home.tsx";
import { Login } from "./pages/login.tsx";
import { Profile } from "./pages/profile.tsx";
import { Register } from "./pages/register.tsx";
import { Settings } from "./pages/settings.tsx";
import ProtectedRoute from "./utils/protected-route.tsx";

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
            path: "profile/:username",
            element: <Profile />
          },
          {
            path: "article/:slug",
            element: <ArticlePage />
          },
          {
            path: "settings",
            element: <ProtectedRoute children={<Settings />} />,
          },
          {
            path: "/editor",
            element: <ProtectedRoute children={<ArticleCreateForm />} />
          },
          {
            path: "/editor/:slug",
            element: <ProtectedRoute children={<ArticleUpdateForm />} />
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
