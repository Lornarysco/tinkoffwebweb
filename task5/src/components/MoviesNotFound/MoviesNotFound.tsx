import React from "react";
import style from "./MoviesNotFound.module.css";
import Sad from "./../../assets/sad.png";

export const MoviesNotFound = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.text}>Такие фильмы не найдены</h1>
      <img src={Sad} alt="" width="50" height="50" />
    </div>
  );
};
