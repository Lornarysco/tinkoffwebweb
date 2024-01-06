import axios from "axios";
import { MovieDetailsData } from "../types";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const createMovie = async (movieData: MovieDetailsData) => {
  const { data } = await API.post("/movies", movieData);
  return data;
};

export const getGenres = async () => {
  const { data } = await API.get("/genres");
  return data;
};

export const editMovie = async (movieData: MovieDetailsData) => {
  console.log(movieData);
  const { data } = await API.put(`/movies/` + movieData.id, movieData);
  return data;
};

export const getMovies = async () => {
  const { data } = await API.get("/movies");
  return data;
};

export const getMovieById = async (id: number) => {
  const { data } = await API.get(`/movies/${id}`);
  return data;
};
