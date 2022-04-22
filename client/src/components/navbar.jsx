import React from "react";


const Navbar = (props) => {
    const handleLocate = (event) => {
        let str = event.target.innerHTML;
        if (str === 'Reviews') {
            let loc = document.getElementsByClassName('ReviewContainer')
            props.scroll(loc);
        }
    }

    return (

        <div id="navbar" >
            <nav>
                <a>Home</a>
                <a>Q&amp;A</a>
                <a>Related Product</a>
                <a onClick={handleLocate}>Reviews</a>
            </nav>
        </div>
    )
}

export default Navbar;