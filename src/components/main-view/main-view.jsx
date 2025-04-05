import React, { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  // when reload the page, the user and token woll be initilized with whatever is in localStorage. If it's empty, both will be initilized with "null"
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);

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
    // console.log(localStorage.getItem("user"));
    setUser(storedUser);
  }, [localStorage.getItem("user")]);


  return (
    <BrowserRouter>
      <NavigationBar
        user={storedUser}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
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
                  <Col md={5}>
                    <ProfileView user={user} movies={movies} token={storedToken} setUser={setUser}
                    />
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
                  <Navigate to="/login" replace /> // MainView for unauthenticated users displays only the LoginView. If there is no user, <Route> component will redirect traffic to the login page.
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
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard movie={movie} user={user} setUser={setUser} token={token}/>
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};