import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Questions.css";

const Questions = () => {
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      text: "What are you feeling today? (Select all that apply)",
      options: ["Breakfast", "Lunch", "Dinner"],
    },
    {
      id: 2,
      text: "Do you have any dietary restrictions?",
      options: [
        "No restrictions",
        "Vegetarian",
        "Vegan",
        "Gluten-free",
        "Nut allergy",
        "Shellfish allergy",
      ],
    },
    {
      id: 3,
      text: "Craving something specific? Select the foods you'd like us to look for.",
      options: ["Burgers", "Pizza", "Chinese", "Salads", "Italian", "Mexican", "Desserts"],
    },
    {
      id: 4,
      text: "What is your address?",
      type: "input",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // checkbox toggle
  const handleCheckboxChange = (questionId, option) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(option)) {
        return { ...prev, [questionId]: currentAnswers.filter((a) => a !== option) };
      } else {
        return { ...prev, [questionId]: [...currentAnswers, option] };
      }
    });
  };

  // input field
  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // navigation
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // last question completed → navigate to Results page
      const foodQuestion = answers[3] || []; // food types from question 3 (checkbox)
      const preferences = {
        foodTypes: foodQuestion,
        address: answers[4] || "", // optional: address input
      };

      navigate("/results", { state: { preferences } });
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="questions">
      <div className="questions-container">
        <h1 className="question">{currentQuestion.text}</h1>
        <div className="input-section">
          {currentQuestion.type === "input" ? (
            <input
              type="text"
              className="home-address-field"
              placeholder="Enter your home address"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
            />
          ) : (
            currentQuestion.options?.map((option, idx) => (
              <label key={idx} className="option">
                <input
                  type="checkbox"
                  checked={answers[currentQuestion.id]?.includes(option) || false}
                  onChange={() => handleCheckboxChange(currentQuestion.id, option)}
                />
                {option}
              </label>
            ))
          )}
        </div>

        <div className="arrow-buttons">
          <button onClick={prevQuestion} disabled={currentIndex === 0} className="arrow-button">
            Previous
          </button>
          <button onClick={nextQuestion} className="arrow-button">
            {currentIndex === questions.length - 1 ? "See Results" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
