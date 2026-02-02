import { useBreakpointValue, HStack } from "@chakra-ui/react";
import { ColorModeButton } from "@/shared/ui/color-mode/ColorMode";
import { MobileMenu } from "./MobileMenu";
import { Navbar } from "./Navbar";
import { Logo } from "./icons/Logo";

export const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <HStack
      pos="fixed"
      width="100%"
      maxW="inherit"
      zIndex="10"
      as="header"
      pt={{
        base: "10",
        md: "6",
        lg: "8",
      }}
      pb={{ base: "3.5", md: "6", lg: "8" }}
      px={{
        base: "4",
        md: "20",
        lg: "40",
      }}
      justifyContent="space-between"
      backdropFilter="blur(6px)"
    >
      <Logo />
      {isMobile ? (
        <HStack>
          <ColorModeButton />
          <MobileMenu />
        </HStack>
      ) : (
        <>
          <Navbar />
          <ColorModeButton />
        </>
      )}
    </HStack>
  );
};
