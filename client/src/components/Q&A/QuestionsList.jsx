import React, {Component} from 'react';
import axios from 'axios';
import config from '../../../../config.js';
import QuestionCard from './QuestionsList/QuestionCard_app.jsx'

const host = ' https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const headers = {
  'Authorization' : `${config.TOKEN}`
};

class QuestionsList extends Component {

  constructor(props){
    super(props);
    this.state= {
      questions:{product_id:'', results:[]},
      id:''
    }
  }

  componentDidMount() {
    axios.get(host + `/qa/questions?product_id=${this.props.product_id}`, { headers })
    .then((response) => {
      return response.data
    })
    .then((res)=>{
      console.log(res)
      this.setState({
        questions:res,
        id:res.product_id
      })
    })
    .catch((err) =>{
      console.log('GET request err from (QuestionsList.jsx) in line 31)', err);
    },[]);
  }

  render(){
    return (
      <div>Here are the questions for this product:
      {this.state.questions.results.length}

      <h1>{this.state.id}</h1>
      {this.state.questions.results.map(item => {
        return (
          <QuestionCard
          {...item}
            key={item.question_id}

          />
        )
      })}
      </div>
    );
  }
}

export default QuestionsList;