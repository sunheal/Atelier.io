import ListsWrapper from './RelatedProduct/ListsWrapper.jsx';
import QandA from "./Q&A/QandA_app.jsx";
import React from "react"
import RR_app from "./Ratings&Reviews/RR_app.jsx";
import Overview from "./overview/Overview.jsx";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: 64620
        }
    }

    render() {
        return (
            <div className="app">
                <p id="logo"> Good Deals Only </p>
                <Overview />
                <ListsWrapper productID={this.state.productID}/>
                <QandA />
                <RR_app />
            </div>
        )
    }
}

export default App;