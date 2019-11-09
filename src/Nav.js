import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import theme from './theme';
import {Icon} from "./components/Icon";
import {H1} from "./components/Heading";

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
                            <NavLinks mobile={false}/>
                        </ul>
                    </div>
                </div>
            </nav>
            <ul id="mobile" className="sidenav">
                <NavLinks mobile={true}/>
            </ul>
        </header>
    );
}

function NavLinks({mobile}) {
    return (
        <Fragment>
            {mobile && (
                <li className="logo">
                    <a href="/" id="logo-container" className="brand-logo">
                        <H1 style={{margin: '0', fontSize: '30px', fontWeight: '400'}}>Hello Diners</H1>
                    </a>
                </li>
            )}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/create-recipe">Create new</Link></li>
        </Fragment>
    );
}
