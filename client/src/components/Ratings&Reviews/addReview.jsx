import React from "react";
import Modal from 'react-modal';

class AddReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal className="reviewModal" isOpen={this.props.show} ariaHideApp={false}>
                <h1> Hello </h1>
                <form> 
                    <label> Name: 
                    <input type= 'text' />
                    </label>
                   
                </form>
                <button onClick={this.props.onShowModal}> Close </button>
            </Modal>
            )
    }
}

export default AddReview;