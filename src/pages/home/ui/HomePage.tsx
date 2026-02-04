import { Box } from "@chakra-ui/react";
import { locales } from "../locales";
import { useTranslate } from "@/shared/i18n";
import { GenreController, AviableDevices, Hero, Faq } from "@/widgets";

const PAGE_PADDING_X = { base: "16px", lg: "80px", xl: "162px" };

export const HomePage = () => {
  const t = useTranslate(locales);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={{ base: "100px", lg: "150px" }}
    >
      {/* 1. Hero — без отступов, на всю ширину */}
      <Hero />

      {/* 2. GenreController — исключение по правому краю на мобилке */}
      <Box
        as="section"
        id="categories"
        overflow="hidden"
        pl={PAGE_PADDING_X}
        // На мобилке (base) ставим 0, на десктопе возвращаем стандарт
        pr={{ base: "0px", lg: "80px", xl: "162px" }}
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <GenreController heading={t("explore")} subtitle={t("description")} />
      </Box>

      {/* 3. AviableDevices — стандартные паддинги со всех сторон */}
      <Box
        px={PAGE_PADDING_X}
        as="section"
        id="devices"
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <AviableDevices />
      </Box>
      <Box
        px={PAGE_PADDING_X}
        as="section"
        id="faq"
        scrollMarginTop={{ base: "30px", lg: "200px" }}
      >
        <Faq />
      </Box>
    </Box>
  );
};
