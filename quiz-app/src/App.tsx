import { useMemo, useState } from "react";
import "./App.css";
import { questions } from "./data/questions";
import type { UserAnswer } from "./types";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const score = useMemo(() => {
    return answers.filter((answer) => answer.isCorrect).length;
  }, [answers]);

  const handleAnswerSubmit = () => {
    if (!selectedAnswerId) return;

    const selectedOption = currentQuestion.options.find(
      (option) => option.id === selectedAnswerId
    );

    if (!selectedOption) return;

    const isCorrect = selectedAnswerId === currentQuestion.correctAnswerId;

    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswerId,
      selectedAnswerText: selectedOption.text,
      correctAnswerId: currentQuestion.correctAnswerId,
      isCorrect,
    };

    setAnswers((prev) => [...prev, userAnswer]);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      setQuizFinished(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswerId(null);
    setShowFeedback(false);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswerId(null);
    setShowFeedback(false);
    setQuizFinished(false);
  };

  const getPersonalMessage = () => {
    const total = questions.length;

    if (score === total) {
      return "Suurepärane töö! Kõik vastused õiged.";
    }

    if (score >= 2) {
      return "Väga tubli! Sul on teema hästi selge.";
    }

    return "Hea algus! Proovi uuesti ja saad veel parema tulemuse.";
  };

  if (quizFinished) {
    return (
      <main className="app">
        <div className="container">
          <header className="header">
            <p className="eyebrow">EESTI VIKTORIIN</p>
            <h1>Tulemused</h1>
            <p className="score" data-testid="final-score">
              Lõppskoor: {score} / {questions.length}
            </p>
            <p className="message">{getPersonalMessage()}</p>
          </header>

          <section className="results-section">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Küsimus</th>
                  <th>Sinu vastus</th>
                  <th>Tulemus</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((answer) => (
                  <tr key={answer.questionId}>
                    <td>{answer.question}</td>
                    <td>{answer.selectedAnswerText}</td>
                    <td className={answer.isCorrect ? "correct" : "wrong"}>
                      {answer.isCorrect ? "Õige" : "Vale"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <button className="primary-button" onClick={handleRestart}>
            Alusta uuesti
          </button>
        </div>
      </main>
    );
  }

  const latestAnswer = answers[answers.length - 1];
  const latestAnswerCorrect = latestAnswer?.isCorrect;

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <p className="eyebrow">EESTI VIKTORIIN</p>
          <h1>Pane oma teadmised proovile</h1>
          <p className="progress">
            Küsimus {currentQuestionIndex + 1} / {questions.length}
          </p>
          <p className="score" data-testid="live-score">
            Punktid: {score}
          </p>
        </header>

        <section className="card">
          <h2 className="question">{currentQuestion.question}</h2>

          <div className="options">
            {currentQuestion.options.map((option) => (
              <label
                key={option.id}
                className={`option ${
                  selectedAnswerId === option.id ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={selectedAnswerId === option.id}
                  onChange={() => setSelectedAnswerId(option.id)}
                  disabled={showFeedback}
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>

          {!showFeedback ? (
            <button
              className="primary-button"
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswerId}
            >
              Vasta
            </button>
          ) : (
            <>
              <div
                className={`feedback ${latestAnswerCorrect ? "success" : "error"}`}
                data-testid="feedback"
              >
                {latestAnswerCorrect
                  ? "Õige vastus!"
                  : "Vale vastus. Proovi järgmisega paremini!"}
              </div>

              <button className="primary-button" onClick={handleNextQuestion}>
                {currentQuestionIndex === questions.length - 1
                  ? "Vaata tulemusi"
                  : "Järgmine küsimus"}
              </button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;