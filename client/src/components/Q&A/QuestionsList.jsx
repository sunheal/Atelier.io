import React, { Component } from "react";
import axios from "axios";
import config from "../../../../config.js";
import QuestionCard from "./QuestionsList/QuestionCard_app.jsx";
import { getQAList } from "../../service/index.js";
import SearchBar from "../Q&A/QuestionsList/search-bar/SearchBar.jsx";

const host = "localhost:3111";
const headers = {
  Authorization: `${config.TOKEN}`,
};
class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: { product_id: "", results: [] },
      id: "",
      currentQuestions: [],
      showMoreQuestions: true,
      // tempQuestions:Object.values(this.props.questions).slice(0,2)
    };
    console.log("line22 this.state:", this.state);
  }

  componentDidMount() {
    getQAList(this.props.product_id).then((res) => {
      // console.log(res.data, '+++++++++++++++++++++++')
      const tempData = res.data.results.filter((item) => !item.reported);
      // console.log(tempData)
      this.setState({
        questions: res.data,
        id: res.data.product_id,
        currentQuestions: res.data.results.slice(0, 2),
      });
    });
  }

  showQuestionStatus = () => {
    return;
  };

  onSearch = (value) => {
    // console.log(value, "父组件");
    const { questions } = this.state;
    console.log(questions);
    const currentQuestions = questions.results.filter((item) => {
      if (item.question_body.includes(value)) {
        return item;
      }
    });
    this.setState({
      currentQuestions,
    });
    console.log("line49 current Questions:", currentQuestions);
  };

  onSeeMoreQuestionsClick = () => {
    let { currentQuestions, questions } = this.state;

    const temp = questions.results.slice(
      currentQuestions.length,
      currentQuestions.length + 2
    );
    this.setState(
      {
        currentQuestions: [...currentQuestions, ...temp],
      },
      () => {
        if (this.state.currentQuestions.length >= questions.results.length) {
          this.setState({
            showMoreQuestions: false,
          });
        }
      }
    );
  };

  onCollapseQuestionsClick = () => {
    let { currentQuestions, questions } = this.state;

    this.setState({
      currentQuestions: questions.results.slice(0, 2),
      showMoreQuestions: true,
    });
  };

  render() {
    const { currentQuestions, questions, showMoreQuestions } = this.state;

    return (
      <div>
        <SearchBar onSearch={this.onSearch}></SearchBar>
        <p>
          Here are the questions for this product:
          {questions.results.length}
        </p>
        {currentQuestions.map((item) => {
          return <QuestionCard question={item} key={item.question_id} />;
        })}
        {questions.results.length > 2 && (
          <div>
            {showMoreQuestions ? (
              <button onClick={() => this.onSeeMoreQuestionsClick()}>
                Show More Questions
              </button>
            ) : (
              <button onClick={() => this.onCollapseQuestionsClick()}>
                Collapse Questions
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default QuestionsList;
