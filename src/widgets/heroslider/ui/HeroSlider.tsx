import { useMemo } from "react";
import { Box, Carousel, useBreakpointValue, Skeleton } from "@chakra-ui/react";
import { useDiscoverMovies, usePopularMovies, useMovieImages, useMovie } from "@/entities/movie/hooks";
import { SlideItem } from "./SlideItem";
import { SlideContent } from "./SlideContent";
import { SliderControls } from "./SliderControls";
import { useParams } from "react-router-dom";

interface NormalizedSlide {
  id: string | number;
  title: string;
  overview: string;
  path: string;
}

type HeroSliderProps = {
  type: "popular" | "genres" | "movie"; // добавили movie
  genreId?: string;
  movieId?: string; // добавили movieId
  onOpenVideo?: () => void;
}

export const HeroSlider = ({ type, genreId: propsGenreId, movieId: propsMovieId, onOpenVideo }: HeroSliderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { genreId: urlGenreId } = useParams();
  const targetGenreId = propsGenreId || urlGenreId || "";

  // Запросы
  const popularQuery = usePopularMovies();
  const discoverQuery = useDiscoverMovies(targetGenreId, 1);
  const imagesQuery = useMovieImages(Number(propsMovieId));
  const detailsQuery = useMovie(Number(propsMovieId));

  // Выбираем данные и статус загрузки
  const isLoading = type === "movie"
    ? (imagesQuery.isLoading || detailsQuery.isLoading)
    : (type === "popular" ? popularQuery.isLoading : discoverQuery.isLoading);

  const items = useMemo((): NormalizedSlide[] => {
    if (type === "movie") {
      const backdrops = (imagesQuery.data as any) || [];
      return backdrops.slice(0, 10).map((img: any) => ({
        id: img.file_path,
        title: detailsQuery.data?.title || "",
        overview: detailsQuery.data?.overview || "",
        path: img.file_path,
      }));
    }

    const movies = (type === "popular" ? popularQuery.data : discoverQuery.data) as any;
    return movies?.results?.slice(0, 5).map((m: any) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      path: m.backdrop_path || m.poster_path,
    })) || [];
  }, [type, imagesQuery.data, detailsQuery.data, popularQuery.data, discoverQuery.data]);

  if (isLoading || items.length === 0) {
    return (
      <Skeleton
        h={{ base: "450px", lg: "700px" }}
        variant="shine"
        css={{
          "--start-color": "var(--chakra-colors-red-800)",
          "--end-color": "var(--chakra-colors-red-950)",
        }}
      />
    );
  }

  return (
    <Box h={{ base: "450px", lg: "700px", xl: "830px" }} w="full" position="relative">
      <Carousel.Root slideCount={items.length} defaultPage={0} w="full" h="full">
        <Carousel.ItemGroup h="full">
          {items.map((item, index) => (
            <SlideItem
              key={item.id}
              index={index}
              title={item.title}
              path={item.path} // теперь тут всегда нужный путь
            />
          ))}
        </Carousel.ItemGroup>

        <Carousel.Context>
          {(carousel) => (
            <SlideContent
              isMobile={isMobile}
              title={items[carousel.page ?? 0]?.title}
              overview={items[carousel.page ?? 0]?.overview}
              onOpenVideo={onOpenVideo}
            />
          )}
        </Carousel.Context>

        <SliderControls isMobile={isMobile} />
      </Carousel.Root>
    </Box>
  );
};