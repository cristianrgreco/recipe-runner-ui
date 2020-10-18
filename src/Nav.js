import React, { Fragment, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";
import { Icon } from "./components/Icon";
import { logout } from "./auth";

export default function Nav({ loggedIn, setLoggedIn }) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    window.M.Sidenav.init(document.querySelectorAll(".sidenav"));
  }, [loggedIn]);

  return (
    <header>
      <nav className={styles.Nav}>
        <div className={`${styles.Nav_Wrapper} nav-wrapper`}>
          <div className="container">
            <Link to="/" className={`${styles.Nav_Wrapper_Logo} brand-logo`}>
              La Cocina Leon
            </Link>
            <a href="#" data-target="mobile" className={`${styles.Nav_Wrapper_SidenavTrigger} sidenav-trigger`}>
              <Icon name="menu" />
            </a>
            <ul className="right hide-on-med-and-down">
              <NavLinks
                history={history}
                location={location}
                isMobile={false}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                logout={logout}
              />
            </ul>
          </div>
        </div>
      </nav>
      <ul id="mobile" className="sidenav sidenav-close">
        <NavLinks
          history={history}
          location={location}
          isMobile={true}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          logout={logout}
        />
      </ul>
    </header>
  );
}

function NavLinks({ history, location, isMobile, loggedIn, setLoggedIn, logout }) {
  const isActive = (pathname) => location.pathname === pathname;

  const onLogout = () => {
    logout();
    setLoggedIn(false);
    history.push("/");
  };

  return (
    <div className={isMobile ? styles.Mobile : ""}>
      {isMobile && (
        <li className="logo">
          <a href="/" className={`${styles.Nav_Wrapper_Sidenav_LogoContainer} brand-logo`}>
            <div className={styles.Nav_Wrapper_Sidenav_LogoContainer_Logo}>La Cocina Leon</div>
          </a>
        </li>
      )}
      <li>
        <Link to="/" className={`${styles.Nav_Wrapper_Sidenav_Link} ${isActive("/") && styles.Active}`}>
          Home
        </Link>
      </li>
      {loggedIn ? (
        <Fragment>
          <li>
            <Link to="/recipe-editor" className={`${styles.Nav_Wrapper_Sidenav_Link}`}>
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
            <Link to="/login" className={`${styles.Nav_Wrapper_Sidenav_Link} ${isActive("/login") && styles.Active}`}>
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={`${styles.Nav_Wrapper_Sidenav_Link} ${isActive("/register") && styles.Active}`}
            >
              Register
            </Link>
          </li>
        </Fragment>
      )}
    </div>
  );
}
