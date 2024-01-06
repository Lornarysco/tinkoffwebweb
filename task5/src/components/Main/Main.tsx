import React, { useEffect, useState } from "react";
import style from "./Main.module.css";
import { MovieList } from "../MovieList/MovieList";
import { Outlet } from "react-router-dom";
import { getMovies } from "./../../Services/apiService";
import { NotificationManager } from "react-notifications";

export const Main = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then((response) => {
        setMovies(response);
      })
      .catch(() => {
        NotificationManager.error(`;(`, "Ошибка при обновлении списка фильмов");
      });
  }, []);

  return (
    <main className={style.main}>
      <MovieList movies={movies} />
      <Outlet context={[setMovies, movies]} />
    </main>
  );
};
