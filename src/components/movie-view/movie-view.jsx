import React from 'react';
import PropTypes from "prop-types";

export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <div>Title: </div>
        <div>{movie.title}</div>
      </div>
      <div>
        <div>Description: </div>
        <div>{movie.description}</div>
      </div>
      <div>
        <div>Genre: </div>
        <div>{movie.genre}</div>
      </div>
      <div>
        <div>Director: </div>
        <div>{movie.director}</div>
      </div>
      <div>
        <div>Rating: </div>
        <div>{movie.rating}</div>
      </div>
      <div>
        <div>Year of release: </div>
        <div>{movie.releaseYear}</div>
      </div>
      <div>
        <div>Duration: </div>
        <div>{movie.duration}</div>
      </div>
      <div>
        <div>Actors: </div>
        <div>{movie.actors}</div>
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