export interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Trailer {
  id: string;
  iso_639_1: string; // язык
  iso_3166_1: string; // страна
  name: string;
  key: string; // YouTube key
  site: string; // YouTube, Vimeo и т.д.
  size: number; // разрешение видео
  type: string; // Trailer, Teaser, Featurette, Recap
  official: boolean; // официальный ролик?
  published_at: string; // дата публикации
}

export interface MovieVideos {
  id: number; // id фильма
  results: Trailer[];
}

export interface CastMember {
  id: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember extends CastMember {
  job: string;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

