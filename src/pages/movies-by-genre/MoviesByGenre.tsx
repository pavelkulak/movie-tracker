import { Box, Heading, VStack, Image, SimpleGrid, Text, IconButton, HStack, Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDiscoverMovies } from "@/entities/movie/hooks";
import { useState } from "react";
import { genres } from "@/entities/genres/constants";
import { ArrowLeftIcon, ArrowRightIcon } from "@/shared/ui/icons";

const TMDB_IMAGE_BASE = `${import.meta.env.VITE_TMDB_IMAGE_URL}/w342`;

// Вспомогательный компонент скелетона, использующий твои стили
const MovieCardSkeleton = () => (
  <Box rounded="lg">
    <Box position="relative" rounded="lg" overflow="hidden" aspectRatio={2 / 3}>
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
    <Skeleton
      mt="3"
      h="24px"
      w="70%"
      variant="shine"
      css={{
        "--start-color": "var(--chakra-colors-red-800)",
        "--end-color": "var(--chakra-colors-red-950)",
      }}
    />
  </Box>
);

export const MoviesByGenre = () => {
  const { genreId } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useDiscoverMovies(genreId ?? "", page);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentGenreName = genres.find((genre) => genre.id === Number(genreId))?.name;

  return (
    <VStack
      mt={{ base: 4, md: 6, lg: 8, xl: "200px" }}
      p={{ base: "16px", md: "40px", lg: "80px", xl: "120px" }}
      alignItems="stretch"
      gap={8}
    >
      <Heading alignSelf="flex-start" textStyle="h2">
        {currentGenreName || "Загрузка..."}
      </Heading>

      <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} gap={{ base: "16px", lg: "24px", xl: "32px" }}>
        {isLoading
          ? Array.from({ length: 20 }).map((_, index) => (
            <MovieCardSkeleton key={`skeleton-${index}`} />
          ))
          : data?.results.map((movie) => (
            <Box key={movie.id} rounded="lg">
              <Box position="relative" rounded="lg" overflow="hidden" _hover={{ filter: "brightness(0.5)" }} cursor="pointer">
                <Image
                  src={`${TMDB_IMAGE_BASE}/${movie.poster_path}`}
                  alt={movie.title}
                  objectFit="cover"
                  w="full"
                  h="auto"
                  aspectRatio={2 / 3}
                />
                <Box
                  position="absolute"
                  bottom="12px"
                  left="12px"
                  color="white"
                  bg="bg.page"
                  rounded="full"
                  py="1"
                  px="2"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                >
                  <Text textStyle="body">
                    {movie.release_date ? movie.release_date.split("-")[0] : "—"}
                  </Text>
                </Box>
              </Box>
              <Text mt="3" textStyle="1xl" >
                {movie.title}
              </Text>
            </Box>
          ))}
      </SimpleGrid>

      {/* Пагинация отображается только когда данные загружены */}
      {!isLoading && (
        <HStack justify="center" pt={8}>
          {page > 1 && (
            <IconButton size="xs" variant="ghost" onClick={handlePrevPage} aria-label="Previous page">
              <Box
                bg="bg.primary"
                rounded={{ lg: "6px", xl: "8px" }}
                p={{ lg: "10px", xl: "14px" }}
              >
                <ArrowLeftIcon />
              </Box>
            </IconButton>
          )}

          <Box
            bg="bg.primary"
            rounded={{ lg: "6px", xl: "8px" }}
            p={{ lg: "10px", xl: "14px" }}
          >
            <Text textStyle="primary">{page}</Text>
          </Box>

          <IconButton size="xs" variant="ghost" onClick={handleNextPage} aria-label="Next page">
            <Box
              bg="bg.primary"
              rounded={{ lg: "6px", xl: "8px" }}
              p={{ lg: "10px", xl: "14px" }}
            >
              <ArrowRightIcon />
            </Box>
          </IconButton>
        </HStack>
      )}
    </VStack>
  );
};