import React from "react";
import Stars from "../Shared/Stars.jsx";
import ReviewList from "./reviewList.jsx";
import axios from "axios";
import BarChart from "./breakdowns.jsx";



class RR_app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            recommend: 0,
            ratings: {},
            count:0,
        }
        this.getRating = this.getRating.bind(this);
    }
    componentDidMount() {
        this.getRating();
    }

    getRating() {
        axios.get(`/reviews/meta/?product_id=${this.props.id}`)
        .then((output)=> {
            let resObj = output.data.ratings;
            let recObj = output.data.recommended;
            if(Object.keys(recObj).length === 0) {
                this.setState({
                    recommend: 0
                })
            }else {
                let recOnly=Number(Object.values(recObj)[1]), totalRec=0;
                totalRec = recOnly + Number(Object.values(recObj)[0]);
                recOnly = ((recOnly/totalRec) * 100).toFixed(0)
                this.setState({
                    recommend : recOnly,
                })
            }
            if(Object.keys(resObj).length === 0) {
                this.setState({
                    rating : 0,
                    ratings: resObj,
                })
            }else {
                let total = 0, count = 0, avg = 0;

                for(var keys in resObj) {
                    total += resObj[keys] * Number(keys)
                    count += Number(resObj[keys]);
                }
                avg = (total / count).toFixed(1);
                this.setState({
                    rating: avg,
                    ratings: resObj,
                    count: count,
                })
            }

        })
        .catch(err => console.log(err));
    }
  
    render() {
        return (
            <div className="ReviewContainer">
                <h1>Ratings &amp; Reviews</h1> 
                <div className="leftOfRR"> 
               <p className="ratingHeader_star"> {this.state.rating} &nbsp; <Stars className="avgStar" rating = {this.state.rating} />  </p > 
               <BarChart ratings={this.state.ratings} count={this.state.count} recommend={this.state.recommend} meta={this.props.meta}/>
                </div>
                <div className="rightOfRR">
                    <ReviewList id={this.props.id}/>
                </div>

            </div>
        )
    }
}

export default RR_app;