import type { Movie, Credits, MovieVideos, MovieListResponse, MovieImages, MovieReviews } from "./types";

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
  language: string
): Promise<MovieListResponse> {
  return request(
    `${API_URL}/movie/popular?api_key=${API_KEY}&language=${language}`
  );
}

// top rated movies
export function fetchTopRatedMovies(
  language: string
): Promise<MovieListResponse> {
  return request(
    `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=${language}`
  );
}

export function fetchNowPlayingMovies(
  language: string
): Promise<MovieListResponse> {
  return request(
    `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=${language}`
  );
}

// ---------------- popular posters для HeroSection ----------------

export const fetchHeroPosters = async (pages = 2): Promise<string[]> => {
  const requests = [];
  for (let i = 1; i <= pages; i++) {
    requests.push(
      fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${i}`).then(
        (res) => res.json() as Promise<MovieListResponse>
      )
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
  language: string
): Promise<MovieListResponse> {
  return request(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=${language}`
  );
}

// ---------------- details ----------------
export function fetchMovieById(id: number, language: string): Promise<Movie> {
  return request(
    `${API_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`
  );
}

// ---------------- credits ----------------
export function fetchMovieCredits(
  id: number,
  language: string
): Promise<Credits> {
  return request(
    `${API_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${language}`
  );
}

// ---------------- videos ----------------
export function fetchMovieVideos(
  id: number,
  language: string
): Promise<MovieVideos> {
  return request(
    `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${language}`
  );
}

//movie images

export const fetchMovieImages = async (id: number, language: string): Promise<MovieImages> => {
  return request(
    `${API_URL}/movie/${id}/images?api_key=${API_KEY}&include_image_language=${language},en,null`
  );
}


// discover

export const fetchDiscoverMovies = async (
  genreId: string,
  page: number = 1,
  language: string
): Promise<MovieListResponse> => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    with_genres: genreId,
    page: String(page),
    language,
    sort_by: 'popularity.desc'
  });
  return request(`${API_URL}/discover/movie?${params}`)
}

// reviews
export const fetchMovieReviews = async (id: number, language: string): Promise<MovieReviews> => {
  return request(
    `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=${language}`
  );
};
