import React from "react";
import type { MovieProps } from "../../types";
import style from "./Movie.module.css";

export const Movie = ({
  id,
  title,
  year,
  genres,
  selected,
  onClick,
  ...props
}: MovieProps) => {
  return (
    <div
      id={id.toString()}
      className={selected ? style.selectedMovie : style.movie}
      onClick={onClick}
    >
      <div className={style.title}>{title ?? "Название"}</div>
      <div className={style.info}>
        <div className={style.year}>{year ?? "Год"}</div>
        <div className={style.dash}>|</div>
        <div className={style.genres}>
          {Array.from(genres).map((genre) => (
            <div className={style.genre} key={genre}>
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
