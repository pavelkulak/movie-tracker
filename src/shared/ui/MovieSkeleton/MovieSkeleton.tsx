import { Box, Skeleton } from "@chakra-ui/react";

export const MovieSkeleton = () => (
    <Box rounded="lg" >
        <Box position="relative" rounded="lg" overflow="hidden" aspectRatio={2 / 3} >
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
        {/* Скелетон для текста названия */}
        <Skeleton h="20px" w="80%" mt="3" variant="shine"
            css={{
                "--start-color": "var(--chakra-colors-red-800)",
                "--end-color": "var(--chakra-colors-red-950)",
            }}
        />
    </Box>
);