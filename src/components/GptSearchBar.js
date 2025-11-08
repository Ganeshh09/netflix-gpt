import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import { fetchFromGemini } from "../utils/geminiapi"; // ✅ switched from HuggingFace
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [movies, setMovies] = useState([]); // ✅ local state to display results

  // TMDB movie search
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results[0] || null; // ✅ return first match
  };

  // Handle Gemini search
  const handleGptSearchClick = async () => {
    const userQuery = searchText.current.value;

    // Dynamic query for Gemini
    const gptQuery = `
      You are an intelligent movie recommendation assistant.  
      User input: "${userQuery}"  

      Task:  
      1. If the user input contains a specific movie title, include that title in the output.  
      2. Recommend exactly 15 movies that are similar in genre, theme, or style to the mentioned movie (or inferred preference if no title is explicitly mentioned).  
      3. Output only the movie names as a valid JSON array.  
      4. Do not include any explanations, descriptions, or extra text outside of the JSON array.  
      Example:  ["Inception","Interstellar","Tenet","The Matrix","Arrival","Blade Runner 2049","Minority Report","Source Code","Looper","Edge of Tomorrow","The Prestige","Oblivion","Ex Machina","Annihilation","Dark City"]  

    `;

    try {
      // ✅ Get Gemini recommendations
      const gptResponse = await fetchFromGemini(gptQuery);
      console.log("Gemini Response:", gptResponse);

      let gptMovies = [];
      if (Array.isArray(gptResponse)) {
        gptMovies = gptResponse;
      } else if (typeof gptResponse === "string") {
        gptMovies = gptResponse.split(",").map((m) => m.trim());
      }

      // ✅ Search TMDB for each recommended movie
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDB Results:", tmdbResults);

      // ✅ Save results to local state for UI rendering
      setMovies(tmdbResults.filter((m) => m !== null));
    } catch (err) {
      console.error("Gemini GPT Error:", err);
    }
  };

  return (
    <div className="pt-[10%] flex flex-col items-center">
      <form
        className="bg-black w-1/2 m-3 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 p-4 m-2 text-black bg-white rounded-sm"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 p-4 m-2 text-white bg-red-600 rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].Search}
        </button>
      </form>

      {/* ✅ Show recommended movies */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-black ">
        {movies.map((movie, index) => (
          <div key={index} className="bg-white rounded shadow p-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded mb-2"
            />
            <h2 className="text-md font-bold">{movie.title}</h2>
            <p className="text-sm">
              {movie.overview ? movie.overview.substring(0, 100) + "..." : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptSearchBar;



