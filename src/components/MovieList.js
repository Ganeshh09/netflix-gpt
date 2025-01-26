import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
    // Check if movies exists and is not empty
    if (!movies || movies.length === 0) {
        return <div>No movies available</div>;
    }

    return (
        <div className="px-6">
            <h1 className="text-3xl py-4 text-white">{title}</h1>
            <div className="flex overflow-x-scroll gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-black">
                {movies.map((movie) => (
                    <div key={movie.id} className="flex-shrink-0 w-36 text-center">
                        <MovieCard posterPath={movie.poster_path} />
                        <h2 className="text-white mt-2 text-sm truncate">{movie.title}</h2>
                        <p className="text-red-400 pb-6">Rating: {movie.vote_average.toFixed(1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
