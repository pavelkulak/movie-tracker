import { useTranslate } from "@/shared/i18n";
import { genres } from "./constants";
import { locales } from "./locales";

export const useGenreDisplayName = (genreId: string | number | undefined) => {
    const t = useTranslate(locales);

    if (!genreId) return "";

    const genre = genres.find((g) => g.id === Number(genreId));

    return genre ? t(genre.key) : "";
};

export const useTranslatedGenres = () => {
    const t = useTranslate(locales);

    return genres.map(genre => ({
        ...genre,
        translatedName: t(genre.key)
    }));
};