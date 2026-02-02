import { Box, Image, HStack, Text, RatingGroup } from "@chakra-ui/react";

interface MovieCardProps {
    image: string;
    vote_average: number;
}

export const MovieCard = ({ image, vote_average, }: MovieCardProps) => {
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

                <Box
                    overflow="hidden"
                    borderRadius={{ base: "4px", md: "6px" }}
                >
                    <Image
                        src={image}
                        objectFit="cover"
                        aspectRatio="1/1"
                    />
                </Box>


                {/* Затемнение снизу (градиент) */}
                <Box
                    position="absolute"
                    inset="0"
                    pointerEvents="none"
                    background="linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)"
                />
            </Box>

            {/* Футер карточки */}
            <HStack justify="space-between" mt={{ base: "10px", md: "15px" }} rounded="full" bg="bg.page" p={{ base: "6px", xl: "10px" }} border="1px solid" borderColor="bg.partical">


                <RatingGroup.Root allowHalf readOnly count={10} size="sm" value={Math.round(vote_average * 2) / 2} colorPalette="red">
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                </RatingGroup.Root>
                <Text>{vote_average.toFixed(1)}</Text>

            </HStack>
        </Box>
    );
};