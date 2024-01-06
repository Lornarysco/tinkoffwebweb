import React, { useEffect, useRef, useState } from "react";
import type { MovieDetailsData, Movies } from "../../types";
import { HorizontalLine } from "../HorizontalLine/HorizontalLine";
import { Movie } from "../Movie/Movie";
import style from "./MovieList.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { GenresFilter } from "../GenresFilter/GenresFilter";
import { MoviesNotFound } from "../MoviesNotFound/MoviesNotFound";

export const MovieList = ({ movies }: Movies) => {
  const navigate = useNavigate();
  const [filteredMovies, setFilteredMovies] = useState<any>([]);
  const [genres, setGenres] = useState<any>({});
  const input = useRef<any>(null);
  const { id } = useParams();

  useEffect(() => {
    setFilteredMovies(() => movies);
  }, [movies]);

  useEffect(() => {
    onChange();
  }, [genres]);

  const filterMoviesByInput = (arrMovies: MovieDetailsData[]) => {
    const inputValue = input.current.value;
    return arrMovies.filter((movie: MovieDetailsData) =>
      movie.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const filterMoviesByGenres = (arrMovies: MovieDetailsData[]) => {
    return arrMovies.filter((movie: MovieDetailsData) => {
      const hash = movie.genres.reduce((acc: any, i: any) => {
        acc[i] = true;
        return acc;
      }, {});
      for (let genre in genres) {
        if (!(genre in hash) && genres[genre]) {
          // Если этого жанра НЕТ у фильма И этот жанр включён, то не подходит фильмец
          return false;
        }
      }
      return true;
    });
  };

  const onChange = () => {
    setFilteredMovies((prev: any) => {
      const filteredMoviesByInput = filterMoviesByInput(movies);
      const filteredMoviesByInputAndGenres = filterMoviesByGenres(
        filteredMoviesByInput
      );
      return filteredMoviesByInputAndGenres;
    });
  };

  return (
    <section className={style.leftSection}>
      <input
        type="text"
        className={style.input}
        placeholder="Введите название фильма"
        onChange={onChange}
        ref={input}
      ></input>

      <GenresFilter genres={genres} setGenres={setGenres} />

      <div className={style.movies}>
        {filteredMovies.length === 0 ? (
          <MoviesNotFound />
        ) : (
          filteredMovies.map((movie: MovieDetailsData) => (
            <Movie
              id={movie.id}
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genres={movie.genres}
              selected={String(movie.id) === id}
              onClick={() => {
                navigate(`/movies/${movie.id}`);
              }}
            />
          ))
        )}
      </div>

      <HorizontalLine />

      <div className={style.footer}>
        <div className={style.footerLabel}>
          {getFooterText(filteredMovies.length)}
        </div>
        <button
          type="button"
          className={style.createButton}
          onClick={() => {
            navigate(`/movies/create`);
          }}
        >
          Добавить
        </button>
      </div>
    </section>
  );
};

const getFooterText = (filteredMoviesLength: number) => {
  let result: string = "";
  result += filteredMoviesLength === 1 ? "Найден" : "Найдено";
  result += " ";
  result += filteredMoviesLength;
  result += " ";
  result +=
    filteredMoviesLength > 1 && filteredMoviesLength < 5
      ? "элемента"
      : filteredMoviesLength === 1
      ? "элемент"
      : "элементов";
  return result;
};
