import { useQuery } from "@tanstack/react-query";
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
  return useQuery({
    queryKey: ["movies", "hero-posters"],
    queryFn: () => fetchHeroPosters(2),
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
    queryFn: () => fetchMovieVideos(id, language),
    enabled: !!id,
  });
}
