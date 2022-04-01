import React from "react";
import StarsAndBreakdown from "./stars&breakdown.jsx";
import ReviewList from "./reviewList.jsx";

class RR_app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <h1>RATINGS &amp; Reviews</h1> 
                <StarsAndBreakdown /> 
                <ReviewList />
                <button className="moreReview"> More Review </button>
                <button className="addReview"> Add Review </button>
            </div>  
        )
    }
}

export default RR_app;