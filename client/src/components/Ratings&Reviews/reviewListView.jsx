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
            <div className="reviewSpace" key={index+1}> </div>
                    <div className="reviewSummary"> {review.summary}</div>
                    <div className="spaceBetweenRev"> </div>
                    <div className="reviewBody"> {review.body}</div>
                    <div className="spaceBetweenRev"> </div>
                    <div className="reviewPhotos"> {review.photos.map(photo => {
                        return (
                            <div className="RR_photos"> 
                        <img src={photo.url} width='150' height='150'/> &nbsp;
                            </div>
                        )
                        })
                    }</div>
                    {review.recommend ? <span className="checkmark"> ✓ I recommend this product </span> : null}
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