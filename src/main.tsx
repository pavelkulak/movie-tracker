import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/query-client";
import Chakra from "./app/chakra-provider";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "@/shared/i18n/";
import { router } from "@/app/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Chakra>
          <RouterProvider router={router} />
        </Chakra>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>,
);
