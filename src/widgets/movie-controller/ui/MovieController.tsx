import { Carousel } from "@/shared/ui";
import { MovieCard } from "@/shared/ui";
import { useNowPlayingMovies, usePopularMovies } from "@/entities/movie/hooks";

interface MovieControllerProps {
    type: "popular" | "now_playing"

}
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const MovieController = ({ type }: MovieControllerProps) => {
    const queryMap = {
        popular: usePopularMovies(),
        now_playing: useNowPlayingMovies(),
    };

    const { data } = queryMap[type];
    const movies = data?.results || [];
    return (
        <Carousel
            data={movies}
            renderItem={(movie) => (
                <MovieCard
                    key={movie.id}
                    image={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
                    vote_average={movie.vote_average}
                />
            )}
        />
    );
};