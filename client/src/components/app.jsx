import ListsWrapper from './RelatedProduct/ListsWrapper.jsx';
import QandA from "./Q&A/QandA_app.jsx";
import React from "react"
import RR_app from "./Ratings&Reviews/RR_app.jsx";
import Overview from "./overview/Overview.jsx";


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            product_id: 64620
        }
    }
 

    render() {
        return (
            <div className="app">
            <p id="logo"> Good Deals Only </p>
            <Overview />
            <ListsWrapper />
            <QandA/>
            <RR_app id={this.state.product_id}/>
            </div>
            )
    }
}

export default App;