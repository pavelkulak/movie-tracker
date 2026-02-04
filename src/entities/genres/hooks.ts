import { useQuery } from "@tanstack/react-query";
import { fetchGenresPosters } from "./api";
import { useLanguage } from "@/shared/i18n";
import { genres } from "./constants";

import { useTranslate } from "@/shared/i18n";
import { locales } from "./locales"; // путь к твоим локалям жанров

export function useGenresPosters() {
    const { language } = useLanguage();
    const t = useTranslate(locales); // Подключаем переводчик

    return useQuery({
        queryKey: ["genres-with-posters", language],
        queryFn: async () => {
            const promises = genres.map(async (genre) => {
                try {
                    const data = await fetchGenresPosters(genre.id, language);
                    const allValidMovies = data.results.filter((movie) => movie.poster_path);

                    // Shuffle (твой отличный алгоритм)
                    const shuffled = [...allValidMovies];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }

                    const posters = shuffled
                        .slice(0, 4)
                        .map((movie) => `${import.meta.env.VITE_TMDB_IMAGE_URL}/w300${movie.poster_path}`);

                    return {
                        ...genre,
                        posters,
                        // ДОБАВЛЯЕМ: Переведенное имя сразу в объект
                        displayName: t(genre.key)
                    };
                } catch (error) {
                    console.error(`Failed to fetch posters for genre ${genre.id}`, error);
                    return {
                        ...genre,
                        posters: [],
                        displayName: t(genre.key)
                    };
                }
            });

            return Promise.all(promises);
        },
        staleTime: 1000 * 60 * 60 * 24,
    });
}