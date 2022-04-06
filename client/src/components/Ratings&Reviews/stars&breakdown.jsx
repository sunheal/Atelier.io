import React from "react";

const StarsAndBreakdown = ({rating,stars})=> {
    return (
        <div> 

        <p className="ratingHeader_star"> {rating} {stars()}</p>
        <div> // percentage of recommend rate of this product //</div>
        <div> // stars breakdown in histograms //</div>
        <div> // product breakdown in pointers // </div>

        </div>
    )
}

export default StarsAndBreakdown;