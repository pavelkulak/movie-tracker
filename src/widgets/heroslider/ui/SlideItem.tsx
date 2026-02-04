import { Box, Carousel } from "@chakra-ui/react";

const TMDB_IMAGE_BASE = `${import.meta.env.VITE_TMDB_IMAGE_URL}/w1920`;

interface Props {
  index: number;
  title: string;
  path: string;
}

export const SlideItem = ({ index, title, path }: Props) => (
  <Carousel.Item index={index} h="100%">
    <Box
      role="img"
      aria-label={title}
      h="100%"
      w="100%"
      backgroundImage={`linear-gradient(to bottom, rgba(0,0,0,0) 75%, #000 100%), url(${TMDB_IMAGE_BASE}${path})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    />
  </Carousel.Item>
);