// theme.ts
import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

// Определяем кастомный конфиг (тут твои цвета, компоненты и т.д.)
const customConfig = defineConfig({
  conditions: {
    light: "[data-theme='light'] &",
    dark: "[data-theme='dark'] &",
  },
  theme: {
    tokens: {
      breakpoints: {
        md: { value: "768px" },
        lg: { value: "1440px" },
        xl: { value: "1920px" },
      },

      fonts: {
        body: { value: "Manrope, Inter, sans-serif" },
      },
      colors: {
        white: { value: "#FFFFFF" },
        black: { value: "#000000" },
        primary: {
          45: { value: "#E50000" },
          50: { value: "#FF0000" },
          55: { value: "#FF1A1A" },
          60: { value: "#FF3333" },
          80: { value: "#FF9999" },
          90: { value: "#FFCCCC" },
          95: { value: "#FFE5E5" },
          99: { value: "#FFFAFA" },
        },
        dark: {
          6: { value: "#0F0F0F" },
          8: { value: "#141414" },
          10: { value: "#1A1A1A" },
          12: { value: "#1F1F1F" },
          15: { value: "#262626" },
          20: { value: "#333333" },
          25: { value: "#404040" },
          30: { value: "#4C4C4C" },
        },
        gray: {
          60: { value: "#999999" },
          65: { value: "#A6A6A6" },
          70: { value: "#B3B3B3" },
          75: { value: "#BFBFBF" },
          90: { value: "#E4E4E7" },
          95: { value: "#F1F1F3" },
          97: { value: "#F7F7F8" },
          99: { value: "#FCFCFD" },
        },
      },
    },
    textStyles: {
      body: {
        value: {
          color: "gray.60",
          fontSize: { base: "14px", xl: "18px" },
          lineHeight: "1.6",
          fontWeight: "200",
        },
      },
      title: {
        value: {
          fontSize: { base: "14px", xl: "18px" },
          lineHeight: "1.6",
          fontWeight: "600",
        },
      },
      buttons: {
        value: {
          color: "white",
          fontSize: { base: "14px", xl: "18px" },
          lineHeight: "1.6",
          fontWeight: "semibold",
        },
      },
      //ЗАГОЛОВКИ
      h1: {
        value: {
          fontSize: { base: "28px", lg: "48px", xl: "58px" },
          lineHeight: "1.2",
          fontWeight: "700",
        },
      },

      h2: {
        value: {
          fontSize: { base: "24px", lg: "28px", xl: "38px" },
          lineHeight: "1.25",
          fontWeight: "600",
        },
      },
      h3: {
        value: {
          fontSize: { base: "18px", lg: "20px", xl: "24px" },
          lineHeight: "1.3",
          fontWeight: "600",
        },
      },
    },

    semanticTokens: {
      colors: {
        text: {
          primary: {
            value: { _light: "#000000", _dark: "#ffffff" },
          },
          secondary: {
            value: { _light: "#000000", _dark: "{colors.gray.60}" },
          },
        },
        bg: {
          global: {
            value: { _light: "{colors.gray.60}", _dark: "{colors.dark.12}" },
          },
          page: {
            value: { _light: "{colors.white}", _dark: "{colors.dark.6}" },
          },
          partical: {
            value: { _light: "{colors.dark.6}", _dark: "{colors.dark.15}" },
          },
        },
        icon: {
          value: {
            _light: "{colors.primary.45}",
            _dark: "{colors.white}",
          },
        },
        border: {
          value: {
            _light: "{colors.primary.45}",
            _dark: "{colors.dark.15}",
          },
        },
      },
    },

    recipes: {
      // Пример кастомизации Button (аналог старых variants)
    },
  },

  // Глобальные стили (body и т.д.)
  globalCss: {
    body: {
      color: "text.primary",
      minHeight: "100vh",
      fontFamily: "{fonts.body}",
    },
  },
});

// Сливаем с дефолтным конфигом
const merged = mergeConfigs(defaultConfig, customConfig);

// Создаём систему
export const system = createSystem(merged);

// Экспортируем для удобства (опционально)
export const theme = merged.theme;
