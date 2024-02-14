Import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
          <h1>Travel Buddy Trivia Quiz</h1>
          <Link to="/quiz">Start Quiz</Link>
        </div>
      );
    };
    export default Home;