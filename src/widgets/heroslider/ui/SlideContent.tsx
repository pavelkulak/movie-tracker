import { Box, Heading, Text } from "@chakra-ui/react";
import { PlayButton } from "@/shared/ui/PlayButton";

interface Props {
  title?: string;
  overview?: string;
  isMobile?: boolean;
}

export const SlideContent = ({ title, overview, isMobile }: Props) => (
  <Box
    position="absolute"
    bottom="10%"
    insetX="0"
    textAlign="center"
    maxW={{ base: "90%", lg: "60%" }}
    mx="auto"
    pointerEvents="none"
  >
    <Heading textStyle="h2" color="white">
      {title}
    </Heading>
    {!isMobile && overview && (
      <Text textStyle="body" color="primary" mt="2">
        {overview}
      </Text>
    )}
    <Box pointerEvents="auto" mt="20px">
      <PlayButton variant="play" />
    </Box>
  </Box>
);