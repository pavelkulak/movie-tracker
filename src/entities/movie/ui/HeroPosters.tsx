import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { useHeroPosters } from "../hooks";

export const HeroPosters = () => {
  const { data: posters, isLoading } = useHeroPosters();

  if (isLoading) return <Box h="100vh" bg="bg.global" />;

  return (
    <SimpleGrid
      columns={[3, 9]}
      gap={{ base: "2", md: "5" }}
      filter="brightness(1) grayscale(0.2)"
      aspectRatio={{ base: "none", md: "none", lg: "2/1" }}
      opacity="0.6"
    >
      {posters?.slice(0, 36).map((path, index) => (
        <Box key={index} borderRadius="12px" overflow="hidden">
          <Image
            src={`${import.meta.env.VITE_TMDB_IMAGE_URL}/w342${path}`}
            alt=""
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
