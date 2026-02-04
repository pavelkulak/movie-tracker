import { useTranslate } from "@/shared/i18n";
import { Box, SimpleGrid, VStack, Link, Text } from "@chakra-ui/react";
import { locales } from "../locales";
import { FOOTER_STRUCTURE } from "../constants";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  const t = useTranslate(locales);

  return (
    <Box
      as="footer"
      p={{ base: "50px 20px", lg: "100px 80px", xl: "100px 162px" }}
      bg="bg.primary"
    >
      <SimpleGrid
        // 2 колонки на мобилке, по количеству элементов (авто) на десктопе
        columns={{ base: 2, md: 3, lg: FOOTER_STRUCTURE.length }}
        gap={{ base: "40px", lg: "20px" }}
        alignItems="start"
      >
        {FOOTER_STRUCTURE.map((column) => (
          <VStack
            key={column.headerKey}
            align="start"
            gap={{ base: "16px", lg: "24px" }}
          >
            {/* Заголовок колонки */}
            <Text textStyle="h4" color="white">
              {t(column.headerKey)}
            </Text>

            {/* Список ссылок */}
            <VStack align="start" gap={{ base: "8px", lg: "12px" }}>
              {column.links.map((link) => (
                <Link
                  key={link.labelKey}
                  asChild // Если ты на Chakra v3, используй asChild
                  color="text.secondary"
                  _hover={{ color: "primary" }}
                >
                  <RouterLink to={link.href}>{t(link.labelKey)}</RouterLink>
                </Link>
              ))}
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
