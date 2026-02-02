import { Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets";
import { Footer } from "@/widgets";

export const RootLayout = () => {
  return (
    <VStack minH="100vh" bg="bg.global">
      <VStack width="100%" maxW="1920px" mx="auto" minW="0" bg="bg.page" align="stretch">
        <Header />
        <Box as="main" flex={1}>
          <Outlet />
        </Box>
        <Footer />
      </VStack>
    </VStack>
  );
};
