import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieNames, movieResults } = gpt;

  // Error Handling
  if (!movieNames) return null; //Shimmer

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>{movieNames[0]}</div>
      {/*  We can use the movie list and use map on movie names */}
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
