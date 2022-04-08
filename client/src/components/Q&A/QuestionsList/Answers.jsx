import React, { Component } from "react";
import { voteAnswerHelpfulness, reportAnswerRequest } from "../../../service/index.js";
import Window from '../window.jsx';

class Answers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answersArray: [...Object.values(props.answersArray)],
      reportState: props.reported ? "reported" : "report",
      showImgWindow: false,
      imgUrl:''
    }
  }

  onVote = (index) => {
    console.log('props', this.props.answersArray);
    console.log('answer', this.state.answersArray);
    console.log(index)
    const tempAnswersArray =[...this.props.answersArray]
    const { answersArray } = this.state;
    console.log(tempAnswersArray[index].helpfulness , answersArray[index].helpfulness)
    if(Object.values(this.props.answersArray)[index].helpfulness !== answersArray[index].helpfulness) {
      return;
    };

    answersArray[index].helpfulness++
    voteAnswerHelpfulness(answersArray[index].id)
    this.setState({
      answersArray
    })
  };

  onReport = (index) => {
    let {reportState, answersArray} = this.state;
    reportAnswerRequest(answersArray[index].id);
    this.setState({
      reportState:
      this.state.reportState === "reported" ? "report" : "reported",
    })
  }

  pop = (photo) =>{
    this.setState({
      showImgWindow: true,
      imgUrl: photo
    })
  }

  onClick = () =>{
    this.setState({
      showImgWindow:false
    })
  }

  render() {
    let answersArray = this.state.answersArray;

    answersArray.sort((a, b) => b.helpfulness - a.helpfulness);
    return (
      <div>
        {answersArray.map((item, index) => {
          const date = new Date(item.date).toLocaleDateString("en-US");
          return (
            <div key={item.id}>
              <p>
                A: {item.body} {item.id} <br></br>
                name:{item.answerer_name}&nbsp; date: {date} <br></br>
              </p>
              <div className="right">
                <span className="right_item" onClick={() => this.onVote(index) }>
                  Helpful? Yes&nbsp;({item.helpfulness})&nbsp;
                </span>
                <a className="right_item" onClick={() => this.onReport(index)}>{this.state.reportState}</a>
              </div>
              <br/>

              {item.photos.length != 0 && (
                <div className="answerImage" style={{ display: "flex" }}>
                  {item.photos.map((photo, index) => {
                    return (
                      <img onClick={()=>this.pop(photo)}
                        key={index}
                        width="100"
                        height="100"
                        src={photo}
                      ></img>
                    );
                  })}
                </div>
              )}
              { this.state.showImgWindow && <Window onClick={this.onClick}><img width="600" height="600" src={this.state.imgUrl}></img></Window>}
            </div>
          );
        })}

      </div>
    );
  }
}

export default Answers;
