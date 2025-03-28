import React from 'react';
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-view.scss";

export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img className='w-100' src={movie.imagePath} />
      </div>
      <div>
        <h1>Title: </h1>
        <p>{movie.title}</p>
      </div>
      <div>
        <h3>Description: </h3>
        <p>{movie.description}</p>
      </div>
      <div>
        <h3>Genre: </h3>
        <p>{movie.genre.name}</p>
      </div>
      <div>
        <h3>Director: </h3>
        <p>{movie.director.name}</p>
      </div>
      <div>
        <h3>Rating: </h3>
        <p>{movie.rating}</p>
      </div>
      <div>
        <h3>Year of release: </h3>
        <p>{movie.releaseYear}</p>
      </div>
      <div>
        <h3>Duration: </h3>
        <p>{movie.duration}</p>
      </div>
      <div>
        <h3>Actors: </h3>
        <p>{movie.actors}</p>
      </div>
      <Button onClick={onBackClick} className='back-button' style={{ cursor: "pointer" }}>Back</Button>
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