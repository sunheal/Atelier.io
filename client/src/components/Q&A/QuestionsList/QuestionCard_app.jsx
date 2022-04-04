import React, { Component } from "react";

import Answers from "./Answers.jsx";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.answers);
  }

  render() {
    const {question_body, answers} = this.props;

    const onSeeMoreAnswersClick = () => {
    }

    return (
      <div>
        <h3>{question_body}</h3>
        <Answers answersArray={answers} ></Answers>
        {Object.keys(answers).length > 2
          ? <button onClick={onSeeMoreAnswersClick}>See more answers</button>
          : <></>
        }
      </div>
    );
  }
}

export default QuestionCard;
