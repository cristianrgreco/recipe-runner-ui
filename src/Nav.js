import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import theme from './theme';
import {Icon} from "./components/Icon";

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
            <nav className={`${theme.color} lighten-2`}>
                <div className="nav-wrapper">
                    <div className="container">
                        <Link to="/" className="brand-logo header">Hello Diners</Link>
                        <a href="#" data-target="mobile" className="sidenav-trigger">
                            <Icon name="menu"/>
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
