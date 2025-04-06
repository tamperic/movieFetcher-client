import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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
      <Card.Img variant="top" style={{ height: '300px', objectFit: 'cover' }} src={movie?.imagePath} alt={movie?.title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>
          <h4>{movie?.title}</h4>
          </Card.Title>
        <Card.Text className="mb-4 text-muted">Directed by {movie?.director?.name}</Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-end mb-2 mt-auto">
            <Button className="fav-movie-btn" size="sm" variant={isFavorite ? "isFav" : "notFav"} onClick={() => toggleFavoriteMovie(movie._id)}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>
          <div className="mt-auto">
            <Link to={`/movies/${encodeURIComponent(movie?.title)}`}>
              <Button variant="primary" className="open-btn">Open</Button>
            </Link>
          </div>
        </div>
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