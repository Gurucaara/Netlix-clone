import React from "react";

const VideoTitle = ({ title, overview }) => {
  // Creating Our Video Title Component
  return (
    <div className="w-screen aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:py-6 text-lg w-1/4">{overview}</p>
      <div className="my-3 md:my-6">
        <button className="bg-white text-black py-2 px-6 md:py-4 md:px-12 md:text-xl rounded-lg hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 md:text-xl bg-opacity-50 rounded-lg hover:bg-gray-600">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
