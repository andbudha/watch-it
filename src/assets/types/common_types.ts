export type Movies = Movie[];

export type Movie = {
  title: string;
  year: number;
  cast: string[];
  genres: string[];
  href: string;
  extract: string;
  thumbnail: string;
  thumbnail_width: number;
  thumbnail_height: number;
};

export type Meta = {
  current_page: number;
  per_page: number;
  remaining_count: number;
  total_items: number;
  total_pages: number;
};
export type RequesResponse = {
  items: Movies;
  meta: Meta;
};
