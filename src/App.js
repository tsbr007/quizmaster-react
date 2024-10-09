import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/quiz/:id" element={<Quiz />} />
                <Route path="/" element={<QuizList />} />
            </Routes>
        </Router>
    );
}

export default App;
