import React, { useState , useEffect} from 'react';
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from '../movie-card/movie-card';

import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieTitle } = useParams();
  const [ movie, setMovie ] = useState(null);
  const [ isFavorite, setIsFavorite ] = useState(false);
  const [ similarMovies, setSimilarMovies ] = useState([]);


  // Fetch movies by title
  useEffect(() => {
    if (!token) return;  // If no token is available, don't proceed with the fetch
    console.log(movieTitle);

    fetch(`https://movie-fetcher-5a8669cd2c54.herokuapp.com/movies/${movieTitle}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((resMovie) => {
      setMovie(resMovie);
      setIsFavorite(user.favoriteMovies.includes(resMovie._id));
      setSimilarMovies(movies.filter((m) =>
        m.genre.name === resMovie.genre.name && 
        resMovie._id !== m._id)
      );
    
    });
  }, [movieTitle, token]);


  // Handle favorite movie toggle
  const toggleFavoriteMovie = (movieId) => {
    fetch(
      `https://movie-fetcher-5a8669cd2c54.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    )
    .then((response) => response.json())
    .then((updatedUser) => {
      setIsFavorite((prev) => !prev);
      // Once the request is successful, update the user object in the local state
      setUser({ ...updatedUser, favoriteMovies: updatedUser.favoriteMovies });
    }).catch((error) => {
      console.log("Updating the list of favorites failed:", error);
      alert(error.message); // Alert the user if there is an error
    });
  };


  return (
    <Row>
      <Row>
      <Col xs={6} md={4}>
        <div>
          <img className='w-100' src={movie?.imagePath} />
        </div>
      </Col>
      <Col xs={12} md={8}>
        <div>
          <h1>{movie?.title}</h1>
        </div>
        <div>
          <h4>Description: </h4>
          <p>{movie?.description}</p>
        </div>
        <div>
          <h4>Genre: </h4>
          <p>{movie?.genre?.name}</p>
        </div>
        <div>
          <h3>Director: </h3>
          <p>{movie?.director?.name}</p>
        </div>
        <div>
          <h4>Rating: </h4>
          <p>{movie?.rating}</p>
        </div>
        <div>
          <h4>Year of release: </h4>
          <p>{movie?.releaseYear}</p>
        </div>
        <div>
          <h4>Duration: </h4>
          <p>{movie?.duration}</p>
        </div>
        <div>
          <h4>Actors: </h4>
          <p>{movie?.actors}</p>
        </div>
        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>
        <Button variant={isFavorite ? "danger" : "primary"} onClick={() => toggleFavoriteMovie(movie._id)}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Button>
      </Col>
      </Row>
      <Col md={6}>
        <h2>Similar movies: </h2>
        {similarMovies.length === 0 ? (
            <p>There are no similar movies.</p>
          ) : (
            <Row>
              {similarMovies.map((similarMovie) => (
                <Col key={similarMovie._id}>
                  <MovieCard 
                    movie={similarMovie}
                  />
                </Col>
              ))}
            </Row>
          )}
      </Col>
    </Row>
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
  }).isRequired
};