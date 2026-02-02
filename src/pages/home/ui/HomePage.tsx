import { Box } from "@chakra-ui/react";
import { locales } from "../locales";
import { useTranslate } from "@/shared/i18n";
import { GenreController, AviableDevices, Hero } from "@/widgets";
import { Accordion } from "@/shared/ui";

const PAGE_PADDING_X = { base: "16px", lg: "80px", xl: "162px" };


export const HomePage = () => {
  const t = useTranslate(locales);


  const items = [
    { value: "a", title: "First Item", text: "Some value 1..." },
    { value: "b", title: "Second Item", text: "Some value 2..." },
    { value: "c", title: "Third Item", text: "Some value 3..." },
    { value: "d", title: "Fourth Item", text: "Some value 4..." },
    { value: "e", title: "Fifth Item", text: "Some value 5..." },
    { value: "f", title: "Sixth Item", text: "Some value 6..." },
    { value: "g", title: "Seventh Item", text: "Some value 7..." },
    { value: "h", title: "Eighth Item", text: "Some value 8..." },
  ]

  return (
    <Box display="flex" flexDirection="column" gap={{ base: "100px", lg: "150px" }}>

      {/* 1. Hero — без отступов, на всю ширину */}
      <Hero />

      {/* 2. GenreController — исключение по правому краю на мобилке */}
      <Box
        overflow="hidden"
        pl={PAGE_PADDING_X}
        // На мобилке (base) ставим 0, на десктопе возвращаем стандарт
        pr={{ base: "0px", lg: "80px", xl: "162px" }}
      >
        <GenreController heading={t("explore")} subtitle={t("description")} />
      </Box>

      {/* 3. AviableDevices — стандартные паддинги со всех сторон */}
      <Box px={PAGE_PADDING_X}>
        <AviableDevices />
      </Box>
      <Box px={PAGE_PADDING_X}>
        <Accordion items={items} />
      </Box>

    </Box>
  );
};