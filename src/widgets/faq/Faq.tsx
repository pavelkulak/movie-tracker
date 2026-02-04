import { Accordion } from "@/shared/ui";
import { useTranslate } from "@/shared/i18n";
import { locales } from "./locales";
import { FAQ_IDS } from "./constants";
import { Box, Heading, Text } from "@chakra-ui/react";

export const Faq = () => {
  const t = useTranslate(locales);
  const accordionItems = FAQ_IDS.map((id) => ({
    value: id,
    title: t(`${id}.title`),
    text: t(`${id}.text`),
  }));

  return (
    <Box>
      <Heading textStyle="h2">{t("heading.title")}</Heading>
      <Text textStyle="body"> {t("heading.subtitle")}</Text>
      <Accordion items={accordionItems} />
    </Box>
  );
};
