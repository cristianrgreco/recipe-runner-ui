import React from 'react';
import {Link} from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <div className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo left header">Recipe Runner</Link>
                    <ul id="nav-mobile" className="right hide-on-small">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/recipes">Recipes</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
