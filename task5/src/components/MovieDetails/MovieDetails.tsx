import React, { useEffect, useState } from "react";
import CopyButton from "./../../assets/copy.png";
import EditButton from "./../../assets/edit.png";
import style from "./MovieDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "./../../Services/apiService";
import { MovieDetailsData } from "../../types";
import NotFoundImage from "./../../assets/404.png";
import { NotificationManager } from "react-notifications";
import img1 from "./../../assets/activeStar.png";
import img2 from "./../../assets/afkStar.png";


export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsData>();

  const [isStarActive, setIsStarActive] = useState(false);

  const changeStarStatus = () => {
    setIsStarActive((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    getMovieById(Number(id))
      .then((response) => {
        setMovie(response);
      })
      .catch(() => {
        NotificationManager.error(`;(`, "Ошибка при попытке получении фильма по id");
      });
  }, [id]);

  const saveToBuffer = () => {
    navigator.clipboard.writeText(`${movie?.id}`);
    NotificationManager.success(`id = ${movie?.id}`, "Id скопирован");
  };

  return (
    <div className={style.movieDetails}>
      <div className={style.movieDetailsHeader}>
        <div className={style.idBlock} onClick={saveToBuffer}>
          Id: {movie?.id}
          <img
            alt="copy"
            className={style.copyButtonImage}
            src={CopyButton}
          ></img>
        </div>
        <div
          className={style.editBlock}
          onClick={() => {
            navigate(`/movies/${id}/edit`);
          }}
        >
          <img
            className={style.editButtonImage}
            src={EditButton}
            alt="edit"
          ></img>
          Редактировать
        </div>
      </div>
      <div className={style.movieDetailsMain}>
        <img
          className={style.imageWrapper}
          width="300px"
          height="300px"
          src={movie?.posterUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = NotFoundImage;
          }}
          alt="poster"
        />
        <div className={style.movieDetailsInfo}>
          <div className={style.title}>{movie?.title}</div>
          <div className={style.author}>{movie?.director}</div>
          <div className={style.paramsAndRolesWrapper}>
            <section className={style.params}>
              <div className={style.paramTitle}>Параметры</div>
              <div className={style.paramRow}>
                <div className={style.paramKey}>Год производства</div>
                <div className={style.paramValue}>{movie?.year}</div>
              </div>
              <div className={style.paramRow}>
                <div className={style.paramKey}>Продолжительность</div>
                <div className={style.paramValue}>{movie?.runtime}</div>
              </div>
              <div className={`star ${style.smallStar}`} onClick={changeStarStatus}>
                <img className={`active-star ${style.smallStarImg}`} src={img1} alt="added to favorites" hidden={!isStarActive} />
                <img className={`afk-star ${style.smallStarImg}`} src={img2} alt="not added to favorites" hidden={isStarActive} />
              </div>
            </section>

            <section className={style.roles}>
              <div className={style.roleTitle}>В главных ролях</div>
              {movie?.actors.split(",").map((actor, i) => (
                <div className={style.role} key={i}>
                  {actor}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
      <section className={style.descriptionSection}>
        <div className={style.descriptionTitle}>Описание</div>
        <div className={style.description}>{movie?.plot}</div>
      </section>
      <section className={style.rateSection}>
        <div className={style.rateTitle}>Текущий рейтинг</div>
        <div className={style.rateValue}>{movie?.rate ?? "-"}</div>
      </section>
    </div>
  );
};
