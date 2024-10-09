import React, { useState, useEffect } from 'react';

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/quizzes/all', {
            credentials: 'include'  // Include cookies for authentication
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  // Expect JSON response
        })
        .then(data => setQuizzes(data))
        .catch(error => console.error("Error fetching quizzes:", error));
    }, []);

    return (
        <div>
            <h1>Available Quizzes</h1>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz.id}>
                        {quiz.title}
                        <a href={`/quiz/${quiz.id}`}>Take Quiz</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizList;
