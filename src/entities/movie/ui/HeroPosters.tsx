import { Box, Image, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useHeroPosters } from "../hooks";

export const HeroPosters = () => {
  const { data: posters, isLoading } = useHeroPosters();

  return isLoading ? (<SimpleGrid columns={[3, 9]}
    gap={{ base: "2", md: "5" }}>
    {Array.from({ length: 36 }).map((_, i) => (
      <Box key={i} borderRadius="12px" overflow="hidden" aspectRatio="2/3">
        <Skeleton
          h="full"
          w="full"
          variant="shine"
          css={{
            "--start-color": "var(--chakra-colors-red-800)",
            "--end-color": "var(--chakra-colors-red-950)",
          }}
        />
      </Box>
    ))}
  </SimpleGrid>
  ) : (
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