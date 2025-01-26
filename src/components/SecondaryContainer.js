import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";  // Make sure to import the hook
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";

const SecondaryContainer = () => {
  useNowPlayingMovies(); 
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies &&(
    <div className="bg-black">
      <div className=" -mt-52 pl-8 relative z-20">
      <MovieList title={"Now playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      <MovieList title={"What's Popular"} movies={movies.popularMovies} />
      <MovieList title={"Upcoming "} movies={movies.upComingMovies} />
      </div>
    </div>
    )
  );
};

export default SecondaryContainer;
