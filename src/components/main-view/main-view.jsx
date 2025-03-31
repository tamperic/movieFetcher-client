import React, { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
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

  const similarMovies = selectedMovie 
    ? movies.filter((movie) => {
      return (
        movie.genre.name === selectedMovie.genre.name && 
        movie._id !== selectedMovie._id
      );
    }) : []; // If selectedMovie is null, return an empty array

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
            <h2>Similar Movies:</h2>
            {similarMovies.length === 0 ? (
              <p>There are no similar movies.</p>
            ) : (
              <Row>
                {similarMovies.map((movie) => (
                  <Col key={movie._id}>
                    <MovieCard 
                      movie={movie} 
                      onMovieClick={(similarMovie) => {
                        setSelectedMovie(similarMovie);}} 
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        ) : movies.length === 0 ? (
          <div>There are no movies!</div>
        ) : (
          <Row>
            {movies.map((movie) => (
              <Col key={movie._id} className="mb-4" md={4} xs={12} sm={6} lg={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row>
        )
      }
    </Row>
  );
};