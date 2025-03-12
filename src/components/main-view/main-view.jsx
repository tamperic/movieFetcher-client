import React, { useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Casino Royale",
      description: "After earning a licence to kill, secret agent James Bond sets out on his first mission as 007. Bond must defeat a private banker funding terrorists in a high-stakes game of poker at Casino Royale, in Montenegro.",
      genre: "Action",
      director: "Martin Campbell",
      rating: 8.0,
      releaseYear: 2006,
      duration: "2h 24m",
      actors: ["Daniel Craig", "Eva Green", "Mads Mikkelsen"],
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRa1z0r77Zs8QNqQI29PKKqc1q433AQH22MGi1Qgazn-BeyOalU",
      featured: false
    },
    {
      id: 2,
      title: "Ice Age",
      description: "Manny the mammoth, Sid the loquacious sloth, and Diego the sabre-toothed tiger go on a comical quest to return a human baby back to his father, across a world on the brink of an ice age.",
      genre: "Adventure",
      director: "Chris Wedge",
      rating: 7.5,
      releaseYear: 2002,
      duration: "1h 21m",
      actors: ["Ray Romano", "John Leguizamo", "Denis Leary"],
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT0G0riEkCZr9DXXBkKqhaxwPXya9dARB0BdGVWedML3eY3i_Xh",
      featured: false
    },
    {
      id: 3,
      title: "The Eight Hundred",
      description: "In 1937, 800 Chinese soldiers fight under siege from a warehouse in the middle of the Shanghai battlefield, completely surrounded by the Japanese army.",
      genre: "War",
      director: "Guan Hu",
      rating: 6.7,
      releaseYear: 2020,
      duration: "2h 29m",
      actors: ["Zhizhong Huang", "Junyi Zhang", "Hao Ou"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQovgv0Y9G1olcX4OXbEQzYarzxhlNzB4jA7U_NxEUBwm_uhIZK",
      featured: true
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if(selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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