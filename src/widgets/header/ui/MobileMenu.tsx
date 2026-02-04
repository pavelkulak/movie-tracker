import { Button, Menu, Portal, Box, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BurgerMenu } from "./icons/BurgerMenu";
import { useTranslate } from "@/shared/i18n";
import { locales } from "../locales";
import { links } from "../constants";
import { useTranslatedGenres } from "@/entities/genres/helper";

export const MobileMenu = () => {
  const t = useTranslate(locales);
  const translatedGenres = useTranslatedGenres();

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          w="48px"
          h="48px"
          bgColor="bg.global"
          borderWidth="3px"
          borderStyle="solid"
          borderColor="border"
          borderRadius="6px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <BurgerMenu />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner zIndex="modal">
          <Menu.Content
            bgColor="bg.page" // Поменял на bg.page для соответствия стилю
            borderRadius="8px"
            p="8px"
            minW="200px"
            borderWidth="1px"
            borderColor="border.page"
          >
            {/* Основные ссылки из констант */}
            {links.map((link) => (
              <Menu.Item
                key={link.href}
                asChild
                value={link.label}
                p="3"
                _hover={{ bg: "bg.global" }}
              >
                <RouterLink to={link.href}>{t(link.label)}</RouterLink>
              </Menu.Item>
            ))}

            <Box h="1px" bg="border.page" my="2" />

            {/* Секция жанров с прокруткой */}
            <Text px="3" py="2" fontSize="xs" fontWeight="bold" color="gray.500" letterSpacing="wider">
              {t("genres")}
            </Text>
            <Box maxH="40vh" overflowY="auto" px="1">
              {translatedGenres.map((genre) => (
                <Menu.Item
                  key={genre.id}
                  asChild
                  value={genre.translatedName}
                  p="2"
                  borderRadius="6px"
                  _hover={{ bg: "bg.global" }}
                >
                  <RouterLink to={`/genre/${genre.id}`}>
                    {genre.translatedName}
                  </RouterLink>
                </Menu.Item>
              ))}
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};