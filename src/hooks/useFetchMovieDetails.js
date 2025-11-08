import axios from "axios";
import { API_OPTIONS } from "../utils/constants"; 


export const fetchMovieDetails = async (movieName) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movieName
      )}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS // ✅ this applies your TMDB Bearer token
    );

    if (response.data?.results?.length > 0) {
      return response.data.results[0]; // first matched movie
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error.response?.data || error.message);
    return null;
  }
};
