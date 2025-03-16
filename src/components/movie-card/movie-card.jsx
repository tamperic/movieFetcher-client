import React from "react";
export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <button 
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </button>
  );
};