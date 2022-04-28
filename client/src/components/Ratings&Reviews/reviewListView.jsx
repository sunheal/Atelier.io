import React from "react";
import Stars from "../Shared/Stars.jsx";
import HelpfulAndReport from "./Helpful&Report.jsx";
import "../Ratings&Reviews/rr.css";


const ReviewListView = ({ reviews }) => {
    return (
        <div className="bigReview_container">
            {reviews.map((review, index) => {
                return (
                    <div className="individualReview_container" key={index}>
                        <div className="starContainer" >
                            <div className="indiStar"> {review.rating ? <Stars rating={review.rating} /> : null } </div> 
                            <div className="userAndPostdate"> {review.reviewer_name}, {review.date.slice(0, 10)}</div>
                            <div className="spaceBetweenRev" > </div>
                        </div>
                        <div className="reviewSpace" > </div>
                        <div className="reviewSummary"> {review.summary}</div>
                        <div className="spaceBetweenRev" > </div>
                        <div className="reviewBody"> {review.body}</div>
                        <div className="spaceBetweenRev" > </div>
                        <div className="reviewPhotos"> {review.photos.map((photo,index) => {
                            return (
                                <div className="RR_photos" key={index}>
                                    <img src={photo.url} width='150' height='150' /> &nbsp;
                                </div>
                            )
                        })
                        }</div>
                        {review.recommend ? <span className="checkmark"> ✓ I recommend this product </span> : null}
                        <div className="spaceBetweenRev" > </div>
                        {review.response ? <span className="response_RR"> {review.response} </span> : null}
                        <div className="spaceBetweenRev" > </div>
                        <HelpfulAndReport review={review} />
                        <div className="spaceBetweenRev" > </div>
                    </div>
                )
            })}
        </div>
    )
}
export default ReviewListView;