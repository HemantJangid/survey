import { useState } from "react";

function Survey() {
  const [questions, setQuestions] = useState([
    {
      num: 1,
      question: "How satisfied are you with our products?",
      maxRating: 5,
      ans: undefined,
    },
    {
      num: 2,
      question: "How fair are the prices compared to similar retailers?",
      maxRating: 5,
      ans: undefined,
    },
    {
      num: 3,
      question:
        "How satisfied are you with the value for money of your purchase?",
      maxRating: 5,
      ans: undefined,
    },
    {
      num: 4,
      question:
        "On a scale of 1-10 how would you recommend us to your friends and family?",
      maxRating: 10,
      ans: undefined,
    },
    {
      num: 5,
      question: "What could we do to improve our service?",
      maxRating: 5,
      ans: undefined,
    },
  ]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [ans, setAns] = useState(undefined);
  const [pageToShow, setPageToShow] = useState("welcome");

  function handleNext() {
    if (questionIndex == questions.length - 1) {
      if (window.confirm("Do you wish to submit the survey?")) {
        setPageToShow("thankyou");
        let surveyResponse = {
          questions: [...questions],
          completed: true,
        };
        localStorage.setItem("surveyResponse", JSON.stringify(surveyResponse));
        let temp = [...questions];
        temp.forEach((question) => {
          question.ans = undefined;
        });
        setQuestions(temp);
        setQuestionIndex(0);
        setAns(undefined);
        setTimeout(() => {
          setPageToShow("welcome");
        }, 5000);
      }
      return;
    }
    let data = {
      num: questions[questionIndex].num,
      question: questions[questionIndex].question,
      ans: ans,
    };
    console.log(data);
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
      Customer Survey
      {pageToShow == "welcome" && (
        <div style={{ padding: 100, display: "flex", flexDirection: "column" }}>
          Welcome, To start the survey click below
          <button onClick={handleSurveyStart} style={{ marginTop: 20 }}>
            Start
          </button>
        </div>
      )}
      {pageToShow == "question" && (
        <>
          <span style={{ alignSelf: "flex-end", marginTop: 100 }}>
            {questionIndex + 1}/{questions.length}
          </span>
          <div
            style={{
              marginTop: 100,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>
              {questions[questionIndex].num}.{" "}
              {questions[questionIndex].question}
            </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {[...Array(questions[questionIndex].maxRating)].map((e, i) => (
                <div style={{ margin: 10 }} key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={i}
                    checked={ans == i}
                    onChange={onRatingChange}
                  />
                  <label>{i + 1}</label>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              marginBottom: 100,
              marginTop: 100,
              display: "flex",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <button onClick={handlePrevious} disabled={questionIndex == 0}>
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={questionIndex == questions.length}
            >
              Next
            </button>
          </div>
        </>
      )}
      {pageToShow == "thankyou" && (
        <div style={{ padding: 100 }}>
          ThankYou for taking your time to fill this survey
        </div>
      )}
    </div>
  );
}

export default Survey;
