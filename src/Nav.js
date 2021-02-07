import React, { Fragment, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";
import { Icon } from "./components/Icon";
import { logout } from "./auth";
import NotificationBadge from "./components/NotificationBadge";

export default function Nav({ loggedIn, setLoggedIn, meal }) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const sideNavs = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(sideNavs, { draggable: false });
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
                meal={meal}
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
          meal={meal}
        />
      </ul>
    </header>
  );
}

function NavLinks({ history, location, isMobile, loggedIn, setLoggedIn, logout, meal }) {
  const isActive = (pathname) => location.pathname === pathname;
  const isActiveIncludeSubRoutes = (pathname) => location.pathname.startsWith(pathname);

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
      <li>
        <Link to="/meal" className={`${styles.Nav_Wrapper_Sidenav_Link} ${isActive("/meal") && styles.Active}`}>
          Meal {meal.length > 0 ? <NotificationBadge value={meal.length} /> : ""}
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
            <Link
              to="/account/login"
              className={`${styles.Nav_Wrapper_Sidenav_Link} ${
                isActiveIncludeSubRoutes("/account/login") && styles.Active
              }`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/account/register"
              className={`${styles.Nav_Wrapper_Sidenav_Link} ${
                isActiveIncludeSubRoutes("/account/register") && styles.Active
              }`}
            >
              Register
            </Link>
          </li>
        </Fragment>
      )}
    </div>
  );
}
