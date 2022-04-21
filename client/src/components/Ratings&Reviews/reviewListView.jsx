import React from "react";
import Stars from "../Shared/Stars.jsx";
import HelpfulAndReport from "./Helpful&Report.jsx";

const ReviewListView =({reviews}) => {
    return (
        <div className="bigReview_container">
            {reviews.map((review,index) => {
                return (
                <div className="individualReview_container" key={index}>
                    <div className="starContainer" key={index}>
                        <div className="indiStar"> <Stars rating={review.rating} /> </div> 
                        <div className="userAndPostdate"> {review.reviewer_name}, {review.date.slice(0,10)}</div>
                        <div className="spaceBetweenRev" key={index}> </div>
                    </div>
            <div className="reviewSpace" key={index+10}> </div>
                    <div className="reviewSummary"> {review.summary}</div>
                    <div className="spaceBetweenRev" key={index+1}> </div>
                    <div className="reviewBody"> {review.body}</div>
                    <div className="spaceBetweenRev" key={index+2}> </div>
                    <div className="reviewPhotos"> {review.photos.map(photo => {
                        return (
                            <div className="RR_photos" key={index}> 
                        <img src={photo.url} width='150' height='150'/> &nbsp;
                            </div>
                        )
                        })
                    }</div>
                    {review.recommend ? <span className="checkmark"> ✓ I recommend this product </span> : null}
                    <div className="spaceBetweenRev" key={index+3}> </div>
                    {review.response ? <span className="response_RR"> {review.response} </span> : null}
                    <div className="spaceBetweenRev" key={index+3}> </div>
                    <HelpfulAndReport review={review} />
                <div className="spaceBetweenRev" key={index+4}> </div>
                </div>
                )
            })}
            </div>
    )
}
export default ReviewListView;