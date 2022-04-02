import React from "react";

const ReviewListView = ({reviews})=> {
    return (
        <div>
            stars + user/postDate
            <div> </div>
            {reviews.map((review,index) => {
                return (<div className="individualReview_container" key={index}>
                    <div className="reviewSummary"> {review.summary}</div>
                    <div className="reviewBody"> {review.body}</div>
                    </div>
                )
            })}
            </div>
    )
}

export default ReviewListView;