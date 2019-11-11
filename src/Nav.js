import React, {Fragment, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import styles from './Nav.module.css';
import {Icon} from "./components/Icon";
import config from './config';
import {logout} from "./auth";

export default function Nav({loggedIn, setLoggedIn}) {
    const [domContentLoaded, setDomContentLoaded] = useState(false);
    const history = useHistory();

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
                            <NavLinks history={history} isMobile={false} loggedIn={loggedIn} setLoggedIn={setLoggedIn} logout={logout}/>
                        </ul>
                    </div>
                </div>
            </nav>
            <ul id="mobile" className="sidenav">
                <NavLinks history={history} isMobile={true} loggedIn={loggedIn} setLoggedIn={setLoggedIn} logout={logout}/>
            </ul>
        </header>
    );
}

function NavLinks({history, isMobile, loggedIn, setLoggedIn, logout}) {
    const onLogout = () => {
        logout();
        setLoggedIn(false);
        history.push('/');
    };

    return (
        <Fragment>
            {isMobile && (
                <li className="logo">
                    <a href="/" className={`${styles.Nav_Wrapper_Sidenav_LogoContainer} brand-logo`}>
                        <h1 className={styles.Nav_Wrapper_Sidenav_LogoContainer_Logo}>{config.title}</h1>
                    </a>
                </li>
            )}
            <li><Link to="/" className={styles.Nav_Wrapper_Sidenav_Link}>Recipes</Link></li>
            {loggedIn ? (
                <Fragment>
                    <li><Link to="/create-recipe" className={styles.Nav_Wrapper_Sidenav_Link}>Create new</Link></li>
                    <li><Link to="#" className={styles.Nav_Wrapper_Sidenav_Link} onClick={onLogout}>Logout</Link></li>
                </Fragment>
            ) : (
                <Fragment>
                    <li><Link to="/login" className={styles.Nav_Wrapper_Sidenav_Link}>Login</Link></li>
                    <li><Link to="/register" className={styles.Nav_Wrapper_Sidenav_Link}>Register</Link></li>
                </Fragment>
            )}
        </Fragment>
    );
}
