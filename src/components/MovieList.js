import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log(movies);
  // Check if movies is null or empty
  if (!movies || movies.length === 0) {
    // Render a loading indicator or return early
    return (
      <div>
        <h1>{title}</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-6 text-white">{title}</h1>
      <div className="flex overflow-x-scroll ">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
