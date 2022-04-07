import React, { Component } from "react";
import Answers from "./Answers.jsx";
import { voteHelpfulness, reportRequest } from "../../../service/index.js";
import Window from "../window.jsx";

class QuestionCard extends React.Component {
  constructor(props) {
<<<<<<< HEAD
    super(props);
    this.state = {
=======
    super(props)
    // console.log(props.answers)
    this.state= {
>>>>>>> 94bec895d952eb0839950366f1f43978a02565a8
      showMoreAnswers: false,
      tempAnswers: Object.values(this.props.answers).slice(0, 2),
      question: this.props,
      reportState: props.reported ? "reported" : "report",
      answerForm: false
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
      answerForm: true
      // answerForm: !this.state.answerForm 问一下
    })
  }

  onClick = () => {
    this.setState({
      answerForm:false
    })
  }

  render() {
    const { question_body, answers, question_helpfulness } = this.props;
    const { showMoreAnswers, tempAnswers, question, reportState } = this.state;

    return (
      <div>
        <div className="question">
          <h3>Q: {question.question_body}</h3>
          <div className="right">
            <span className="right_item" onClick={this.onVote}>
              Helpful? Yes ({question.question_helpfulness})
            </span>
            <a className="right_item" onClick={() => this.addAnswerForm()}>add Answer</a>
            <a className="right_item" onClick={this.onReport}>
              {reportState}
            </a>
          </div>

          <div>
          {this.state.AnswerForm && <Window onClick={this.onClick}><form width="500" height="800"></form>
          <label className="popFormQ">Question:</label><br></br>
          <input type="text" width="350" height="250"></input><br></br>
          <label className="popFormNickname">Question:</label><br></br>
          <input type="text" width="350" height="100"></input><br></br>
          <label className="popFormEmail">Question:</label><br></br>
          <input type="text" width="350" height="150"></input><br></br>
          <button>Submit</button>
          </Window>}
          </div>

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
