import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout";
import { HomePage } from "@/pages/home/ui/HomePage";
import { SearchPage } from "@/pages/search/SearchPage";
import { MoviesPage } from "@/pages/movies/MoviesPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { SupportPage } from "@/pages/support/SupportPage";
import { SubscriptionsPage } from "@/pages/subscriptions/SubscriptionsPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/movies", element: <MoviesPage /> },
      { path: "/support", element: <SupportPage /> },
      { path: "/subscriptions", element: <SubscriptionsPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);
