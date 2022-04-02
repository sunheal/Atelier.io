import React, {useState, useEffect} from "react";
import QandA from "./Q&A/QandA_app.jsx";




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
            <QandA/>

            </div>
            )
    }
}

export default App;