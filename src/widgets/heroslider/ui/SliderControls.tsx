import { Box, Carousel, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/shared/ui/icons";

interface Props {
  isMobile?: boolean;
}

export const SliderControls = ({ isMobile }: Props) => (
  <Carousel.Control
    position="absolute"
    bottom="2%"
    insetX="0"
    px={{ base: "20px", lg: "40px" }}
    justifyContent={{ base: "center", lg: "space-between" }}
    alignItems="center"
    pointerEvents="none"
  >
    {!isMobile && (
      <Carousel.PrevTrigger asChild pointerEvents="auto">
        <IconButton size="xs" variant="ghost">
          <Box
            bg="bg.primary"
            rounded={{ lg: "6px", xl: "8px" }}
            p={{ lg: "10px", xl: "14px" }}
          >
            <ArrowLeftIcon />
          </Box>
        </IconButton>
      </Carousel.PrevTrigger>
    )}

    <Carousel.Indicators
      pointerEvents="auto"
      _current={{ bg: "primary.45" }}
      h="6px"
      w="24px"
      bg="bg.global"
    />

    {!isMobile && (
      <Carousel.NextTrigger asChild pointerEvents="auto">
        <IconButton size="xs" variant="ghost">
          <Box
            bg="bg.primary"
            rounded={{ lg: "6px", xl: "8px" }}
            p={{ lg: "10px", xl: "14px" }}
          >
            <ArrowRightIcon />
          </Box>
        </IconButton>
      </Carousel.NextTrigger>
    )}
  </Carousel.Control>
);
