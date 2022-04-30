import React, { Component } from "react";
import {
  voteAnswerHelpfulness,
  reportAnswerRequest,
  submitUserAction,
} from "../../../service/index.js";
import Window from "../window.jsx";
import Answer from "./answer/answer.jsx";
import "./answerlist.css";

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersArray: props.answersArray.reverse(),
      tempAnswers: props.answersArray.slice(0, 2).reverse(),
      showImgWindow: false,
      imgUrl: "",
      reportStatus: "Report",
    };
  }


  onSeeMoreAnswersClick = () => {
    const { answersArray, tempAnswers } = this.state;
    this.setState({
      tempAnswers: answersArray,
    });
  };

  onCollapseAnswersClick = () => {
    const { answersArray, tempAnswers } = this.state;
    this.setState({
      tempAnswers: answersArray.slice(0, 2),
    });
  };

  render() {
    let { answersArray, tempAnswers } = this.state;
    return (
      <div>
        {tempAnswers.map((item, index) => {
          item.reported = false;

          return <Answer key={item.id} answer={item} />;
        })}
        {answersArray.length > 2 && (
          <div>
            {tempAnswers.length <= 2 ? (
              <button
                style={{ margin: "10px 0" }}
                onClick={this.onSeeMoreAnswersClick}
              >
                See more answers
              </button>
            ) : (
              <button
                style={{ margin: "10px 0" }}
                onClick={this.onCollapseAnswersClick}
              >
                Collapse answers
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AnswerList;
