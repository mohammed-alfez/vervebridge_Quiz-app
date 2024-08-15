import "./Quiz.css"; 
import { useState, useRef } from "react"; 
import { data } from "../../assets/data"; 

const Quiz = () => {
  // State variables
  let [index, setIndex] = useState(0); // Track the current question index
  let [question, setQuestion] = useState(data[index]); // Track the current question
  let [lock, setLock] = useState(false); // Lock interaction after an answer is selected
  let [score, setScore] = useState(0); // Track the user's score
  let [result, setResult] = useState(false); // Determine if the quiz is finished

  // Refs for options
  let Option1 = useRef(null); 
  let Option2 = useRef(null); 
  let Option3 = useRef(null); 
  let Option4 = useRef(null); 

  // Array of option refs
  let option_array = [Option1, Option2, Option3, Option4];

  // Function to check the selected answer
  const checkAnswer = (e, ans) => {
    if (lock === false) { // Check if interaction is not locked
      if (question.ans === ans) { // Check if the selected answer is correct
        e.target.classList.add("correct"); // Add the correct class for styling
        setLock(true); // Lock further interactions
        setScore((prev) => prev + 1); // Increment score
      } else {
        e.target.classList.add("incorrect"); // Add the incorrect class for styling
        setLock(true); // Lock further interactions
        option_array[question.ans - 1].current.classList.add("correct"); // Highlight correct answer
      }
    }
  };

  // Function to move to the next question
  const nextQuestion = () => {
    if (lock === true) { // Check if interaction is locked (answer has been selected)
      if (index === data.length - 1) { // Check if it's the last question
        setResult(true); // Show results
        return 0;
      }
      setIndex(++index); // Increment the question index
      setQuestion(data[index]); // Set the next question
      setLock(false); // Unlock interactions
      option_array.map((option) => { // Reset the classes for options
        option.current.classList.remove("correct");
        option.current.classList.remove("incorrect");
        return null;
      });
    }
  };

  // Function to reset the quiz
  const resetQuiz = () => {
    setIndex(0); // Reset index to the first question
    setQuestion(data[0]); // Set the question to the first one
    setScore(0); // Reset the score
    setLock(false); // Unlock interactions
    setResult(false); // Reset result view
  };

  // Render the component
  return (
    <div className="container">
      <h1>Quiz</h1>
      <hr />
      {result ? ( // Check if the result view should be shown
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button className="btn" onClick={resetQuiz}>RESET</button>
        </>
      ) : ( // Show the question view if the quiz is ongoing
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button className="btn" onClick={nextQuestion}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz; 
