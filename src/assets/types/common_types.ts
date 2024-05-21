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

export type Movies = Movie[];

export type LoginValues = {
  email: string;
  password: string;
};

export type LoginErrorValues = {
  email?: string;
  password?: string;
};

export type SignupValueTypes = {
  email: string;
  password: string;
};
export type SignupErrorTypes = {
  email: string;
  password: string;
};

export type UserResponse = {
  email: string | undefined | null;
  userID: string | undefined;
};

export type ListMovieType = {
  title: string;
  year: number;
  userID: string;
  thumbnail: string;
};
