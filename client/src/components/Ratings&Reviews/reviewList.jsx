import React from "react";
import ReviewListView from "./reviewListView.jsx";

class ReviewList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div> 
                <p> # of reviews sort by "  " </p>
                <ReviewListView /> 
            </div>
        )
    }
}
export default ReviewList;