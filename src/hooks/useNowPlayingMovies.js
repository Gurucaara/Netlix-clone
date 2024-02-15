import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  // Fetching data from TMDB API and updating our store.

  // Dispatching the action
  const dispatch = useDispatch();

  // why to fetch the data from api again and again
  // when we already have that in our store
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    // dispatching the action here of adding new movies
    // and pushing json.results inside my store.
    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    // if (!nowPlayingMovies) getNowPlayingMovies();
    !nowPlayingMovies && getNowPlayingMovies();
    // getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
