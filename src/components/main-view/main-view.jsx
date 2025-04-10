import React, { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);

  // Fetch movies
  useEffect(() => {
    if (!token) return;  // If no token is available, don't proceed with the fetch

    fetch("https://movie-fetcher-5a8669cd2c54.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((movies) => {
      setMovies(movies); // Update the state of the component
    });
  }, [token]);


  // Fix reload debug
  useEffect(() => {
    setUser(storedUser);
  }, [localStorage.getItem("user")]);


  return (
    <>
      <NavigationBar
        user={storedUser}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {storedUser ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {storedUser ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={
                          (user, token) => {setUser(user); setToken(token)}
                        }
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/users/:username"
              element={
                <>
                  {!storedUser ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={6}>
                      <ProfileView user={user} movies={movies} token={storedToken} setUser={setUser} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieTitle"
              element={
                <>
                  {!storedUser ? (
                    <Navigate to="/login" replace /> 
                  ) : movies.length === 0 ? (
                    <Col>There are no movies!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} token={token} user={user} setUser={setUser} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!storedUser ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      <Row className="welcome-message">
                        <h1 className="h1 mb-5" >Welcome to MovieFetcher! 🎬</h1>
                        <p>We are happy to have you on board. Feel free to discover hidden gems!</p>
                        <p>Happy exploring and enjoy the show! 🍿✨</p>
                      </Row>
                      <Row>
                        {movies.map((movie) => (
                          <Col className="mb-5" key={movie._id} md={3}>
                            <MovieCard movie={movie} user={user} setUser={setUser} token={token}/>
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </>
  );
};