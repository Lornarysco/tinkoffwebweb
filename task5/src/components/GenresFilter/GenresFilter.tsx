import React, { useEffect, useState } from "react";
import style from "./GenresFilter.module.css";
import { getGenres } from "./../../Services/apiService";

export const GenresFilter = ({ genres, setGenres }: any) => {
  useEffect(() => {
    getGenres().then((response) => {
      const obj: any = {};
      for (let genre of response) {
        obj[genre] = false;
      }
      setGenres((prev: any) => obj);
    });
  }, []);

  const changeStateOfGenre = (genre: any) => () => {
    const newGenres: any = {
      ...genres,
    };
    newGenres[genre] = !newGenres[genre];
    setGenres((prev: any) => newGenres);
  };

  return (
    <div className={style.genres}>
      {Object.keys(genres).map((genre, i) => (
        <span
          className={genres[genre] ? style.activeGenre : style.genre}
          key={genre}
          onClick={changeStateOfGenre(genre)}
        >
          {genre}
        </span>
      ))}
    </div>
  );
};
