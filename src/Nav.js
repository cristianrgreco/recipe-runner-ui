import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './Nav.module.css';
import {Icon} from "./components/Icon";
import config from './config';

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
            <nav className={styles.Nav}>
                <div className={`${styles.Nav_Wrapper} nav-wrapper`}>
                    <div className="container">
                        <Link to="/" className={`${styles.Nav_Wrapper_Logo} brand-logo`}>{config.title}</Link>
                        <a href="#" data-target="mobile" className={`${styles.Nav_Wrapper_SidenavTrigger} sidenav-trigger`}>
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
                    <a href="/" className={`${styles.Nav_Wrapper_Sidenav_LogoContainer} brand-logo`}>
                        <h1 className={styles.Nav_Wrapper_Sidenav_LogoContainer_Logo}>{config.title}</h1>
                    </a>
                </li>
            )}
            <li><Link to="/" className={styles.Nav_Wrapper_Sidenav_Link}>Recipes</Link></li>
            <li><Link to="/create-recipe" className={styles.Nav_Wrapper_Sidenav_Link}>Create new</Link></li>
        </Fragment>
    );
}
