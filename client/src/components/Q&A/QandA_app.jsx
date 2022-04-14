import React, { Component } from "react";
import QuestionsList from "./QuestionsList.jsx";
import ReactCoreImageUpload from "react-core-image-upload";
import Window from "../Q&A/window.jsx";
import "../Q&A/window.css";

class QandA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 64620,
      questionForm:false,
    };
  }

  ask =() => {
    this.setState({
      questionForm:true,
    });
  };

  onClick =() => {
    this.setState({
      questionForm: false,
    });
  }

  render() {
    return (
      <div id="QandA" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="QA_line">
          <h2 className="left">Questions & Answers</h2>
          <button className="right" onClick={()=> this.ask()}>Ask a Question</button>
        </div>
        <QuestionsList product_id={40356} />

        {this.state.questionForm && (
          <Window onClick={this.onClick}>
            <div className="windowWrap">
              <h2 className="title">Submit a Question</h2>
              <br></br>
              <div>
                <form id="questionForm">
                  <label className="form" >Question:</label>
                  <textarea className="popFormQ same" type="text" required></textarea>
                  <br></br>
                  <button className="imgUpload">
                    <ReactCoreImageUpload
                      text="Upload Your Image (5 max)"
                      url="https://api.imgbb.com/1/upload"
                      imageUploaded={() => this.imageUploaded()}
                    ></ReactCoreImageUpload>
                  </button>
                  <label className="form">Nickname:</label>
                  <input className="popFormNickname same" type="text" placeholder="Nickname" required></input>
                  <br></br>
                  <label className="form">Email:</label>
                  <input className="popFormEmail same" type="email" placeholder="Email" required></input>
                  <br></br>
                  <button className="formButton">Submit</button>
                </form>
              </div>
            </div>
          </Window>
        )}
      </div>
    );
  }
}

export default QandA;
