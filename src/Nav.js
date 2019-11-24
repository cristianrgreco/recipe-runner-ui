import React, {Fragment, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import styles from './Nav.module.css';
import {Icon} from "./components/Icon";
import {logout} from "./auth";

export default function Nav({loggedIn, setLoggedIn}) {
    const history = useHistory();

    useEffect(() => {
        window.M.Sidenav.init(document.querySelectorAll('.sidenav'));
        window.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {coverTrigger: false});
    }, []);

    const onLogout = () => {
        logout();
        setLoggedIn(false);
        history.push('/');
    };

    return (
        <header>
            <ul id="auth-dropdown" className="dropdown-content">
                <li><Link to="/login" className={styles.Nav_Wrapper_Sidenav_Link}>Login</Link></li>
                <li><Link to="/register" className={styles.Nav_Wrapper_Sidenav_Link}>Register</Link></li>
            </ul>
            <nav className={styles.Primary}>
                <div className={`${styles.Nav_Wrapper} nav-wrapper`}>
                    <div className="container">
                        <Link to="/" className={`${styles.Nav_Wrapper_Logo} brand-logo`}>Hello, Diners</Link>
                        <a href="#" data-target="mobile" className={`${styles.Secondary} sidenav-trigger`}>
                            <Icon name="menu"/>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/" className={styles.Nav_Wrapper_Sidenav_Link}>Recipes</Link></li>
                            {loggedIn ? (
                                <Fragment>
                                    <li>
                                        <Link to="/recipe-editor" className={styles.Nav_Wrapper_Sidenav_Link}>
                                            Create
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className={styles.Nav_Wrapper_Sidenav_Link} onClick={onLogout}>
                                            Logout
                                        </Link>
                                    </li>
                                </Fragment>
                            ) : (
                                <li>
                                    <a className={`dropdown-trigger ${styles.Secondary}`} href="#!" data-target="auth-dropdown">
                                        <Icon name="person"/>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <ul id="mobile" className="sidenav sidenav-close">
                <li className="logo">
                    <a href="/" className={`${styles.Nav_Wrapper_Sidenav_LogoContainer} brand-logo`}>
                        <div className={styles.Nav_Wrapper_Sidenav_LogoContainer_Logo}>
                            Hello, Diners
                        </div>
                    </a>
                </li>
                <li><Link to="/" className={styles.Nav_Wrapper_Sidenav_Link}>Recipes</Link></li>
                {loggedIn ? (
                    <Fragment>
                        <li>
                            <Link to="/recipe-editor" className={styles.Nav_Wrapper_Sidenav_Link}>
                                Create
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={styles.Nav_Wrapper_Sidenav_Link} onClick={onLogout}>
                                Logout
                            </Link>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li>
                            <Link to="/login" className={styles.Nav_Wrapper_Sidenav_Link}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className={styles.Nav_Wrapper_Sidenav_Link}>
                                Register
                            </Link>
                        </li>
                    </Fragment>
                )}
            </ul>
        </header>
    );
}
