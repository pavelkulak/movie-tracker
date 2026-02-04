import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";
import { Header, Footer } from "@/widgets";

export const RootLayout = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // 1. Убираем символ #, чтобы получить чистый ID
      const id = hash.replace("#", "");

      // 2. Небольшая задержка, чтобы React успел отрендерить страницу и компоненты
      const timeout = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);

      return () => clearTimeout(timeout);
    } else {
      // 3. Если перешли на новую страницу без хеша — скроллим в самый верх
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]); // Срабатывает при каждом изменении пути или якоря

  return (
    <VStack minH="100vh" bg="bg.global">
      <VStack
        width="100%"
        maxW="1920px"
        mx="auto"
        minW="0"
        bg="bg.page"
        align="stretch"
        flex={1}
      >
        <Header />
        <Box as="main" flex={1}>
          <Outlet />
        </Box>
        <Footer />
      </VStack>
    </VStack>
  );
};
