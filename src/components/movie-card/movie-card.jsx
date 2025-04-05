import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ user, setUser, movie, token }) => {
  const isFavorite = user?.favoriteMovies?.includes(movie._id); // Check if movie is in the favorites list


  // Handle favorite movie toggle
  const toggleFavoriteMovie = (movieId) => {

   // Update the favorites on the backend
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
      // Once the request is successful, update the user object in the local state
      setUser({ ...updatedUser, favoriteMovies: updatedUser.favoriteMovies });
    }).catch((error) => {
      console.log("Updating the list of favorites failed:", error);
      alert(error.message); // Alert the user if there is an error
    });
  };
  
  return (
    <Card className="h-100">
      <Card.Img variant="top" style={{ height: '70%' }} src={movie?.imagePath} alt={movie?.title} />
      <Card.Body>
        <Card.Title>
          <h2>{movie?.title}</h2>
          </Card.Title>
        <Card.Text>Directed by {movie?.director?.name}</Card.Text>
        <Button variant={isFavorite ? "danger" : "primary"} onClick={() => toggleFavoriteMovie(movie._id)}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</Button>
        <Link to={`/movies/${encodeURIComponent(movie?.title)}`}>
          <Button variant="primary" style={{ width: "100%", textAlign: "center", padding: "10px" }}>Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// Define all the props constraints for the MovieCard
MovieCard.propTypes = {
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