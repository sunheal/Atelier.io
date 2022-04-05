import React from "react";
// const options = [<option value='relevance'></option>,'newest','helpful']



    // changeSort(event) {
    //     let input = event.target.value;
    //     this.props.reviews = this.props.reviews.sort((a,b) => {
    //         return new Date(a.date) - new Date(b.date)
    //     });
    //     this.setState({
    //         selectedOpt: input,
    //     })
    // }
const ReviewListView =({reviews}) => {
    return (
        <div>
            {reviews.map((review,index) => {
                return (
                <div className="individualReview_container" key={index}>
                    <div className="starContainer">
                        <div className="indiStar"> Star </div> 
                        <div className="userAndPostdate"> {review.reviewer_name}, {review.date.slice(0,10)}</div>
                        <div className="spaceBetweenRev"> </div>
                    </div>
            <div className="reviewSpace"> </div>
                    <div className="reviewSummary"> {review.summary}</div>
                    <div className="spaceBetweenRev"> </div>
                    <div className="reviewBody"> {review.body}</div>
                    <div className="spaceBetweenRev"> </div>
                    {review.recommend ? <span className="checkmark">&#10003; I recommend this product </span> : null}
                    <div className="spaceBetweenRev"> </div>
                <div className="helpfulOrNot"> Helpful? Yes ({review.helpfulness}) | Report
                <div className="spaceBetweenRev"> </div>
                </div>
                    </div>
                )
            })}
            </div>
    )
}
export default ReviewListView;