import classNames from "classnames";
import React from "react";
import styles from "./styles.module.css";

const Container = ({ label, children, className, ...props }) => {
  const classes = classNames(styles.container, className);

  return (
    <div className={classes} {...props}>
      <div className={styles.title}>{label}</div>
      {children}
    </div>
  );
};

export default Container;
