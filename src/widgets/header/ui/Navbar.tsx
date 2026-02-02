import { NavLink } from "react-router-dom";
import { locales } from "../locales";
import { links } from "../constants";
import { useTranslate } from "@/shared/i18n";
import { Box, HStack, List, Text } from "@chakra-ui/react";

export const Navbar = () => {
  const t = useTranslate(locales);
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
      <List.Root listStyle="none" display="flex" flexDirection="row">
        {links.map((link) => (
          <List.Item key={link.href}>
            <NavLink to={link.href}>
              {({ isActive }) => (
                <Box
                  p={{ md: "2", lg: "2.5" }}
                  borderRadius="8px"
                  bg={isActive ? "bg.global" : "transparent"}
                >
                  <Text textStyle="body">{t(link.label)}</Text>
                </Box>
              )}
            </NavLink>
          </List.Item>
        ))}
      </List.Root>
    </HStack>
  );
};
