import {useState} from "react";
import React from "react";
import Stars from "../Shared/Stars.jsx";
import HelpfulAndReport from "./Helpful&Report.jsx";
import "../Ratings&Reviews/rr.css";
import Window from "../Q&A/window.jsx";



const ReviewListView = ({ reviews }) => {
    const [photo, setPhoto] = useState(null);
    const [showImgWindow, setWindow] = useState(false);

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
                                    <img src={photo.url} width='150' height='150' onClick={()=>{
                                        setPhoto(event.target.src)
                                        setWindow(true)
                                    }
                                }/> &nbsp;
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
                    {showImgWindow && (
          <Window onClick={()=> setWindow(false)}>
            <img width="600" height="600" src={photo}></img>
          </Window>
        )}
        </div>
    )
}
export default ReviewListView;