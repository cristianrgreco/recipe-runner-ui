import React from "react";
import { Link } from "react-router-dom";
import styles from "./StyledLink.module.css";

export const StyledLink = ({ children, ...props }) => {
  return (
    <span className={styles.Link}>
      <Link {...props}>{children}</Link>
    </span>
  );
};
