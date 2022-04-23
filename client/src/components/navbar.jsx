import React from "react";


const Navbar = (props) => {
    const handleLocate = (event) => {
            console.log(window.location,'window')
        }
    

    return (

        // <div id="navbar" >
            <nav>
                <a onClick={handleLocate}> testing </a>
                <a className='navbar'>Home</a>
                <a className='navbar' href="#QandA">Q&amp;A</a>
                <a className='navbar' href="#related_products">Related Product</a>
                <a className='navbar' href="#RR_app">Reviews</a>
            </nav>
        // </div>
    )
}

export default Navbar;