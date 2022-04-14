import React from "react";
import Stars from "../Shared/Stars.jsx";
import HelpfulAndReport from "./Helpful&Report.jsx";

const ReviewListView =({reviews}) => {
    return (
        <div>
            {reviews.map((review,index) => {
                return (
                <div className="individualReview_container" key={index}>
                    <div className="starContainer">
                        <div className="indiStar"> <Stars rating={review.rating} /> </div> 
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
                    <HelpfulAndReport review={review} />
                <div className="spaceBetweenRev"> </div>
                </div>
                )
            })}
            </div>
    )
}
export default ReviewListView;