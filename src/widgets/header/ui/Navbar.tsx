import { Box, HStack, List, Text, Menu, Portal } from "@chakra-ui/react";
import { NavLink, Link as RouterLink, useLocation } from "react-router-dom";
import { useTranslate } from "@/shared/i18n";
import { locales } from "../locales";
import { links } from "../constants";
import { useTranslatedGenres } from "@/entities/genres/helper";

export const Navbar = () => {
  const t = useTranslate(locales);
  const location = useLocation();
  const translatedGenres = useTranslatedGenres();
  const isGenreActive = location.pathname.startsWith("/genre/");

  return (
    <HStack
      as="nav"
      p={{ md: "2", lg: "2.5" }}
      gap="1.5"
      bg="bg.page"
      borderRadius="12px"
      borderWidth="3px"
      borderColor="border.page"
    >
      <List.Root listStyle="none" display="flex" flexDirection="row" alignItems="center">
        {links.map((link) => (
          <List.Item key={link.href}>
            <NavLink to={link.href}>
              {({ isActive }) => (
                <Box
                  p={{ md: "2", lg: "2.5" }}
                  borderRadius="8px"
                  bg={isActive ? "bg.global" : "transparent"}
                  _hover={{ bg: isActive ? "bg.global" : "whiteAlpha.100" }}
                  transition="background 0.2s"
                >
                  <Text textStyle="body">{t(link.label)}</Text>
                </Box>
              )}
            </NavLink>
          </List.Item>
        ))}

        {/* ВЫПАДАЮЩИЙ СПИСОК ЖАНРОВ */}
        <List.Item>
          <Menu.Root positioning={{ placement: "bottom", gutter: 15 }}>
            <Menu.Trigger asChild>
              <Box
                p={{ md: "2", lg: "2.5" }}
                borderRadius="8px"
                bg={isGenreActive ? "bg.global" : "transparent"}
                cursor="pointer"
                _hover={{ bg: isGenreActive ? "bg.global" : "whiteAlpha.100" }}
              >
                <Text textStyle="body">{t("genres")}</Text>
              </Box>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner zIndex="popover">
                <Menu.Content
                  bg="bg.page"
                  borderRadius="12px"
                  p="4"
                  borderWidth="1px"
                  borderColor="border.page"
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap="2"
                  minW="300px"
                  boxShadow="2xl"
                >
                  {translatedGenres.map((genre) => (
                    <Menu.Item
                      key={genre.id}
                      value={genre.translatedName}
                      asChild
                      p="2"
                      borderRadius="6px"
                      _hover={{ bg: "bg.global", color: "white" }}
                      cursor="pointer"
                    >
                      <RouterLink to={`/genre/${genre.id}`}>
                        <Text fontSize="sm">{genre.translatedName}</Text>
                      </RouterLink>
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </List.Item>
      </List.Root>
    </HStack>
  );
};