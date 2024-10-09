import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import the useParams hook

function Quiz() {
    const { id } = useParams(); // Get the quiz ID from the URL params
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({}); // Track answers by question index or ID

    useEffect(() => {
        // Fetch quiz data by the ID from the backend API
        fetch(`http://localhost:8080/api/quizzes/${id}`)
            .then(response => response.json())
            .then(data => setQuiz(data))
            .catch(error => console.error('Error fetching quiz:', error));
    }, [id]);

    const handleAnswerChange = (index, answer) => {
        setAnswers({ ...answers, [index]: answer }); // Use index (or ID) as the key for answers
    };

    const handleSubmit = () => {
        const submission = {
            quizId: quiz.id,
            questionAnswers: quiz.questions.map((q, index) => ({
                question: q.question,
                givenAnswer: answers[index], // Use index to get the answer
                correctAnswer: q.correctAnswer
            }))
        };

        fetch('http://localhost:8080/api/quizzes/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submission)
        })
        .then(response => response.text())
        .then(score => alert(`Your score is: ${score}`))
        .catch(error => console.error('Error submitting quiz:', error));
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{quiz.title}</h1>
            {quiz.questions.map((q, index) => (
                <div key={q.question}>
                    <p>{q.question}</p>
                    {q.options.map(option => (
                        <label key={option}>
                            <input
                                type="radio"
                                name={`question-${index}`}  // Ensure each question has a unique name
                                value={option}
                                onChange={() => handleAnswerChange(index, option)} // Use index as the key
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
}

export default Quiz;
