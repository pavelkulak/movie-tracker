import { ColorModeProvider } from "@/shared/ui/color-mode/ColorMode";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/shared/config/chakra/theme";

export default function Chakra({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
