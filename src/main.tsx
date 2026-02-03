import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/query-client";
import Chakra from "./app/chakra-provider";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "@/shared/i18n/";
import { router } from "@/app/router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Chakra>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Chakra>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>,
);
