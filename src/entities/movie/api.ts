import type { Movie, Credits, MovieVideos, MovieListResponse } from "./types";

const API_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// универсальный fetch
async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB request failed");
  return res.json();
}



// ---------------- popular ----------------
export function fetchPopularMovies(
  language: string,
): Promise<MovieListResponse> {
  return request(
    `${API_URL}/movie/popular?api_key=${API_KEY}&language=${language}`,
  );
}

export function fetchNowPlayingMovies(
  language: string,
): Promise<MovieListResponse> {
  return request(
    `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=${language}`,
  );
}

// ---------------- popular posters ----------------

export const fetchHeroPosters = async (pages = 2): Promise<string[]> => {
  const requests = [];
  for (let i = 1; i <= pages; i++) {
    requests.push(
      fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${i}`).then(
        (res) => res.json() as Promise<MovieListResponse>,
      ),
    );
  }

  const responses = await Promise.all(requests);

  return responses
    .flatMap((res) => res.results)
    .map((movie) => movie.poster_path)
    .filter(Boolean);
};

// ---------------- search ----------------
export function searchMovies(
  query: string,
  language: string,
): Promise<MovieListResponse> {
  return request(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=${language}`,
  );
}

// ---------------- details ----------------
export function fetchMovieById(id: number, language: string): Promise<Movie> {
  return request(
    `${API_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`,
  );
}

// ---------------- credits ----------------
export function fetchMovieCredits(
  id: number,
  language: string,
): Promise<Credits> {
  return request(
    `${API_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${language}`,
  );
}

// ---------------- videos ----------------
export function fetchMovieVideos(
  id: number,
  language: string,
): Promise<MovieVideos> {
  return request(
    `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${language}`,
  );
}
