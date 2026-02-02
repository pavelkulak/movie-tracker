import { useMemo } from "react";
import { useLanguage, type Language } from "./LanguageContext";

// Тип для словаря: [язык]: { ключ: перевод } 

type LocaleValue = string | { [key: string]: LocaleValue };

type Locales = {
  [key in Language]: Record<string, LocaleValue>;
};

export function useTranslate(locales: Locales) {
  const { language } = useLanguage();

  // Оборачиваем в useMemo, чтобы функция не пересоздавалась зря [cite: 24]
  return useMemo(() => {
    return (key: string): string => {
      // Разделяем ключ по точкам: "devices.smartphone" -> ["devices", "smartphone"]
      const keys = key.split(".");

      // Постепенно погружаемся в объект
      let result: any = locales[language];

      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = result[k];
        } else {
          // Если путь прервался, возвращаем сам ключ как фолбек
          return key;
        }
      }

      // Если в итоге получили не строку (например, зашли только на полпути), возвращаем ключ
      return typeof result === "string" ? result : key;
    };
  }, [language, locales]);
}
