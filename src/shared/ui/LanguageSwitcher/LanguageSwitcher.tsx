import { Button, HStack } from "@chakra-ui/react";
import { useLanguage } from "@/shared/i18n/LanguageContext";

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <HStack gap="2">
            <Button
                size="xs"
                variant={language === "en" ? "solid" : "ghost"}
                onClick={() => setLanguage("en")}
                colorScheme={language === "en" ? "red" : "gray"}
                borderRadius="full"
                px="3"
                color="white"
                bg={language === "en" ? "primary.45" : "transparent"}
                _hover={language === "en" ? { bg: "primary.50" } : { bg: "whiteAlpha.200" }}
            >
                EN
            </Button>
            <Button
                size="xs"
                variant={language === "ru" ? "solid" : "ghost"}
                onClick={() => setLanguage("ru")}
                colorScheme={language === "ru" ? "red" : "gray"}
                borderRadius="full"
                px="3"
                color="white"
                bg={language === "ru" ? "primary.45" : "transparent"}
                _hover={language === "ru" ? { bg: "primary.50" } : { bg: "whiteAlpha.200" }}
            >
                RU
            </Button>
        </HStack>
    );
};
