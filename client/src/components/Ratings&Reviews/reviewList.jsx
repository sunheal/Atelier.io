import React from "react";
import ReviewListView from "./reviewListView.jsx";
import AddReview from './/addReview.jsx';
import "../Ratings&Reviews/rr.css";
import { sendAction } from "../../utils/tracker.js";



class ReviewList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            // productID : 64660,
            showModal: false,
            currentReview : [],
            whatShowing : []
        }
        this.getReviewinfo = this.getReviewinfo.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.appendReview = this.appendReview.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
    }
    componentDidMount() {
        this.getReviewinfo();
    }
    componentDidUpdate(prevProps) {
        if(this.props.reviews !== prevProps.reviews) {
            this.setState({
                currentReview : this.props.reviews,
                whatShowing: this.props.reviews.slice(0,2)
            })
            // {elemnent: 'review breakdown', widget:'Rating and Reviews', Date}
        }
    }

    onShowModal() {
        this.setState ({
            showModal : !this.state.showModal
        });
        sendAction({
            element: "submit reviews",
            widget: "Reviews",
        });
    }
    getReviewinfo() {
      this.setState({
                currentReview : this.props.reviews,
                whatShowing: this.props.reviews.slice(0,2)
            })

    }
    changeSort(event) {
        let input = event.target.value;
        let sorted= [];
        if(input === 'newest') {
            sorted = this.state.whatShowing.sort((a,b) => {
                return new Date(b.date) - new Date(a.date)
            });
        }
        if (input === 'helpful') {
            sorted = this.state.whatShowing.sort((a,b) => {
                return b.helpfulness - a.helpfulness
            });
        }
        if(input === 'relevance') {
            sorted = this.state.whatShowing.sort((a,b) => {
                return b.helpfulness - a.helpfulness
            });
            sorted.sort((a,b) => {
                return new Date(a.date) - new Date(b.date)
            });
        }
        if(input === 'Select Your Sort') {
            this.getReviewinfo();
            sorted = this.state.whatShowing;
        }
        this.setState({
            whatShowing: sorted,
        })
        sendAction({
            element: "sort reviews",
            widget: "Reviews",
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
        sendAction({
            element: "append 2 more reviews",
            widget: "Reviews",
        })
    }



    render() {
        return (
            <div>
                {(this.state.currentReview.length === 0) ? <div><button className="addReview"> Add Review </button> </div>
                :<div><p className="reviewsCount"> {this.state.currentReview.length} Reviews, sorted by
                        <select className="sortSelect" onChange={this.changeSort} >
                            <option value='Select Your Sort'> Select Your Sort</option>
                            <option value='relevance'> relevance </option>
                            <option value='newest'> newest </option>
                            <option value='helpful'> helpful </option>
                        </select> </p>
                        <ReviewListView reviews={this.state.whatShowing} />
                   {(this.state.currentReview.length !== this.state.whatShowing.length) ? ((this.state.currentReview.length > 2) ? <button className="moreReview" onClick={this.appendReview}> More Review </button> : null) : null}
                   <button className="addReview" onClick={this.onShowModal}> Add Review </button>
                    <AddReview show={this.state.showModal} onShowModal={this.onShowModal} id={this.props.id}/>

                   </div>
 }

            </div>
        )
    }
}
export default ReviewList;