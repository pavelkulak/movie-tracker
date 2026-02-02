import { Box, SimpleGrid, Image, HStack, Text } from "@chakra-ui/react";
import { ArrowRightIcon } from "@/shared/ui/icons/";

interface GenreCardProps {
  genre: string;
  images: string[];
}

export const GenreCard = ({ images, genre }: GenreCardProps) => {
  return (
    <Box
      p={{ base: "20px", lg: "24px", xl: "30px" }}
      bg="bg.global"
      borderRadius="12px"
      borderWidth="1px"
      borderColor="border.page"
      transition="all 0.2s"
      _hover={{ scale: 1.02, cursor: "pointer" }}

    >
      {/* Сетка постеров */}
      <Box position="relative" borderRadius={{ base: "6px", xl: "10px" }} overflow="hidden">
        <SimpleGrid columns={2} gap={{ base: "4px", md: "8px" }}>
          {images.slice(0, 4).map((src, index) => (
            <Box
              key={index}
              overflow="hidden"
              borderRadius={{ base: "4px", md: "6px" }}
            >
              <Image
                src={src}
                alt={`${genre} poster ${index + 1}`}
                objectFit="cover"
                aspectRatio="1/1"
              />
            </Box>
          ))}
        </SimpleGrid>

        {/* Затемнение снизу (градиент) */}
        <Box
          position="absolute"
          inset="0"
          pointerEvents="none"
          background="linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)"
        />
      </Box>

      {/* Футер карточки */}
      <HStack justify="space-between" mt={{ base: "10px", md: "15px" }}>
        <Text textStyle="title" color="primary">
          {genre}
        </Text>
        <ArrowRightIcon />
      </HStack>
    </Box>
  );
};