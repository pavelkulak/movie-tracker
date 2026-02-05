// pages/MoviesByGenre.tsx
import { VStack, Heading, SimpleGrid } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useDiscoverMovies } from "@/entities/movie/hooks";
import { GenreMovieCard, Pagination } from "@/shared/ui";
import { useGenreDisplayName } from "@/entities/genres/helper";
import { MovieSkeleton } from "@/shared/ui/MovieSkeleton";
import { HeroSlider } from "@/widgets";
import { useNavigate } from "react-router-dom";

export const MoviesByGenre = () => {
  const { genreId } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useDiscoverMovies(genreId ?? "", page);
  const currentGenreName = useGenreDisplayName(genreId);
  const navigate = useNavigate();

  useEffect(() => setPage(1), [genreId]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <HeroSlider type="genres" genreId={genreId} />

      <VStack p={{ base: "4", md: "10", lg: "20" }} alignItems="stretch" gap={8}>
        <Heading alignSelf="flex-start" textStyle="h2">
          {currentGenreName || "..."}
        </Heading>

        <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} gap={6}>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => <MovieSkeleton key={i} />)
          ) : (
            data?.results.map((movie) => <GenreMovieCard key={movie.id} movie={movie} onClick={() => navigate(`/movie/${movie.id}`)} />)
          )}
        </SimpleGrid>

        {!isLoading && (
          <Pagination
            page={page}
            onPrev={() => { setPage(p => p - 1); scrollToTop(); }}
            onNext={() => { setPage(p => p + 1); scrollToTop(); }}
          />
        )}
      </VStack>
    </>
  );
};