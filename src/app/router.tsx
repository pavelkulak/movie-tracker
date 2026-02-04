import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout";
import { HomePage } from "@/pages/home/ui/HomePage";
import { lazy, Suspense } from "react";


const MoviesByGenreLazy = lazy(() =>
  import("@/pages/movies-by-genre/MoviesByGenre").then((module) => ({
    default: module.MoviesByGenre,
  }))
);

const MoviesPageLasy = lazy(() =>
  import("@/pages/movies/MoviesPage").then((module) => ({
    default: module.MoviesPage,
  }))
);

const SupportPageLasy = lazy(() =>
  import("@/pages/support/SupportPage").then((module) => ({
    default: module.SupportPage,
  }))
);

const Loadable = (Component: React.ComponentType) => (props: any) =>
(
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const MoviesPage = Loadable(MoviesPageLasy);
const SupportPage = Loadable(SupportPageLasy);
const MoviesByGenre = Loadable(MoviesByGenreLazy);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies", element: <MoviesPage /> },
      { path: "/genre/:genreId", element: <MoviesByGenre /> },
      { path: "/support", element: <SupportPage /> },
    ],
  },
]);
