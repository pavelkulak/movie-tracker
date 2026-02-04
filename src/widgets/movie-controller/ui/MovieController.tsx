import { CardsSkeleton, Carousel } from "@/shared/ui";
import { MovieCard } from "@/shared/ui";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
} from "@/entities/movie/hooks";

interface MovieControllerProps {
  heading: string;
  type: "popular" | "now_playing" | "top_rated";
}
const TMDB_IMAGE_BASE = `${import.meta.env.VITE_TMDB_IMAGE_URL}/w500`;
export const MovieController = ({ heading, type }: MovieControllerProps) => {
  const queryMap = {
    popular: usePopularMovies(),
    now_playing: useNowPlayingMovies(),
    top_rated: useTopRatedMovies(),
  };

  const { data, isLoading } = queryMap[type];

  const movies = data?.results || [];
  return (
    <Carousel
      heading={heading}
      data={movies}
      isLoading={isLoading}
      renderSkeleton={() => <CardsSkeleton />}
      renderItem={(movie) => (
        <MovieCard
          title={movie.title}
          key={movie.id}
          image={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
          vote_average={movie.vote_average}
        />
      )}
    />
  );
};
