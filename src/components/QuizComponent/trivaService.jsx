import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php';

export const fetchTriviaQuestions = async (amount) => {
  try {
    const response = await axios.get(`${API_URL}?amount=${amount}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
  }
};