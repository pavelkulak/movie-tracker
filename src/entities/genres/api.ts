const API_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
import type { TMDBDiscoverResponse } from "./types";

async function request<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error("TMDB request failed");
    return res.json();
}

// ---------------- Genres List ----------------

export function fetchGenresPosters(id: number, language: string = 'en-US'): Promise<TMDBDiscoverResponse> {
    return request(
        `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
}