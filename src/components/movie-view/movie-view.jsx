export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
<<<<<<< Updated upstream
        <div>Title: </div>
        <div>{movie.title}</div>
      </div>
      <div>
        <div>Description: </div>
        <div>{movie.description}</div>
      </div>
      <div>
        <div>Genre: </div>
        <div>{movie.genre}</div>
      </div>
      <div>
        <div>Director: </div>
        <div>{movie.director}</div>
      </div>
      <div>
        <div>Rating: </div>
        <div>{movie.rating}</div>
      </div>
      <div>
        <div>Year of release: </div>
        <div>{movie.releaseYear}</div>
      </div>
      <div>
        <div>Duration: </div>
        <div>{movie.duration}</div>
      </div>
      <div>
        <div>Actors: </div>
        <div>{movie.actors}</div>
=======
        <h2>Title: </h2>
        <p>{movie.title}</p>
      </div>
      <div>
        <h2>Description: </h2>
        <p>{movie.description}</p>
      </div>
      <div>
        <h2>Genre: </h2>
        <p>{movie.genre.name}</p>
      </div>
      <div>
        <h2>Director: </h2>
        <p>{movie.director.name}</p>
      </div>
      <div>
        <h2>Rating: </h2>
        <p>{movie.rating}</p>
      </div>
      <div>
        <h2>Year of release: </h2>
        <p>{movie.releaseYear}</p>
      </div>
      <div>
        <h2>Duration: </h2>
        <p>{movie.duration}</p>
      </div>
      <div>
        <h2>Actors: </h2>
        <p>{movie.actors}</p>
>>>>>>> Stashed changes
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};