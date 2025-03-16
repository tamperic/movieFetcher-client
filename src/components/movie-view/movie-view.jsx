export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <h2>Title: </h2>
        <p>{movie.title}</p>
      </div>
      <div>
        <h2>Description: </h2>
        <p>{movie.description}</p>
      </div>
      <div>
        <h2>Genre: </h2>
        <p>{movie.genre}</p>
      </div>
      <div>
        <h2>Director: </h2>
        <p>{movie.director}</p>
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
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};