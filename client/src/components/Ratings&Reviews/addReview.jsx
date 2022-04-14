import React from "react";
import Modal from 'react-modal';
import Stars from "../Shared/Stars.jsx";
import {FaStar} from 'react-icons/fa';



class AddReview extends React.Component {

    constructor(props) {
        let starDiv = [

        ]
        super(props);
        this.state = ({
            rating: 0,
            showRatingTxt: false,
            starDivs: []
        })
        this.onRatingChange = this.onRatingChange.bind(this);
        // this.onSelectRating = this.onSelectRating.bind(this);
        this.createStarDiv = this.createStarDiv.bind(this);
    }

    onRatingChange(event) {
        event.preventDefault();
        let keyArr = Object.keys(event.target);
        let val = event.target[keyArr[3]].value;
        let inner = this.createStarDiv(val);
        this.setState({
            rating: val,
            showRatingTxt: true,
            starDivs : inner
        });
    }
    createStarDiv(rating) {
        let count = 5;
        let empty = count - rating;
        let updated = [];
        while (count > 0) {
            while(rating > 0) {
                updated.push(<ion-icon name="star"></ion-icon>);
                rating --;
            }
            while(empty > 0) {
                updated.push(<ion-icon name="star-outline"></ion-icon>);
                empty --;
            }
            count --;
        }
        return updated;
    }
    // onSelectRating(event) {
    //     this.setState({
    //         showRatingTxt: true
    //     })
    // }

    render() {
        return (
            <div className="reviewModal">
             <Modal className='innerModal' isOpen={this.props.show} ariaHideApp={false}>
                <h1> Add Your Review </h1>

                <form>
                    <label> Name:
                    <input type= 'text' />
                    </label>
                    <br></br>
                    <label> Do you recommend this product?:
                        <input name= 'recommend' type= "radio" /> Yes
                        <input name='recommend' type="radio" /> No
                    </label>
                    <br></br>
                    <label> Overall Rating:
                        <br></br>
                        {this.state.starDivs}
                    <span className= "fa fa-star empty-star"  >
                            <ion-icon name="star-outline" value='1'onClick={this.onRatingChange}></ion-icon>
                            <ion-icon name="star-outline" value='2'onClick={this.onRatingChange}></ion-icon>
                            <ion-icon name="star-outline" value='3'onClick={this.onRatingChange}></ion-icon>
                            <ion-icon name="star-outline" value='4'onClick={this.onRatingChange}></ion-icon>
                            <ion-icon name="star-outline" value='5'onClick={this.onRatingChange}></ion-icon>

                    </span>
                   <FaStar size='20' color="gold"/>


                        {/* <input name='overallRating' type="radio" value='1' onClick={this.onRatingChange} /> ★

                        <input name='overallRating' type="radio" value='2' onSelect={this.onRatingChange}/> ★★

                        <input name='overallRating' type="radio" value='3' onSelect={this.onRatingChange}/> ★★★

                        <input name='overallRating' type="radio" value='4' onSelect={this.onRatingChange}/> ★★★★

                        <input name='overallRating' type="radio" value='5' onSelect={this.onRatingChange}/> ★★★★★ */}

                        <br></br>
                     <text> {this.state.showRatingTxt ? <p> 1 star - “Poor” 2 stars - “Fair” 3 stars - “Average” 4 stars - “Good” 5 stars - “Great” </p> :null } </text>

                    </label>
                    <br></br>
                    <label> Review Summary:
                        <textarea rows='4' cols='50' maxLength='60' />
                    </label>
                    <br></br>
                    <label> Review Body:
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>
                    <br></br>
                    <label> Upload Photo:
                    <input type='file' />
                    </label>  <br></br>
                    <label> Email Address:
                    <input type='email' />
                    </label>  <br></br>
                    <input type='submit' />
                </form>
                <button onClick={this.props.onShowModal}> Close </button>
            </Modal>
            </div>

            )
    }
}

export default AddReview;