import { Box, Heading, Text } from "@chakra-ui/react";
import { PlayButton } from "@/shared/ui/PlayButton";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  overview?: string;
  isMobile?: boolean;
  id?: string | number;
  onOpenVideo?: () => void;
}

export const SlideContent = ({ title, overview, isMobile, id, onOpenVideo }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onOpenVideo) {
      onOpenVideo();
    } else if (id) {
      navigate(`/movie/${id}`);
    }
  };

  return (
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
        <Box background="linear-gradient(to right, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.4) 60%)" borderRadius="10px" p="5px">
          <Text textStyle="body" color="primary" mt="2" textAlign="center">
            {overview}
          </Text>
        </Box>
      )}
      <Box pointerEvents="auto" mt="20px">
        <PlayButton variant="play" onClick={handleClick} />
      </Box>
    </Box>
  );
};