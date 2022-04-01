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
            <div className="ReviewContainer">
                <h1>RATINGS &amp; Reviews</h1> 
                <div className="leftOfRR"> 
                    <StarsAndBreakdown /> 
                </div>
                <div className="rightOfRR"> 
                    <ReviewList />
                    <button className="moreReview"> More Review </button>
                    <button className="addReview"> Add Review </button>
                </div>

            </div>  
        )
    }
}

export default RR_app;