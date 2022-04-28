import React, { Component } from "react";
import "./answer.css";
import {
  reportAnswerRequest,
  voteAnswerHelpfulness,
  submitUserAction,
} from "../../../../service/index.js";
import Window from "../../window.jsx";

export default class Answer extends Component {
  constructor(props) {
    super();
    this.state = {
      answer: { ...props.answer },
      showImgWindow: false,
      imgUrl: "",
    };
  }

  pop = (photo) => {
    this.setState({
      showImgWindow: true,
      imgUrl: photo,
    });
    submitUserAction({
      element: "enlarge photo",
      widget: "answers/Q&A",
      time: new Date().toLocaleString(),
    });
  };

  onClick = () => {
    this.setState({
      showImgWindow: false,
    });
    submitUserAction({
      element: "X close answer form",
      widget: "answers/Q&A",
      time: new Date().toLocaleString(),
    });
  };

  onReport = () => {
    let { answer } = this.state;
    answer.reported = !answer.reported;
    reportAnswerRequest(answer.id);
    this.setState({
      answer,
    });
    submitUserAction({
      element: "report",
      widget: "answers/Q&A",
      time: new Date().toLocaleString(),
    });
  };

  onVote = () => {
    let { answer } = this.state;
    // console.log("line23:", this.props.answer.helpfulness, answer.helpfulness);
    if (this.props.answer.helpfulness !== answer.helpfulness) {
      return;
    } else {
      answer.helpfulness = answer.helpfulness + 1;
    }

    // console.log(answer);
    this.setState({
      answer,
    });

    voteAnswerHelpfulness(answer.id);
  };

  render() {
    const { answer } = this.state;
    const date = new Date(answer.date).toLocaleString();

    return (
      <div key={answer.id} className="answer_item">
        <p className="answer_line">
          A: _{answer.body} <br></br>
          <br></br>
        </p>

        <div className="answerer_info" fontWeight="150">
          by:{answer.answerer_name}&nbsp; | Date: {date} <br></br>
        </div>

        {answer.photos.length != 0 && (
          <div className="answerImage" style={{ display: "flex" }}>
            {answer.photos.map((photo, index) => {
              // console.log(photo);
              return (
                <img
                  onClick={() => this.pop(photo)}
                  key={index}
                  width="120"
                  height="100"
                  src={photo}
                ></img>
              );
            })}
          </div>
        )}

        <div className="right">
          <span className="right_item" onClick={() => this.onVote()}>
            Helpful? Yes&nbsp;({answer.helpfulness})&nbsp;|&nbsp;
          </span>
          <a
            className="right_item"
            onClick={() => {
              this.onReport();
            }}
          >
            {answer.reported ? "Reported" : "Report"}
          </a>
        </div>
        <br />
        {this.state.showImgWindow && (
          <Window onClick={this.onClick}>
            <img width="600" height="600" src={this.state.imgUrl}></img>
          </Window>
        )}
      </div>
    );
  }
}
