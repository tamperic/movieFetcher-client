import React, { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  // Synchronize a component with an external system
  useEffect(() => {
    fetch("https://movie-fetcher-5a8669cd2c54.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          ...movie,
          id: movie._id
        };
      });
      
      setMovies(moviesFromApi); // Update the state of the component
    });
  }, []);
  
  if(selectedMovie) {
    let similarMovies = movies.filter((movie) => {return movie.genre.name === selectedMovie.genre.name && movie._id !== selectedMovie._id});
    return (
      <div>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <br />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => {
          return (<MovieCard movie={movie} key={movie._id} onMovieClick={(similarMovie) => setSelectedMovie(similarMovie)} />)
        })}
      </div>
    );
  }

  if(movies.length === 0) {
    return <div>There are no movies!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

// Define all the props constraints for the MainView
MainView.propTypes = {
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