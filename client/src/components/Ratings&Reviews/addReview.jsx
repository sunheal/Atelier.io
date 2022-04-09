import React from "react";
import Modal from 'react-modal';
import {FaStar} from 'react-icons/fa';



class AddReview extends React.Component {
    
    constructor(props) {
     
        super(props);
        this.state = ({
            rating: 0,
            sizePt:0,
            comfortPt:0,
            showRatingTxt: false,
            showSizeTxt: false,
            showComfortTxt: false
        })
        this.onRatingChange = this.onRatingChange.bind(this);
        this.onSizeChange = this.onSizeChange.bind(this);
        this.onComfortChange = this.onComfortChange.bind(this);
        // this.onSelectRating = this.onSelectRating.bind(this);
        // this.onHovering = this.onHovering.bind(this);
    }   

    onRatingChange(event) {
        event.preventDefault();
        this.setState({
            rating: event.target.value,
            showRatingTxt:true
        });
    }
    onSizeChange(event) { 
        this.setState({
            sizePt: event.target.value,
            showSizeTxt: true
        })
    }
    onComfortChange(event) {
        this.setState({
            comfortPt:event.target.value,
            showComfortTxt:true
        })
    }
 
    // createStarDiv(rating) {
    //     let count = 5;
    //     let empty = count - rating;
    //     let updated = [];
    //     while (count > 0) {
    //         while(rating > 0) {
    //             updated.push(<ion-icon name="star"></ion-icon>);
    //             rating --;
    //         }
    //         while(empty > 0) {
    //             updated.push(<ion-icon name="star-outline"></ion-icon>);
    //             empty --;
    //         }
    //         count --;
    //     }
    //     return updated;
    // }


    render() {
        return (
            <div className="reviewModal"> 
             <Modal className='innerModal' isOpen={this.props.show} ariaHideApp={false}>
                <h1> Add Your Review </h1>

                <form> 
                    <label name='AddReview_Name'> Name: 
                    <input type= 'text' required/>
                    </label>
                    <br></br>
                    <label> Do you recommend this product?: 
                        <input name= 'recommend' type= 'radio' required/> Yes
                        <input name='recommend' type='radio' /> No
                    </label>
                    <br></br>
                    <label name='rating'> Overall Rating: 
                    {[...Array(5)].map((star,i) => {
                        const ratingVal = i+1;

                        return (
                                <>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={ratingVal}
                                    key={ratingVal}
                                    onClick={this.onRatingChange}
                                    required
                                    /><FaStar
                                    className="star"
                                    size='20'
                                    color={ratingVal <= this.state.rating ? 'gold' : 'white'} /></>
                        )
                    })}
                    </label>
                    {/* <span className= "fa fa-star empty-star"  > 
                            <ion-icon name="star-outline" value='1'onClick={this.onRatingChange}></ion-icon>
                            <ion-icon name="star-outline" value='2'onClick={this.onRatingChange}></ion-icon>
                            <ion-icon name="star-outline" value='3'onClick={this.onRatingChange}></ion-icon>
                            <ion-icon name="star-outline" value='4'onClick={this.onRatingChange}></ion-icon>
                            <ion-icon name="star-outline" value='5'onClick={this.onRatingChange}></ion-icon>
                    </span> */}
                   
                        <br></br>
                     <a name='ratingtxt'> {this.state.showRatingTxt ? <p> 1 star - “Poor” 2 stars - “Fair” 3 stars - “Average” 4 stars - “Good” 5 stars - “Great” </p> :null } </a>
                    <br></br>
                    <label> How do you like the size?: 
                        <input name='PRSize' type= 'radio' value= '1' onClick={this.onSizeChange} /> 1
                        <input name='PRSize' type='radio' value= '2' onClick={this.onSizeChange}/> 2
                        <input name='PRSize' type='radio' value= '3' onClick={this.onSizeChange}/> 3
                        <input name='PRSize' type='radio' value= '4' onClick={this.onSizeChange}/> 4
                        <input name='PRSize' type='radio' value= '5' onClick={this.onSizeChange}/> 5
                    </label>
                    <br></br>
                    <label> How do you like the comfortness?: 
                        <input name='PRComfort'type= 'radio' value= '1' onClick={this.onComfortChange}/> 1
                        <input name='PRComfort' type='radio' value= '2' onClick={this.onComfortChange}/> 2
                        <input name='PRComfort' type='radio' value= '3' onClick={this.onComfortChange}/> 3
                        <input name='PRComfort' type='radio' value= '4' onClick={this.onComfortChange}/> 4
                        <input name='PRComfort' type='radio' value= '5' onClick={this.onComfortChange}/> 5
                    </label>
                    <br></br>
                    <label> Review Summary: 
                        <textarea rows='4' cols='50' maxLength='60' required/>
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