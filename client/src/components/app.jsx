import ListsWrapper from './RelatedProduct/ListsWrapper.jsx';
import QandA from "./Q&A/QandA_app.jsx";

import React from "react"
import RR_app from "./Ratings&Reviews/RR_app.jsx";


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="app">
            <p id="logo"> Good Deals Only </p>
            <ListsWrapper />
            <QandA/>
            <RR_app />
            </div>
            )
    }
}

export default App;