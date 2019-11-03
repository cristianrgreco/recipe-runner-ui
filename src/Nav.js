import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

export default function Nav() {
    const [domContentLoaded, setDomContentLoaded] = useState(false);

    if (!domContentLoaded) {
        setDomContentLoaded(true);

        document.addEventListener('DOMContentLoaded', () => {
            const elems = document.querySelectorAll('.sidenav');
            window.M.Sidenav.init(elems);
        });
    }

    return (
        <header>
            <nav>
                <div className="nav-wrapper">
                    <div className="container">
                        <Link to="/" className="brand-logo header">Hello Diners</Link>
                        <a href="#" data-target="mobile" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <NavLinks/>
                        </ul>
                    </div>
                </div>
            </nav>
            <ul id="mobile" className="sidenav">
                <NavLinks/>
            </ul>
        </header>
    );
}

function NavLinks() {
    return (
        <Fragment>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/create-recipe">Create new</Link></li>
        </Fragment>
    );
}
