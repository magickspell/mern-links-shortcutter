import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    // using context to auth to logout
    const auth = useContext(AuthContext)
    // cancel default action to avoid enabling link
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-3" style={{padding: '0 2rem'}}>
                <span className="brand-logo">Shortcut</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/create">Create Link</NavLink>
                    </li>
                    <li>
                        <NavLink to="/links">My Links</NavLink>
                    </li>
                    <li>
                        <a href="/" onClick={logoutHandler}>Log out</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}