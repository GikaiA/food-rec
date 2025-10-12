import React, { useState } from "react";
import "./Questions.css";
import { useNavigate } from "react-router-dom"; // Import navigation

const Questions = () => {
  const navigate = useNavigate(); //  Hook for navigation

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
      options: [
        "Burgers",
        "Pizza",
        "Chinese",
        "Salads",
        "Italian",
        "Mexican",
        "Desserts",
      ],
    },
    {
      id: 4,
      text: "What is your address?",
      type: "input",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  //  Handle checkbox selection
  const handleCheckboxChange = (questionId, option) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(option)) {
        // remove if already selected
        return {
          ...prev,
          [questionId]: currentAnswers.filter((a) => a !== option),
        };
      } else {
        // add new option
        return {
          ...prev,
          [questionId]: [...currentAnswers, option],
        };
      }
    });
  };

  //  Handle text input
  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Go to next/previous questions
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Submit & Navigate to Results
  const handleSubmit = () => {
    const preferences = {
      mealType: answers[1] || [],
      dietaryRestrictions: answers[2] || [],
      cuisine: answers[3] || [],
      address: answers[4] || "",
    };

    console.log("Collected Preferences:", preferences);

    navigate("/results", { state: { preferences } }); // pass data to results page
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="questions">
      <div className="questions-container">
        {/* Question text */}
        <h1 className="question">{currentQuestion.text}</h1>

        {/* Answer section */}
        <div className="checkbox-section">
          {currentQuestion.type === "input" ? (
            <input
              type="text"
              className="home-address-field"
              placeholder="Enter your home address"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) =>
                handleInputChange(currentQuestion.id, e.target.value)
              }
            />
          ) : (
            currentQuestion.options?.map((option, idx) => (
              <label key={idx} className="option">
                <input
                  type="checkbox"
                  checked={
                    answers[currentQuestion.id]?.includes(option) || false
                  }
                  onChange={() =>
                    handleCheckboxChange(currentQuestion.id, option)
                  }
                />
                {option}
              </label>
            ))
          )}
        </div>

        {/* Navigation buttons */}
        <div className="arrow-buttons">
          {currentIndex > 0 && (
            <button onClick={prevQuestion} className="arrow-button">
              Previous
            </button>
          )}

          {currentIndex < questions.length - 1 ? (
            <button onClick={nextQuestion} className="arrow-button">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="arrow-button submit">
              See Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
