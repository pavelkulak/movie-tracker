import { useQuery } from "@tanstack/react-query";
import { fetchGenresPosters } from "./api";
import { useLanguage } from "@/shared/i18n";
import { genres } from "./constants";

export function useGenresPosters() {
    const { language } = useLanguage();
    return useQuery({
        queryKey: ["genres-with-posters", language],
        queryFn: async () => {
            const promises = genres.map(async (genre) => {
                try {
                    const data = await fetchGenresPosters(genre.id, language);

                    // 1. Берем все фильмы с постерами (обычно их 20 в ответе)
                    const allValidMovies = data.results.filter((movie) => movie.poster_path);

                    // 2. Рандомизируем массив (Fisher-Yates shuffle)
                    const shuffled = [...allValidMovies];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }

                    // 3. Теперь берем 4 случайных из перемешанного списка
                    const posters = shuffled
                        .slice(0, 4)
                        .map((movie) => `${import.meta.env.VITE_TMDB_IMAGE_URL}/w300${movie.poster_path}`);

                    return {
                        ...genre,
                        posters,
                    };
                } catch (error) {
                    console.error(`Failed to fetch posters for genre ${genre.id}`, error);
                    return { ...genre, posters: [] };
                }
            });

            return Promise.all(promises);
        },
        // Важный момент: если хочешь, чтобы при каждом обновлении страницы постеры были новые,
        // убери staleTime или уменьши его. Но 24 часа — лучше для производительности.
        staleTime: 1000 * 60 * 60 * 24,
    });
}