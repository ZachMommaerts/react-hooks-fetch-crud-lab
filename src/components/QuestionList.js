import React, {useEffect} from "react";
import QuestionItem from "./QuestionItem";
import { useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  const fetchQuestions = () => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(questionList => setQuestions(questionList))
  }
  useEffect(fetchQuestions, [])

  const handleUpdateAnswer = (e, question) => {
    question.correctIndex = e.target.value;

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'correctIndex': e.target.value
      })
    })
  }

  const handleDelete = (id) => {
    const deletedList = questions.filter(question => question.id !== id)
    setQuestions(deletedList);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })

  }

  const questionsToDisplay = questions.map(question => {
    return (
      <QuestionItem
      onUpdateAnswer={handleUpdateAnswer}
      onDelete={handleDelete}
      key={question.id}
      question={question}
      />
    )
  })
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsToDisplay}</ul>
    </section>
  );
}

export default QuestionList;
