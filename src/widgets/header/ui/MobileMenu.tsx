import { Button, Menu, Portal, Link } from "@chakra-ui/react";
import { BurgerMenu } from "./icons/BurgerMenu";
import { useTranslate } from "@/shared/i18n";
import { locales } from "../locales";
import { links } from "../constants";

export const MobileMenu = () => {
  const t = useTranslate(locales);
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
        <Menu.Positioner>
          <Menu.Content bgColor="global" borderRadius="8px" p="8px">
            {links.map((link) => (
              <Menu.Item key={link.href} asChild value={link.label}>
                <Link href={link.href}>{t(link.label)}</Link>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
