import React from "react";
import Stars from "../Shared/Stars.jsx";
import ReviewList from "./reviewList.jsx";
import axios from "axios";




class RR_app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
        }
        this.getRating = this.getRating.bind(this);
    }
    componentDidMount() {
        this.getRating();
    }
    
    getRating() {
        axios.get(`/reviews/meta/?product_id=${this.props.id}`)
        .then((output)=> {
            console.log(output.data.ratings, 'received from API Rating');
            let resObj = output.data.ratings;
            if(Object.keys(resObj).length === 0) {
                this.setState({
                    rating : 0
                })
            }else {
                let total = 0, count = 0, avg = 0;
                for(var keys in resObj) {
                    total += resObj[keys] * Number(keys)
                    count += Number(resObj[keys]);
                }
                avg = (total / count).toFixed(1);
                this.setState({
                    rating: avg
                })
            }
            
            // if(resArr.length === 0) {
            //     console.log('00000');
            //     this.setState({
            //         rating : 0
            //     })
            // }else {
            //     let total_rating = resArr.reduce((prev, curr)=> prev + curr.rating, 0);
            //     let avg = (total_rating/resArr.length).toFixed(2);
            //     console.log(avg, 'avg');
            //     this.setState({
            //         rating: avg
            //     })
            // }
           
        })
        .catch(err => console.log(err));
    }
    // arrangeStar(rating, starsArr) {
    //     let randomkey = 0
    //     let count = 0;
    //     let result = [];
    //      while (count < 5) {
    //         if (rating >= 1) {
    //             result.push(<img src = {starsArr[4]} key={randomkey}/>);
    //             rating --;
    //             count += 1;
    //             randomkey++;
    //             // console.log(rating, 'current rating');
    //         }else if (rating >= 0.75 && rating < 1) {
    //             result.push(<img src = {starsArr[3]} key={randomkey}/>);
    //             rating -= 0.75;
    //             count += 1;
    //             randomkey++;
    //         } else if (rating >= 0.5 && rating < 1) {
    //             result.push(<img src = {starsArr[2]} key={randomkey}/>);
    //             rating -= 0.5;
    //             count += 1;
    //             randomkey++;
    //         }else if (rating >= 0.25 && rating < 1) {
    //             result.push(<img src = {starsArr[1]} key={randomkey}/>);
    //             rating -= 0.25;
    //             count += 1;
    //             randomkey++;
    //         } else {
    //             result.push(<img src = {starsArr[0]} key={randomkey}/>);
    //             count += 1;
    //             randomkey++;
    //         }
    //   }
    //   return result;
    // }
    render() {
        return (
            <div className="ReviewContainer">
                <h1>RATINGS &amp; Reviews</h1> 
                <div className="leftOfRR"> 
               <p className="ratingHeader_star"> {this.state.rating} &nbsp; <Stars className="avgStar" rating = {this.state.rating} />  </p > 
                </div>
                <div className="rightOfRR"> 
                    <ReviewList id={this.props.id}/>
                </div>

            </div>  
        )
    }
}

export default RR_app;