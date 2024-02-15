import React, { useEffect, useState } from 'react';
import { fetchTriviaQuestions } from '../../components/QuizComponent/trivaService.jsx';
import './quiz.css';

const Quiz = () => {
    // State to manage questions, categories, selected category, user answers, score, and display score
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Function to introduce a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

   // Function to fetch trivia categories
   const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(data.trivia_categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Function to fetch trivia questions based on the selected category
  const fetchQuestions = async () => {
    try {
      const data = await fetchTriviaQuestions(10, selectedCategory);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
    }
  };

   // Event handler for category selection change
   const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Event handler for answer selection
  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selectedAnswer }));
  };

  // Function to calculate the user's score
  const calculateScore = () => {
    let userScore = 0;
    questions.forEach((question) => {
      if (userAnswers[question.question] === question.correct_answer) {
        userScore++;
      }
    });
    setScore(userScore);
    setShowScore(true);
  };

   // Function to reset quiz state for playing again
   const resetQuiz = () => {
    setQuestions([]);
    setSelectedCategory('');
    setUserAnswers({});
    setScore(0);
    setShowScore(false);
  };

   // Function to decode HTML entities
   const decodeHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

   // Effect to fetch categories on component mount
   useEffect(() => {
    fetchCategories();
  }, []);

  // Effect to fetch questions when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const fetchQuestionsWithDelay = async () => {
        await delay(1000);
        fetchQuestions();
      };

      fetchQuestionsWithDelay();
    }
  }, [selectedCategory]);

  // JSX rendering
  return (
    <div className='quiz-wrap'>
      <h1>Trivia Quiz</h1>

      {/* Category selection dropdown */}
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {showScore ? (
        // Display user's score and play again button after submitting answers
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={resetQuiz}>Play Again</button>
        </div>
      ) : (
        // Display questions and answer options
        <div>
          <ul>
            {questions.map((question) => (
              <li key={question.question}>
                {/* Render question with decoded HTML entities */}
                <p dangerouslySetInnerHTML={{ __html: decodeHTML(question.question) }} />
                <ul>
                  {/* Render answer options with radio buttons */}
                  {question.incorrect_answers.map((answer) => (
                    <li key={answer}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${question.question}`}
                          value={answer}
                          onChange={() => handleAnswerSelect(question.question, answer)}
                        />
                        {answer}
                      </label>
                    </li>
                  ))}
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question_${question.question}`}
                        value={question.correct_answer}
                        onChange={() => handleAnswerSelect(question.question, question.correct_answer)}
                      />
                      {question.correct_answer}
                    </label>
                  </li>
                </ul>
              </li>
            ))}
          </ul>

          {/* Button to submit answers */}
          <button onClick={calculateScore}>Submit Answers</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
