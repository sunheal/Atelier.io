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
            <div> 
            <p id="logo"> Good Deals Only </p> 
            <RR_app />
            </div>
            )
    }
}

export default App;