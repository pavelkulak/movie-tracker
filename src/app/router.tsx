import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout";
import { HomePage } from "@/pages/home/ui/HomePage";
import { lazy, Suspense } from "react";

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

// Вспомогательный компонент для обертки, чтобы не дублировать Suspense
const Loadable = (Component: React.ComponentType) => (props: any) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const MoviesPage = Loadable(MoviesPageLasy);
const SupportPage = Loadable(SupportPageLasy);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies", element: <MoviesPage /> },
      { path: "/support", element: <SupportPage /> },
    ],
  },
]);
