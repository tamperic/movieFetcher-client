import React, { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  // when reload the page, the user and token woll be initilized with whatever is in localStorage. If it's empty, both will be initilized with "null"
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Synchronize a component with an external system
  useEffect(() => {
    if (!token) return;

    fetch("https://movie-fetcher-5a8669cd2c54.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((movies) => {
      setMovies(movies); // Update the state of the component
    });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col className="mt-5" md={5}>
          <LoginView 
            onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
        ) : selectedMovie ? (
          <Col md={6}>
            <Button variant="primary" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }} >Logout</Button>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            <br />
            <h2>Similar Movies</h2>
            {movies.filter((movie) => 
              movie.genre.name === selectedMovie.genre.name && movie._id !== selectedMovie._id
            ).map((movie) => (
              <Col>
                <MovieCard movie={movie} key={movie._id} onMovieClick={(similarMovie) => setSelectedMovie(similarMovie)} />
              </Col>
            ))
            }
            {/* let similarMovies = movies.filter((movie) => {return movie.genre.name === selectedMovie.genre.name && movie._id !== selectedMovie._id});
            {similarMovies.map((movie) => {
              return (<MovieCard movie={movie} key={movie._id} onMovieClick={(similarMovie) => setSelectedMovie(similarMovie)} />)
            })} */}
         </Col>
        ) : movies.length === 0 ? (
          <div>There are no movies!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )
      }
    </Row>
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