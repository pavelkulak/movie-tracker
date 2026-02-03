import {
  Box,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HeroPosters } from "@/entities/movie";
import { PlayButton } from "@/shared/ui/PlayButton";
import { useTranslate } from "@/shared/i18n";
import { locales } from "../locales";

export const Hero = () => {
  const t = useTranslate(locales);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack>
      <Box
        position="relative"
        height={{ base: "500px", lg: "700px", xl: "860px" }}
        overflow="hidden"
        w="full"
      >
        <HeroPosters />

        <Box
          position="absolute"
          inset="0"
          background="linear-gradient(to bottom, rgba(0,0,0,0) 85%, #000 100%)"
        />

        <Heading
          textStyle="h1"
          textAlign="center"
          width="100%"
          maxW={{ base: "90%" }}
          pos="absolute"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
        >
          {t("heading")}
        </Heading>
      </Box>

      <VStack gap="20px" mt="20px">
        <Text
          textStyle="body"
          color="text.secondary"
          textAlign="center"
          maxW={{ base: "98%", md: "60%" }}
        >
          {isMobile ? t("mpromo") : t("promo")}
        </Text>
        <PlayButton variant="start" />
      </VStack>
    </VStack>
  );
};
