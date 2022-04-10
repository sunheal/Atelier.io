import React, { Component } from "react";
import Answers from "./Answers.jsx";
import { voteHelpfulness, reportRequest } from "../../../service/index.js";
import Window from "../window.jsx";
import "./QuestionCard.css";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreAnswers: false,
      tempAnswers: Object.values(this.props.answers).slice(0, 2),
      question: this.props,
      reportState: props.reported ? "reported" : "report",
      answerForm: false,
    };
  }

  onSeeMoreAnswersClick = () => {
    this.setState({ tempAnswers: this.props.answers });
  };
  onCollapseAnswersClick = () => {
    this.setState({
      tempAnswers: Object.values(this.props.answers).slice(0, 2),
    });
  };

  onVote = () => {
    // console.log('props', this.props);
    // console.log('question', this.state.question);
    let { question } = this.state;
    if (this.props.question_helpfulness !== question.question_helpfulness) {
      return;
    }
    question = {
      ...question,
      question_helpfulness: question.question_helpfulness + 1,
    };
    voteHelpfulness(question.question_id);
    // console.log("line35 ", question.question_id);
    this.setState({
      question,
    });
  };

  onReport = () => {
    let { reportState, question } = this.state;
    reportRequest(question.question_id);
    this.setState({
      reportState:
        this.state.reportState === "reported" ? "report" : "reported",
    });
  };

  addAnswerForm = () => {
    this.setState({
      answerForm: true,
      // answerForm: !this.state.answerForm 问一下
    });
  };

  onClick = () => {
    this.setState({
      answerForm: false,
    });
  };

  render() {
    const { question_body, answers, question_helpfulness } = this.props;
    const { showMoreAnswers, tempAnswers, question, reportState } = this.state;
    const formStyle = {
      width: "400px",
    };

    return (
      <div>
        <div className="question">
          <h3>Q: {question.question_body}</h3>
          <div className="right">
            <span className="right_item" onClick={this.onVote}>
              Helpful? Yes ({question.question_helpfulness})
            </span>
            <a className="right_item" onClick={() => this.addAnswerForm()}>
              add Answer
            </a>
            <a className="right_item" onClick={this.onReport}>
              {reportState}
            </a>
          </div>

          {this.state.answerForm && (
            <Window onClick={this.onClick}>
              <div className="windowWrap">
                <h2 className="title">Ask a New Question</h2>
                <br></br>
                <div>
                  <form id="questionForm">
                    <input type="file"placeholder="122" />
                    <label className="form">Question:</label>
                    <textarea className="popFormQ same" type="text"></textarea>
                    <br></br>
                    <label className="form">Nickname:</label>
                    <input className="popFormNickname same" type="text"></input>
                    <br></br>
                    <label className="form">Email:</label>
                    <input className="popFormEmail same" type="text"></input>
                    <br></br>
                    <button className="formButton">Submit</button>
                  </form>
                </div>
              </div>
            </Window>
          )}
        </div>
        <Answers answersArray={tempAnswers}></Answers>
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
    );
  }
}

export default QuestionCard;
