import { Box, Image, Skeleton, Text } from "@chakra-ui/react";
import { useState } from "react";
const TMDB_IMAGE_BASE = `${import.meta.env.VITE_TMDB_IMAGE_URL}/w342`;

interface GenreMovieCardProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        release_date?: string;
    };
    onClick: () => void;
}

export const GenreMovieCard = ({ movie, onClick }: GenreMovieCardProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const hasPoster = !!movie.poster_path;
    const posterUrl = hasPoster ? `${TMDB_IMAGE_BASE}/${movie.poster_path}` : null;

    return (
        <Box rounded="lg">
            <Box
                position="relative"
                rounded="lg"
                overflow="hidden"
                bg="bg.muted"
                aspectRatio={2 / 3}
            >

                {(!isLoaded && hasPoster) && (
                    <Skeleton position="absolute" inset="0" zIndex="1" />
                )}


                {!hasPoster ? (
                    <Box
                        w="full"
                        h="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        bg="gray.800"

                    >
                        <Text fontSize="4xl">🎬</Text>
                        <Text fontSize="xs" color="whiteAlpha.600">No Image</Text>
                    </Box>
                ) : (
                    <Image
                        onClick={onClick}
                        cursor="pointer"
                        _hover={{
                            filter: "brightness(0.6)",
                        }}
                        src={posterUrl!}
                        alt={movie.title}
                        objectFit="cover"
                        w="full"
                        h="full"
                        opacity={isLoaded ? 1 : 0} // Плавное проявление
                        transition="opacity 0.4s ease-in-out"
                        onLoad={() => setIsLoaded(true)}
                    />
                )}

                {(isLoaded || !hasPoster) && (
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
                        zIndex="2"
                    >
                        <Text textStyle="body">{movie.release_date?.split("-")[0] || "—"}</Text>
                    </Box>
                )}
            </Box>

            <Text mt="3" textStyle="1xl" >
                {movie.title}
            </Text>
        </Box>
    );
};