import React from "react";
import ReviewListView from "./reviewListView.jsx";
import axios from "axios";
// import config from "../../../../config.js";
// import DefaultReviews from "./DefaultReviews.js";
// import productsAPI from '../../../../server/api/products.js';

// const host = ' https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
// const headers = {
//   'Authorization' : `${config.TOKEN}`
// };

class ReviewList extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            // productID : 64660,
            currentReview : [],
            whatShowing : []
        }
        this.getReviewinfo = this.getReviewinfo.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.appendReview = this.appendReview.bind(this);
    }
    componentDidMount() {
        this.getReviewinfo();
    }

    getReviewinfo() {
        axios.get(`/reviews/?product_id=${this.props.id}`)
        .then((output)=> {
            console.log(output.data.results, 'received from API');
            this.setState({
                currentReview : output.data.results,
                whatShowing: output.data.results.slice(0,2)
            })
        })
        .catch(err => console.log(err));
    } 
    changeSort(event) {
        let input = event.target.value;
        let sorted= [];
        if(input === 'newest') {
            sorted = this.state.currentReview.sort((a,b) => {
                return new Date(b.date) - new Date(a.date)
            });
        }
        if (input === 'helpful') {
            sorted = this.state.currentReview.sort((a,b) => {
                return b.helpfulness - a.helpfulness
            });
        } 
        if(input === 'relevance') {
            sorted = this.state.currentReview.sort((a,b) => {
                return b.helpfulness - a.helpfulness
            });
            sorted.sort((a,b) => {
                return new Date(a.date) - new Date(b.date)
            });
        }
        if(input === 'Select Your Sort') {
            this.getReviewinfo();
            sorted = this.state.currentReview;
        }
        this.setState({
            currentReview: sorted,
        })
    }
    appendReview() {
        const adding = 2;
        const list = this.state.currentReview;
        let showingNow = this.state.whatShowing;
        let index = showingNow.length;
        if(list.length >= showingNow.length + adding) {
            let appending = list.slice(0, index + adding);
            this.setState({
                whatShowing: appending
            })
        }
        if(showingNow.length === list.length - 1) {
            let appending = list.slice();
            this.setState({
                whatShowing : appending
            })
        }
    }

    render() {
        return (
            <div> 
                {(this.state.currentReview.length === 0) ? <div><button className="addReview"> Add Review </button> </div>
                :<div><p className="reviewsCount"> {this.state.currentReview.length} Reviews, sorted by
                        <select className="sortSelect" onChange={this.changeSort}>
                            <option value='Select Your Sort'> Select Your Sort</option>
                            <option value='relevance'> relevance </option>
                            <option value='newest'> newest </option>
                            <option value='helpful'> helpful </option>
                        </select>
                    </p><ReviewListView reviews={this.state.whatShowing} starhelper={this.props.starhelper} starsArr={this.props.starsArr}/> 
                   {(this.state.currentReview.length !== this.state.whatShowing.length) ? ((this.state.currentReview.length > 2) ? <button className="moreReview" onClick={this.appendReview}> More Review </button> : null) : null}
                   <button className="addReview"> Add Review </button>
                   </div>
 }
            
            </div>
        )
    }
}
export default ReviewList;