import React, { Component } from "react";
import QuestionsList from "./QuestionsList.jsx";
import ReactCoreImageUpload from "react-core-image-upload";
import Window from "../Q&A/window.jsx";
import "../Q&A/window.css";
const config = require("../../../../config.js");
import { addQuestion, submitUserAction } from "../../service/index.js";
import { sendAction } from "../../utils/tracker.js";


class QandA extends Component {
  constructor(props) {
    super(props);
    console.log(props.productID, '============')
    this.state = {
      product_id: props.productID,
      questionForm: false,
      form: {
        body: "",
        name: "",
        email: "",
        product_id: props.productID,
      },
    };
  }

static getDerivedStateFromProps(props, state){
    return {
      product_id:props.productID
    }
  }

  ask = () => {
    this.setState({
      questionForm: true,
    });

    sendAction({
      element: "ask a question button",
      widget: "QandA_app/Q&A",
    });
  };

  onClick = () => {
    this.setState({
      questionForm: false,
    });
    submitUserAction({
      element: "X close window",
      widget: "QandA_app/Q&A",
      time: new Date().toLocaleString(),
    });
  };

  inputChange = (e, type) => {
    const { form } = this.state;
    form[type] = e.target.value;
    this.setState({
      form,
    });

    submitUserAction({
      element: "filling question form",
      widget: "QandA_app/Q&A",
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let { form, question } = this.state;
    console.log(form);
    addQuestion(form).then((res) => {
      console.log(res);
      if (res.status === 201) {
        this.setState({
          questionForm: false,
        });
      }
    });
    submitUserAction({
      element: "question submit button",
      widget: "QandA_app/Q&A",
      time: new Date().toLocaleString(),
    });
  };

  render() {
    return (
      <div
        id="QandA"
        style={{ minWidth: "1200px", margin: "0 auto" }}
      >
        <div className="QA_line">
          <h2 className="left">Questions & Answers</h2>
          <button className="right" onClick={() => this.ask()}>
            Ask a Question
          </button>
        </div>
        <QuestionsList product_id={this.state.product_id} />

        {this.state.questionForm && (
          <Window onClick={this.onClick}>
            <div className="windowWrap">
              <h2 className="title">Submit a Question</h2>
              <div>
                <form id="questionForm" onSubmit={this.handleSubmit}>
                  <label className="form">Question:</label>
                  <textarea
                    className="popFormQ same"
                    type="text"
                    required
                    value={this.state.form.body}
                    onChange={(e) => this.inputChange(e, "body")}
                    name="body"
                  ></textarea>
                  <br></br>

                  <label className="form">Nickname:</label>
                  <input
                    className="popFormNickname same"
                    type="text"
                    placeholder="Nickname"
                    required
                    value={this.state.form.name}
                    onChange={(e) => this.inputChange(e, "name")}
                    name="name"
                  ></input>
                  <br></br>
                  <label className="form">Email:</label>
                  <input
                    className="popFormEmail same"
                    type="email"
                    placeholder="Email"
                    required
                    value={this.state.form.email}
                    onChange={(e) => this.inputChange(e, "email")}
                    name="email"
                  ></input>
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
