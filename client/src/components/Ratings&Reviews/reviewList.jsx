import React from "react";
import ReviewListView from "./reviewListView.jsx";
import axios from "axios";
import config from "../../../../config.js";
import DefaultReviews from "./DefaultReviews.js";

const host = ' https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const headers = {
  'Authorization' : `${config.TOKEN}`
};

class ReviewList extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            productID : 64620,
            currentReview : DefaultReviews
        }
    }
    componentDidMount() {
        // this.getReview();
        console.log(this.state.currentReview, 'reviessssss')
    }

    // getReview() {
    //     axios.get(`${host}/reviews?count=5&sort='newest'&product_id=${this.state.productID}`, {headers})
    //     .then((output)=> {
    //         this.setState({
    //             currentReview : output.data.result
    //         })
    //         console.log(output.data.results)
    //     })
    //     .catch(err => console.log(err));
    // } 

    render() {
        return (
            <div> 
                <p> # of reviews sort by "  " </p>
                <ReviewListView reviews={this.state.currentReview}/> 
            </div>
        )
    }
}
export default ReviewList;