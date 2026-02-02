import { Button, Text } from "@chakra-ui/react";
import { PlayIcon } from "./PlayIcon";
import { locales } from "./locales";
import { useTranslate } from "@/shared/i18n";

type PlayVariant = "play" | "start";

type PlayButtonProps = {
  variant: PlayVariant;
};

export const PlayButton = ({ variant }: PlayButtonProps) => {
  const t = useTranslate(locales);

  return (
    <Button
      borderRadius={{ base: "8px", lg: "10px" }}
      bgColor="primary.45"
      color="white"
      px="6"
      py={{ base: "3.5", xl: "4.5" }}
      h="auto"
      _hover={{ transform: "scale(1.05)" }}
    >
      <PlayIcon />
      <Text textStyle="buttons">{t(variant)}</Text>
    </Button>
  );
};
