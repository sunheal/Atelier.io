import React from 'react';
import "../Ratings&Reviews/rr.css";
import { sendAction } from "../../utils/tracker.js";

class HelpfulAndReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedHelpful: this.props.review.helpfulness,
            updatedReport: false,
            helpfulEnough: false,
        }
        this.onUpdateReport = this.onUpdateReport.bind(this);
        this.onUpdateHelpful = this.onUpdateHelpful.bind(this);

    }
    // componentDidMount() {
    //     this.setState({
    //         updatedHelpful: this.props.review.helpfulness
    //     })
    // }
    onUpdateReport(event) {
        event.preventDefault();
        this.setState({
            updatedReport: !(this.state.updatedReport)
        });
        sendAction({
            element: "reported a review",
            widget: "Reviews",
        })
    }
    onUpdateHelpful(event) {
        event.preventDefault();
        let updated = this.state.updatedHelpful + 1;
        this.setState({
            helpfulEnough: true,
            updatedHelpful: updated
        })
        sendAction({
            element: "supported a review",
            widget: "Reviews",
        })
    } 
    render() {
        return (
            <div className="helpfulOrNot" key={this.props.review.review_id}> 
            Helpful? 
            {this.state.helpfulEnough ? <a > Yes ({this.state.updatedHelpful}) </a> : <a onClick={this.onUpdateHelpful}> Yes ({this.state.updatedHelpful}) </a>}  | &nbsp;
            {this.state.updatedReport ? <a onClick={this.onUpdateReport}>Reported</a> : <a onClick={this.onUpdateReport}>Report</a>}  
            </div>
        )
    }
}

export default HelpfulAndReport;