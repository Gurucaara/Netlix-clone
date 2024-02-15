import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;

  const mainMovie = movies[0];
  // console.log(mainMovie);

  // Getting Our title
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[20%] md:pt-0 bg-black">
      {/* In Our Video Title We Need the movie title and that comes from my original title and we also need the description. */}
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
