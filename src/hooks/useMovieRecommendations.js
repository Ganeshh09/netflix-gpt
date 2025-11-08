import axios from 'axios';

export const fetchRecommendations = async (movieName) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/recommend', {
      movie_name: movieName,
    });
    return response.data.recommendations; // List of movie names
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};
