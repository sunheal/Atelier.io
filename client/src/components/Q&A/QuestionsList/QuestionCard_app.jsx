import React, { Component } from "react";

import Answers from "./Answers.jsx";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.answers)
    this.state= {
      showMoreAnswers: false,
      tempAnswers: Object.values(this.props.answers).slice(0,2)
    }
  }

  onSeeMoreAnswersClick = () => {
    this.setState({tempAnswers:this.props.answers})
  }
  onCollapseAnswersClick = () => {
    this.setState({tempAnswers:Object.values(this.props.answers).slice(0,2)})
  }

  render() {
    const { question_body, answers } = this.props;
    const {showMoreAnswers, tempAnswers} = this.state
    console.log(tempAnswers);

    return (
      <div>
        <div>
          <h3>Q: {question_body}</h3>
          <div className="right">

          </div>
        </div>
        <Answers answersArray={tempAnswers}></Answers>
        {tempAnswers.length <= 2 ?
          <button onClick={this.onSeeMoreAnswersClick}>See more answers</button>
        :
          <button onClick={this.onCollapseAnswersClick}>Collapse answers</button>
        }
      </div>
    );
  }
}

export default QuestionCard;
