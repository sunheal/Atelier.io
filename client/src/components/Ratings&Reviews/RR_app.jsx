import React from "react";
import Stars from "../Shared/Stars.jsx";
import ReviewList from "./reviewList.jsx";
import BarChart from "./breakdowns.jsx";
import "../Ratings&Reviews/rr.css";



class RR_app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            count: 0,
            ratings: this.props.meta.ratings,
            recommended: this.props.meta.recommended,
            recommend: 0,
            filtering: [],
            reviews: this.props.reviews
        }
        this.filter = this.filter.bind(this);
    }
    componentDidMount() {
        this.getRating();
    }

    componentDidUpdate(prevProps) {
        if (this.props.reviews !== prevProps.reviews) {
            this.setState({
                reviews: this.props.reviews
            })
        }
        if (this.props.meta !== prevProps.meta) {
            this.setState({
                ratings: this.props.meta.ratings,
                recommended: this.props.meta.recommended
            }, () => this.getRating())
        }
    }

    getRating() {
        let resObj = this.state.ratings;
        let recObj = this.state.recommended;
        // console.log(resObj, recObj, 'afafafaegg4g4')
        if (Object.keys(recObj).length === 0) {
            this.setState({
                recommend: 0
            })
        } else {
            let recOnly = Number(Object.values(recObj)[1]), totalRec = 0;
            totalRec = recOnly + Number(Object.values(recObj)[0]);
            recOnly = ((recOnly / totalRec) * 100).toFixed(0)
            this.setState({
                recommend: recOnly,
            })
        }
        if (Object.keys(resObj).length === 0) {
            this.setState({
                rating: 0,
                ratings: resObj,
            })
        } else {
            let total = 0, count = 0, avg = 0;

            for (var keys in resObj) {
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
    }
    filter(num) {
        let filtered, temp;
        if (this.state.reviews === this.props.reviews) {
            temp = [];
        } else {
            temp = this.state.reviews.slice();
        }
        filtered = this.props.reviews.filter(review => review.rating === num);
        temp = temp.concat(filtered);
        // console.log(temp, 'after it ')
        this.setState({
            reviews: temp
        }, () => console.log(this.state.reviews, 'after adding')
        )
    }



    render() {
        return (
            <div className="ReviewContainer">
                <h1 id='RR_app'>Ratings &amp; Reviews</h1>
                <div className="leftOfRR">
                    {Object.keys(this.props.meta).length !== 0 ? <p className="ratingHeader_star"> {this.state.rating} &nbsp; <Stars className="avgStar" rating={this.state.rating} />  </p > : null}
                    {Object.keys(this.props.meta).length !== 0 ? <BarChart ratings={this.props.meta.ratings} count={this.state.count} recommend={this.state.recommend} meta={this.props.meta} filter={this.filter} /> : null}
                </div>
                <div className="rightOfRR">
                    {Object.keys(this.state.reviews).length === 0 ? null : <ReviewList id={this.props.id} reviews={this.state.reviews} />}
                </div>

            </div>
        )
    }
}

export default RR_app;