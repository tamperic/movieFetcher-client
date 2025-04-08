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


  // Fetch movies by title, handle similar movies
  useEffect(() => {
    if (!token) return;  // If no token is available, don't proceed with the fetch

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
      `https://movie-fetcher-5a8669cd2c54.herokuapp.com/users/${user?.username}/movies/${movieId}`,
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
      setUser({ ...updatedUser, favoriteMovies: updatedUser.favoriteMovies }); // Once the request is successful, update the user object in the local state
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }).catch((error) => {
      console.log("Updating the list of favorites failed:", error);
      alert(error.message); // Alert the user if there is an error
    });
  };


  return (
    <Row className='movie-view-container'>
      <Row className='movie-details mt-5 mb-5'>
        <Row>
          <div>
            <img className='movie-img mb-4' src={movie?.imagePath} />
          </div>
        </Row>
        <Row>
          <div className='mb-4'>
            <h1>{movie?.title}</h1>
          </div>
          <div className='mb-3'>
            <span><strong>Description: </strong></span>
            <span>{movie?.description}</span>
          </div>
          <div className='mb-3'>
            <span><strong>Genre: </strong></span>
            <span>{movie?.genre?.name}</span>
          </div>
          <div className='mb-3'>
            <span><strong>Director: </strong></span>
            <span>{movie?.director?.name}</span>
          </div>
          <div className='mb-3'>
            <span><strong>Rating: </strong></span>
            <span>{movie?.rating}</span>
          </div>
          <div className='mb-3'>
            <span><strong>Year of release: </strong></span>
            <span>{movie?.releaseYear}</span>
          </div>
          <div className='mb-3'>
            <span><strong>Duration: </strong></span>
            <span>{movie?.duration}</span>
          </div>
          <div className='mb-3'>
            <span><strong>Actors: </strong></span>
            <span>{movie?.actors}</span>
          </div>
          <div>
            <Link to={`/`}>
              <Button className="back-btn">Back</Button>
            </Link>
            <Button className="fav-movie-btn" variant={isFavorite ? "isFav" : "notFav"} onClick={() => toggleFavoriteMovie(movie._id)}>{
              isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>
        </Row>
      </Row>
      <hr />
      <Row className='similar-movies mt-5 mb-5 d-flex justify-content-center align-items-center'>
        <Col md={6}>
          <h2 className='mb-3'>Similar movies</h2>
          <p className='mb-5'><em>Looking for more movies like this? ✨<br/> Explore similar titles by genre and discover your next favorite! 🚀</em></p>
          {similarMovies.length === 0 ? (
              <p>(There are no similar movies.)</p>
            ) : (
              <Row className="d-flex justify-content-center">
                {similarMovies.map((similarMovie) => (
                  <Col key={similarMovie._id} md={8}>
                    <MovieCard movie={similarMovie} />
                  </Col>
                ))}
              </Row>
            )}
        </Col>
      </Row>
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