import React from "react";
import Modal from 'react-modal';

class AddReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="reviewModal"> 
             <Modal className='innerModal' isOpen={this.props.show} ariaHideApp={false}>
                <h1> Hello </h1>
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
                    <label> Review Summary: 
                        <textarea rows='4' cols='50' maxLength='60' />
                    </label>
                    <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>

                    <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>  <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>  <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>  <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>  <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>
                    <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>  <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>  <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>  <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>  <br></br>
                    <label> Review Body: 
                    <textarea rows='4' cols='50' maxLength='1000' />
                    </label>

                </form>
                <button onClick={this.props.onShowModal}> Close </button>
            </Modal>
            </div>
           
            )
    }
}

export default AddReview;