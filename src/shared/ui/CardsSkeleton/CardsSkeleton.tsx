import { Box, HStack, SimpleGrid, Skeleton } from "@chakra-ui/react";

export const CardsSkeleton = () => (
  <Box
    p={{ base: "20px", lg: "24px", xl: "30px" }}
    bg="bg.global"
    borderRadius="12px"
    borderWidth="1px"
    borderColor="border.page"
    h="full"
  >
    <SimpleGrid columns={2} gap="2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} aspectRatio="1/1" borderRadius="6px" variant="shine"
          css={{
            "--start-color": "var(--chakra-colors-red-800)",
            "--end-color": "var(--chakra-colors-red-950)",
          }} />
      ))}
    </SimpleGrid>
    <HStack justify="space-between" mt="15px">
      <Skeleton height="20px" width="60%" variant="shine"
        css={{
          "--start-color": "var(--chakra-colors-red-800)",
          "--end-color": "var(--chakra-colors-red-950)",
        }} />
      <Skeleton height="20px" width="20px" variant="shine"
        css={{
          "--start-color": "var(--chakra-colors-red-800)",
          "--end-color": "var(--chakra-colors-red-950)",
        }} />
    </HStack>
  </Box>
);