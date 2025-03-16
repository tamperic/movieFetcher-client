import React from 'react';
import PropTypes from "prop-types";

export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.imagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Rating: </span>
        <span>{movie.rating}</span>
      </div>
      <div>
        <span>Year of release: </span>
        <span>{movie.releaseYear}</span>
      </div>
      <div>
        <span>Duration: </span>
        <span>{movie.duration}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

// Define all the props constraints for the MovieView
MovieView.propTypes = {
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