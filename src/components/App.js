import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  const fetchQuestions = () => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(questionList => setQuestions(questionList))
  }
  useEffect(fetchQuestions, [])


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} setQuestions={setQuestions}/> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;
