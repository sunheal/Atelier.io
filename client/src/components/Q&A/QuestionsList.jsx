import React, {Component} from 'react';
import axios from 'axios';
import config from '../../../../config.js';

const host = ' https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const headers = {
  'Authorization' : `${config.TOKEN}`
};

class QuestionsList extends Component {

  constructor(props){
    super(props);
    this.state= {
      questions:{product_id:'', results:[]}
    }
  }

  componentDidMount() {
    axios.get(host + '/qa/questions?product_id=50000', { headers })
    .then((response) => {
      console.log(response.data)
      this.setState({
        questions:response.data
      })

    })
    .catch((err) =>{
      console.log('GET request err from (QuestionsList.jsx) in line 31)', err);
    },[]);
  }

  render(){
    return (
      <div>Here are the questions for this product:{this.state.questions.results.length}
      </div>
    );
  }
}

export default QuestionsList;