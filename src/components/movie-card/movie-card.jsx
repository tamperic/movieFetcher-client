import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" style={{ height: '70%' }} src={movie.imagePath} />
      <Card.Body>
        <Card.Title>
          <h2>{movie.title}</h2>
          </Card.Title>
        <Card.Text>Directed by {movie.director.name}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button style={{ width: '100%', textAlign: 'center', padding: '10px' }} onClick={() => { onMovieClick(movie); }} >Open</Button>
      </Card.Footer>
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};