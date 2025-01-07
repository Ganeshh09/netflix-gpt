import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";  // Make sure to import the hook
import usePopularMovies from "../hooks/usePopularMovies";

const SecondaryContainer = () => {
  useNowPlayingMovies(); 
  usePopularMovies();

  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies &&(
    <div className="bg-black">
      <div className=" -mt-52 pl-8 relative z-20">
      <MovieList title={"Now playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Upcoming "} movies={movies.nowPlayingMovies} />
      <MovieList title={"Horror "} movies={movies.nowPlayingMovies} />
      </div>
    </div>
    )
  );
};

export default SecondaryContainer;
