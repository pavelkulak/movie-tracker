import { GenreController, HeroSlider, MovieController } from "@/widgets";
import { Box } from "@chakra-ui/react";
import { useTranslate } from "@/shared/i18n";
import { locales } from "../locales";

const PAGE_PADDING_X = { base: "16px", md: "40px", lg: "80px", xl: "120px" };

const CAROUSEL_PADDING = {
  pl: PAGE_PADDING_X,
  pr: { base: "0px", md: "40px", lg: "80px", xl: "120px" },
};

export const MoviesPage = () => {
  const t = useTranslate(locales);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={{ base: "30px", lg: "80px", xl: "100px" }}
      pb="100px"
    >

      <Box w="full">
        <HeroSlider />
      </Box>

      <Box
        {...CAROUSEL_PADDING}
        overflow="hidden"
        as="section"
        id="genres"
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <GenreController heading={t("genres")} />
      </Box>

      <Box
        {...CAROUSEL_PADDING}
        overflow="hidden"
        as="section"
        id="popular"
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <MovieController heading={t("popular")} type="popular" />
      </Box>

      <Box
        {...CAROUSEL_PADDING}
        overflow="hidden"
        as="section"
        id="now_playing"
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <MovieController heading={t("now_playing")} type="now_playing" />
      </Box>

      <Box {...CAROUSEL_PADDING} overflow="hidden" as="section" id="top_rated">
        <MovieController heading={t("top_rated")} type="top_rated" />
      </Box>
    </Box>
  );
};
