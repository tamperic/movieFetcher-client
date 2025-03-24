import React from 'react';
import PropTypes from "prop-types";

export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.imagePath} />
      </div>
      <div>
        <h2>Title: </h2>
        <p>{movie.title}</p>
      </div>
      <div>
        <h2>Description: </h2>
        <p>{movie.description}</p>
      </div>
      <div>
        <h2>Genre: </h2>
        <p>{movie.genre.name}</p>
      </div>
      <div>
        <h2>Director: </h2>
        <p>{movie.director.name}</p>
      </div>
      <div>
        <h2>Rating: </h2>
        <p>{movie.rating}</p>
      </div>
      <div>
        <h2>Year of release: </h2>
        <p>{movie.releaseYear}</p>
      </div>
      <div>
        <h2>Duration: </h2>
        <p>{movie.duration}</p>
      </div>
      <div>
        <h2>Actors: </h2>
        <p>{movie.actors}</p>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

// Define all the props constraints for the MovieView
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
      deathDate: PropTypes.string.isRequired
    }).isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imagePath: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};