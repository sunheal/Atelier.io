import React, { Component, createRef } from "react";
import AnswerList from "./AnswerList.jsx";
import {
  voteHelpfulness,
  reportRequest,
  uploadImage as uploadImgFetch,
  addAnswer,
} from "../../../service/index.js";
import Window from "../window.jsx";
import "./QuestionCard.css";
import ReactCoreImageUpload from "react-core-image-upload";
const config = require("../../../../../config.js");

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreAnswers: false,
      tempAnswers: Object.values(this.props.question.answers),
      question: this.props.question,
      reportState: props.reported ? "Reported" : "Report",
      answerForm: false,
      imgUrlList: [],
      form: {
        body: "",
        name: "",
        email: "",
        photos: [],
      },
      preViewImgList: [],
    };
    // console.log(this.state.question);
  }

  onVote = () => {
    // console.log('line 48 props:', this.props);
    let { question } = this.state;
    if (this.props.question.question_helpfulness !== question.question_helpfulness) {
      return;
    }
    question = {
      ...question,
      question_helpfulness: question.question_helpfulness + 1,
      //后面的把前面key一样的覆盖掉
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
    });
  };

  onClick = () => {
    this.setState({
      answerForm: false,
    });
  };

  uploadImg = (event) => {
    const files = Object.values(event.target.files);
    if (files.length > 5) {
      alert("You can only upload 5 images!");
    } else {
      let preViewImgList = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (result) => {
          preViewImgList = [...preViewImgList, result.currentTarget.result];
          this.setState({ preViewImgList });
        };
      });
      this.setState({
        imgUrlList: files,
      });
    }
  };

  uploadMultipleImage(imgUrlArray) {
    let options = {
      url: `https://api.imgbb.com/1/upload?key=${config.imgbbToken}`,
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
    };

    const imgFetchList = imgUrlArray.map((file) => {
      const form = new FormData();
      form.append("image", file);
      options.data = form;
      return uploadImgFetch(options);
    });

    return Promise.all(imgFetchList);
  }

  inputChange = (e, type) => {
    // console.log(e, type);
    const { form } = this.state;
    form[type] = e.target.value;
    this.setState({
      form,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(this.state.form);
    let { form, imgUrlList, question } = this.state;
    let photos = [],
      tempPhotos = [];
    if (imgUrlList.length) {
      tempPhotos = await this.uploadMultipleImage(imgUrlList);
    }
    photos = tempPhotos.map((item) => item.data.data.image.url);
    form.photos = photos;

    addAnswer(question.question_id, form).then((res) => {
      if (res.status === 201) {
        this.props.getQAList()

        this.setState({
          answerForm: false,
        });
      }
      // console.log(res, "*******");
    });
  };

  render() {
    const { question_body, answers, question_helpfulness } = this.props.question;
    const { showMoreAnswers, tempAnswers, question, reportState, showAnswer } =
      this.state;
    const formStyle = {
      width: "400px",
    };

    return (
      <div className="question-wrap">
        <div className="question">
          <h4 style={{ width: "800px" }}>Q: {question.question_body}</h4>
          <div className="right">
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
              <div className="answerWindowWrap">
                <h2 className="title">Submit an Answer</h2>
                <div>
                  <form id="answerForm" onSubmit={this.handleSubmit}>
                    <label className="form">Answer:</label>
                    <textarea
                      className="popFormQ same"
                      type="text"
                      required
                      value={this.state.form.body}
                      onChange={(e) => this.inputChange(e, "body")}
                      name="body"
                    ></textarea>
                    <br></br>

                    <input
                      type="file"
                      placeholder="Upload Your Image Here"
                      multiple
                      onChange={this.uploadImg}
                    ></input>
                    {!!this.state.preViewImgList.length && (
                      <div className="imgPreviewWrap">
                        {this.state.preViewImgList.map((img) => (
                          <img src={img} key={img}></img>
                        ))}
                      </div>
                    )}
                    <label className="form">Nickname:</label>
                    <input
                      className="popFormNickname same"
                      type="text"
                      placeholder="Nickname "
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
        <AnswerList answersArray={tempAnswers}></AnswerList>
      </div>
    );
  }
}

export default QuestionCard;
