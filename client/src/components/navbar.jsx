import React from "react";


const Navbar = (props) => {
    const handleLocate = (event) => {
        let str = event.target.innerHTML;
        if (str === 'Reviews') {
            let loc = document.getElementsByclassNameName('ReviewContainer')
            props.scroll(loc);
        }
    }

    return (

        // <div id="navbar" >
            <nav>
                <a className='navbar'>Home</a>
                <a className='navbar'>Q&amp;A</a>
                <a className='navbar'>Related Product</a>
                <a className='navbar' onClick={handleLocate}>Reviews</a>
            </nav>
        // </div>
    )
}

export default Navbar;