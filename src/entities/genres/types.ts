export interface TMDBMovie {
    id: number;
    poster_path: string | null;

}

export interface TMDBDiscoverResponse {
    results: TMDBMovie[];
}