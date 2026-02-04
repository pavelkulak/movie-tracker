import { Box, Carousel, useBreakpointValue, Skeleton } from "@chakra-ui/react";
import { usePopularMovies } from "@/entities/movie/hooks";
import { SlideItem } from "./SlideItem";
import { SlideContent } from "./SlideContent";
import { SliderControls } from "./SliderControls";

export const HeroSlider = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data: movies, isLoading } = usePopularMovies();
  const items = movies?.results?.slice(0, 5) || [];

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
    <Box
      h={{ base: "450px", lg: "700px", xl: "830px" }}
      w="full"
      position="relative"
    >
      <Carousel.Root
        slideCount={items.length}
        defaultPage={0}
        w="full"
        h="full"
      >
        <Carousel.ItemGroup h="full">
          {items.map((item, index) => (
            <SlideItem
              key={item.id}
              index={index}
              title={item.title}
              path={item.backdrop_path || item.poster_path}
            />
          ))}
        </Carousel.ItemGroup>

        <Carousel.Context>
          {(carousel) => (
            <SlideContent
              isMobile={isMobile}
              title={items[carousel.page ?? 0]?.title}
              overview={items[carousel.page ?? 0]?.overview}
            />
          )}
        </Carousel.Context>

        <SliderControls isMobile={isMobile} />
      </Carousel.Root>
    </Box>
  );
};
