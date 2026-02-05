import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  searchMovies,
  fetchMovieById,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchHeroPosters,
  fetchNowPlayingMovies,
  fetchDiscoverMovies,
  fetchMovieImages,
  fetchMovieReviews,
} from "./api";
import { shuffleArray } from "@/shared/lib";

export function usePopularMovies() {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movies", "popular", language],
    queryFn: () => fetchPopularMovies(language),
    staleTime: 1000 * 60 * 60 * 12,
    gcTime: 1000 * 60 * 60 * 25,
    refetchOnWindowFocus: false,
    // ТРАНСФОРМАЦИЯ ДАННЫХ:
    select: (data) => ({
      ...data,
      results: shuffleArray(data.results || []),
    }),
  });
}

export function useTopRatedMovies() {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["movies", "top-rated", language],
    queryFn: () => fetchTopRatedMovies(language),
    staleTime: 1000 * 60 * 60 * 12, // 12 часов
    gcTime: 1000 * 60 * 60 * 25,
    refetchOnWindowFocus: false,
  });
}

export function useNowPlayingMovies() {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movies", "now-playing", language],
    queryFn: () => fetchNowPlayingMovies(language),
    staleTime: 1000 * 60 * 60 * 12,
    gcTime: 1000 * 60 * 60 * 25,
    refetchOnWindowFocus: false,
    // ТРАНСФОРМАЦИЯ ДАННЫХ:
    select: (data) => ({
      ...data,
      results: shuffleArray(data.results || []),
    }),
  });
}

// ---------------- popular posters ----------------

export const useHeroPosters = () => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["movies", "hero-posters", language],
    queryFn: () => fetchHeroPosters(language, 2),
    staleTime: 1000 * 60 * 60 * 24, // 24 часа
    gcTime: 1000 * 60 * 60 * 25,
    refetchOnWindowFocus: false,
  });
};

// -------- search --------
export function useSearchMovies(query: string) {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movies", "search", query, language],
    queryFn: () => searchMovies(query, language),
    enabled: !!query,
  });
}

// -------- details --------
export function useMovie(id: number) {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movie", id, language],
    queryFn: () => fetchMovieById(id, language),
    enabled: !!id,
  });
}

// -------- credits --------
export function useMovieCredits(id: number) {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movie", id, "credits", language],
    queryFn: () => fetchMovieCredits(id, language),
    enabled: !!id,
  });
}

// -------- videos --------
export function useMovieVideos(id: number) {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movie", id, "videos", language],
    queryFn: async () => {
      const data = await fetchMovieVideos(id, language);

      if (data.results && data.results.length > 0) {
        return data;
      }

      if (language === 'en') {
        return data;
      }

      return fetchMovieVideos(id, 'en');
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24,
  });
}


export function useMovieImages(id: number) {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movie", id, "images", language],
    queryFn: () => fetchMovieImages(id, language),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!id,
    select: (data) => data?.backdrops || [],
  });
}

//discover
export function useDiscoverMovies(genreId: string, page: number) {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movies", "discover", genreId, page, language],
    queryFn: () => fetchDiscoverMovies(genreId, page, language),
    placeholderData: keepPreviousData,
    enabled: !!genreId,
  });
}

// reviews
export function useMovieReviews(id: number) {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["movie", id, "reviews", language],
    queryFn: async () => {
      // 1. Пытаемся получить отзывы на выбранном языке
      const data = await fetchMovieReviews(id, language);

      // 2. Если отзывов 0 и язык не английский — запрашиваем английские
      if (data.results.length === 0 && language !== 'en') {
        return fetchMovieReviews(id, 'en');
      }

      return data;
    },
    enabled: !!id,
  });
}