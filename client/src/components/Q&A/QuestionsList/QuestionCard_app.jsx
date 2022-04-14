import React, { Component } from "react";
import Answers from "./Answers.jsx";
import { voteHelpfulness, reportRequest } from "../../../service/index.js";
import Window from "../window.jsx";
import "./QuestionCard.css";
import ReactCoreImageUpload from "react-core-image-upload";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreAnswers: false,
      tempAnswers: Object.values(this.props.answers).slice(0, 2),
      question: this.props,
      reportState: props.reported ? "Reported" : "Report",
      answerForm: false,
    };
  }

  onSeeMoreAnswersClick = () => {
    console.log(this.state.tempAnswers, this.props.answers);
    this.setState({ tempAnswers: Object.values(this.props.answers) }, () => {
      console.log(this.state.tempAnswers);
    });
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
    this.setState({
      question,
    });
  };

  onReport = () => {
    let { reportState, question } = this.state;
    reportRequest(question.question_id);
    this.setState({
      reportState:
        this.state.reportState === "Reported" ? "Report" : "Reported",
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

  imageUploaded(res) {
    if (res.errcode == 0) {
      this.setState({
        src: res.data.src,
      });
    }
    console.log("res:", res);
  }

  render() {
    const { question_body, answers, question_helpfulness } = this.props;
    const { showMoreAnswers, tempAnswers, question, reportState, showAnswer } =
      this.state;
    const formStyle = {
      width: "400px",
    };

    return (
      <div className="question-wrap">
        <div className="question">
          <h4>Q: {question.question_body}</h4>
          <div className="right" >
            <span className="right_item" onClick={this.onVote}>
              Helpful? Yes ({question.question_helpfulness}) |
            </span>
            <a className="right_item" onClick={() => this.addAnswerForm()}>
              add Answer |
            </a>
            <a className="right_item" onClick={this.onReport}>
              {reportState}
            </a>
          </div>

          {this.state.answerForm && (
            <Window onClick={this.onClick}>
              <div className="windowWrap">
                <h2 className="title">Submit an Answer</h2>
                <br></br>
                <div>
                  <form id="answerForm">
                    <label className="form">Answer:</label>
                    <textarea className="popFormQ same" type="text"></textarea>
                    <br></br>
                    <button className="imgUpload">
                      <ReactCoreImageUpload
                        text="Upload Your Image (5 max)"
                        url="https://api.imgbb.com/1/upload"
                        imageUploaded={() => this.imageUploaded()}
                      ></ReactCoreImageUpload>
                    </button>
                    <label className="form">Nickname:</label>
                    <input className="popFormNickname same" type="text" placeholder="Nickname "></input>
                    <br></br>
                    <label className="form">Email:</label>
                    <input className="popFormEmail same" type="text" placeholder="Email"></input>
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
