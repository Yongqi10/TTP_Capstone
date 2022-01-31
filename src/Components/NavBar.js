import React from "react"
import { Link } from "react-router-dom"

export default function NavBar (props) {

    const isLogin = props.isLogin

    return (
        <ul className="navBox">
            {/* <li><a className="navItems">Home</a></li> */}
            <Link to = "/home" className="navItems"> Home </Link>
            <li><a className="navItems">Contact Us</a></li>

            {
                !isLogin?  <Link to = "/account" className="navItems"> Account </Link> : 

                <Link to = "/Profile" className="navItems"> Profile </Link>

            }

            {/* <li><a className="navCart">My Cart</a></li> */}
            <Link to = "/cart" className="navCart"> My Cart </Link>
        </ul>
    )
}