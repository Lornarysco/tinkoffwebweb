import React, { useCallback, useEffect, useState } from "react";
import style from "./MovieEditForm.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import { editMovie, getMovieById, getMovies } from "../../Services/apiService";
import { MovieDetailsData } from "../../types";
import { HorizontalLine } from "../HorizontalLine/HorizontalLine";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { Input } from "../Input/Input";

const labelsTemplate = {
  title: "Название фильма",
  year: "Год выпуска",
  plot: "Описание",
  posterUrl: "Укажите ссылку на обложку",
  rate: "Рейтинг",
  actors: "Укажите список актеров",
  director: "Режиссер",
  genres: "Укажите список жанров",
  runtime: "Укажите продолжительность",
};

const placeholdersTemplate = {
  title: "Введите название фильма",
  year: "Введите год выпуска",
  plot: "Введите ...",
  posterUrl: "Введите ...",
  rate: "Задайте рейтинг",
  actors: "Введите актеров (через ,)",
  director: "Введите ...",
  genres: "Введите ...",
  runtime: "Введите продолжительность",
};

const initMovieData = {
  id: 0,
  title: "",
  year: 0,
  plot: "",
  posterUrl: "",
  rate: 0,
  actors: "",
  genres: [],
  runtime: 0,
  director: "",
};

export const MovieEditForm = () => {
  const [setMovies, movies] = useOutletContext<any>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsData>(initMovieData);

  useEffect(() => {
    getMovieById(Number(id)).then((response) => {
      if (!("rate" in response)) response.rate = 0;
      setMovie(response);
    });
  }, []);

  const saveData = async () => {
    try {
      await editMovie(movie);
      const newMovies = await getMovies();
      setMovies(newMovies);
      NotificationManager.success(`😃😃😃`, "Фильм отредактирован");
      navigate(`/movies/${id}`);
    } catch (e) {
      NotificationManager.error(`;(`, "Ошибка при обновлении списка фильмов");
    }
  };

  const handleChangeFor = useCallback(
    (propertyName: string) => (event: { target: { value: any } }) => {
      let newValue = event.target.value;
      if (propertyName === "genres") {
        newValue = newValue.split(",");
      }
      setMovie((movie) => ({
        ...movie,
        [propertyName]: newValue,
      }));
    },
    []
  );

  return (
    <form className={style.form}>
      <div className={style.title}>Редактирование</div>

      <Input
        label={labelsTemplate.title}
        placeholder={placeholdersTemplate.title}
        value={movie?.title}
        id="title"
        onChange={handleChangeFor}
      />

      <Input
        label={labelsTemplate.year}
        placeholder={placeholdersTemplate.year}
        value={String(movie?.year)}
        id="year"
        onChange={handleChangeFor}
      />

      <Input
        label={labelsTemplate.plot}
        placeholder={placeholdersTemplate.plot}
        value={movie?.plot}
        id="plot"
        onChange={handleChangeFor}
      />

      <Input
        label={labelsTemplate.posterUrl}
        placeholder={placeholdersTemplate.posterUrl}
        value={movie?.posterUrl}
        id="posterUrl"
        onChange={handleChangeFor}
      />

      <Input
        label={labelsTemplate.rate}
        placeholder={placeholdersTemplate.rate}
        value={String(movie?.rate)}
        id="rate"
        onChange={handleChangeFor}
      />

      <Input
        label={labelsTemplate.actors}
        placeholder={placeholdersTemplate.actors}
        value={movie?.actors}
        id="actors"
        onChange={handleChangeFor}
      />

      <Input
        label={labelsTemplate.director}
        placeholder={placeholdersTemplate.director}
        value={movie?.director}
        id="director"
        onChange={handleChangeFor}
      />

      <Input
        label={labelsTemplate.genres}
        placeholder={placeholdersTemplate.genres}
        value={String(movie?.genres)}
        id="genres"
        onChange={handleChangeFor}
      />

      <Input
        label={labelsTemplate.runtime}
        placeholder={placeholdersTemplate.runtime}
        value={String(movie?.runtime)}
        id="runtime"
        onChange={handleChangeFor}
      />

      <HorizontalLine />

      <div className={style.footer}>
        <button
          type="button"
          className={style.cancelButton}
          onClick={() => {
            navigate(`/movies/${id}`);
          }}
        >
          Отменить
        </button>
        <button type="button" className={style.saveButton} onClick={saveData}>
          Сохранить
        </button>
      </div>
    </form>
  );
};
