import { GenreController, HeroSlider, MovieController } from "@/widgets";
import { Box } from "@chakra-ui/react";

// Выносим константу, чтобы удобно менять везде сразу
const PAGE_PADDING_X = { base: "16px", md: "40px", lg: "80px", xl: "120px" };

// Специальный паддинг для каруселей: справа 0 на мобилке
const CAROUSEL_PADDING = {
  pl: PAGE_PADDING_X,
  pr: { base: "0px", md: "40px", lg: "80px", xl: "120px" },
};

export const MoviesPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={{ base: "30px", lg: "80px", xl: "100px" }}
      pb="100px" // Отступ снизу страницы
    >
      {/* 1. HeroSlider — обычно на всю ширину без паддингов */}
      <Box w="full">
        <HeroSlider />
      </Box>

      {/* 2. Жанры — карусель в край на мобилке */}
      <Box
        {...CAROUSEL_PADDING}
        overflow="hidden"
        as="section"
        id="genres"
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <GenreController heading="Our Genres" />
      </Box>

      {/* 3. Популярные — карусель в край на мобилке */}
      <Box
        {...CAROUSEL_PADDING}
        overflow="hidden"
        as="section"
        id="popular"
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <MovieController heading="Popular Movies" type="popular" />
      </Box>

      {/* 4. Сейчас в кино — карусель в край на мобилке */}
      <Box
        {...CAROUSEL_PADDING}
        overflow="hidden"
        as="section"
        id="now_playing"
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <MovieController heading="Now Playing Movies" type="now_playing" />
      </Box>

      {/* 5. Топ рейтинг — карусель в край на мобилке */}
      <Box {...CAROUSEL_PADDING} overflow="hidden" as="section" id="top_rated">
        <MovieController heading="Top Rated Movies" type="top_rated" />
      </Box>
    </Box>
  );
};
