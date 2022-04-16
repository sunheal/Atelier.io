import React, { Component } from "react";
import {
  voteAnswerHelpfulness,
  reportAnswerRequest,
} from "../../../service/index.js";
import Window from "../window.jsx";
import "./answer.css";

class Answers extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props, "===============");
    this.state = {
      answersArray: [...Object.values(props.answersArray)],
      reportState: props.reported ? "Reported" : "Report",
      showImgWindow: false,
      imgUrl: "",
    };
  }

  onVote = (index) => {
    const tempAnswersArray = [...this.props.answersArray];
    const { answersArray } = this.state;
    if (
      Object.values(this.props.answersArray)[index].helpfulness !==
      answersArray[index].helpfulness
    ) {
      return;
    }

    answersArray[index].helpfulness++;
    voteAnswerHelpfulness(answersArray[index].id);
    this.setState({
      answersArray,
    });
  };

  onReport = (index) => {
    let { reportState, answersArray } = this.state;
    reportAnswerRequest(answersArray[index].id);
    this.setState({
      reportState:
        this.state.reportState === "Reported" ? "Report" : "Reported",
    });
  };

  pop = (photo) => {
    this.setState({
      showImgWindow: true,
      imgUrl: photo,
    });
  };

  onClick = () => {
    this.setState({
      showImgWindow: false,
    });
  };

  render() {
    let answersArray = this.state.answersArray;
    answersArray.sort((a, b) => b.helpfulness - a.helpfulness);
    return (
      <div>
        {answersArray.map((item, index) => {
          const date = new Date(item.date).toLocaleDateString("en-US");
          return (
            <div key={item.id} className="answer_item">
              <p className="answer_line">
                A: _{item.body}  <br></br>
                <br></br>
              </p>
                <div className="answerer_info" fontWeight='150'>
                  by:{item.answerer_name}&nbsp; | Date: {date} <br></br>
            </div>
              {
            item.photos.length != 0 && (
              <div className="answerImage" style={{ display: "flex" }}>
                {item.photos.map((photo, index) => {
                  return (
                    <img
                      onClick={() => this.pop(photo)}
                      key={index}
                      width="100"
                      height="68"
                      src={photo}
                    ></img>
                  );
                })}
              </div>
            )
          }
              <div className="right">
                <span className="right_item" onClick={() => this.onVote(index)}>
                  Helpful? Yes&nbsp;({(item.helpfulness)})&nbsp;|&nbsp;
                </span>
                <a className="right_item" onClick={() => this.onReport(index)}>
                  {this.state.reportState}
                </a>
              </div>
              <br />
          {
            this.state.showImgWindow && (
              <Window onClick={this.onClick}>
                <img width="600" height="600" src={this.state.imgUrl}></img>
              </Window>
            )
          }
            </div>
    );
  })
}
      </div >
    );
  }
}

export default Answers;
