export type MovieProps = {
  id: number;
  title: string;
  year: number;
  genres: string[];
  selected: boolean;
  onClick: any;
};

export type MovieListProps = {
  movies: MovieDetailsData[];
};

export type SearchBarProps = {
  onChange: () => void;
};

export type MovieDetailsData = {
  id: number;
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  rate: number;
  posterUrl: string;
};

export type Movies = {
  movies: MovieDetailsData[];
};

export type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  id: string;
  onChange: any;
};
