import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

// Define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    releaseYear: PropTypes.number,
    rating: PropTypes.number,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birthDate: PropTypes.string,
      deathDate: PropTypes.string
    }),
    actors: PropTypes.arrayOf(PropTypes.string),
    imagePath: PropTypes.string,
    duration: PropTypes.string,
    featured: PropTypes.bool
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};