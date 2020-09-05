import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Nav.module.css";
import { Icon } from "./components/Icon";
import { logout } from "./auth";

export default function Nav({ loggedIn, setLoggedIn }) {
  const history = useHistory();

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
        <NavLinks history={history} isMobile={true} loggedIn={loggedIn} setLoggedIn={setLoggedIn} logout={logout} />
      </ul>
    </header>
  );
}

function NavLinks({ history, isMobile, loggedIn, setLoggedIn, logout }) {
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
        <Link to="/" className={styles.Nav_Wrapper_Sidenav_Link}>
          Recipes
        </Link>
      </li>
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
    </div>
  );
}
