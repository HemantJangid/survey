import { useState } from "react";

function Survey() {
  const [questions, setQuestions] = useState([
    {
      num: 1,
      question: "How satisfied are you with our products?",
      maxRating: 5,
      type: "RATING",
      ans: undefined,
    },
    {
      num: 2,
      question: "How fair are the prices compared to similar retailers?",
      maxRating: 5,
      type: "RATING",
      ans: undefined,
    },
    {
      num: 3,
      question:
        "How satisfied are you with the value for money of your purchase?",
      maxRating: 5,
      type: "RATING",
      ans: undefined,
    },
    {
      num: 4,
      question:
        "On a scale of 1-10 how would you recommend us to your friends and family?",
      maxRating: 10,
      type: "RATING",
      ans: undefined,
    },
    {
      num: 5,
      question: "What could we do to improve our service?",
      type: "TEXT",
      ans: undefined,
    },
  ]);

  const [name, setName] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [ans, setAns] = useState(undefined);
  const [pageToShow, setPageToShow] = useState("welcome");

  function handleNext() {
    if (questionIndex === questions.length - 1) {
      if (window.confirm("Do you wish to submit the survey?")) {
        setPageToShow("thankyou");
        let surveyResponse = {
          questions: [...questions],
          completed: true,
        };
        localStorage.setItem(name, JSON.stringify(surveyResponse));
        let temp = [...questions];
        temp.forEach((question) => {
          question.ans = undefined;
        });
        setQuestions(temp);
        setQuestionIndex(0);
        setAns(undefined);
        setName("");
        setTimeout(() => {
          setPageToShow("welcome");
        }, 5000);
      }
      return;
    }
    setAns(questions[questionIndex + 1].ans);
    setQuestionIndex(questionIndex + 1);
  }

  function handlePrevious() {
    setAns(questions[questionIndex - 1].ans);
    setQuestionIndex(questionIndex - 1);
  }

  function onRatingChange(e) {
    let temp = [...questions];
    temp[questionIndex].ans = e.target.value;

    setAns(e.target.value);
    setQuestions(temp);
  }

  function handleSurveyStart() {
    setPageToShow("question");
  }

  return (
    <div className="survey-container">
      <h1 style={{ fontWeight: 800 }}>Customer Survey</h1>

      {/* show welcome section */}
      {pageToShow === "welcome" && (
        <div style={{ padding: 100, display: "flex", flexDirection: "column" }}>
          <p style={{ marginBottom: 30 }}>
            Welcome, To start the survey click below
          </p>
          <input
            type="text"
            value={name}
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="start"
            onClick={handleSurveyStart}
            style={{ marginTop: 20 }}
            disabled={name.length === 0}
          >
            Start
          </button>
        </div>
      )}

      {/* show question */}
      {pageToShow === "question" && (
        <>
          <span
            style={{
              alignSelf: "flex-end",
              marginTop: 50,
              background: "#05595b",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {questionIndex + 1}/{questions.length}
          </span>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>
              {questions[questionIndex].num}.{" "}
              {questions[questionIndex].question}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              {questions[questionIndex].type === "RATING" ? (
                [...Array(questions[questionIndex].maxRating)].map((e, i) => (
                  <div style={{ margin: 10 }} key={i}>
                    <input
                      id={i}
                      type="radio"
                      name="rating"
                      value={i}
                      checked={parseInt(ans) === i}
                      onChange={onRatingChange}
                    />
                    <label htmlFor={i}>{i + 1}</label>
                  </div>
                ))
              ) : (
                <input type="text" value={ans} onChange={onRatingChange} />
              )}
            </div>
          </div>
          <div
            style={{
              marginBottom: 50,
              marginTop: 60,
              display: "flex",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={handlePrevious}
              disabled={questionIndex === 0}
              className="prev"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={questionIndex === questions.length}
              className="next"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* show thanyou section */}
      {pageToShow === "thankyou" && (
        <div style={{ padding: 100 }}>
          ThankYou for taking your time to fill this survey
        </div>
      )}
    </div>
  );
}

export default Survey;
