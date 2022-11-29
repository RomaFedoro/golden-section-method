import React from "react";
import styles from "./styles.module.css";

const Field = React.forwardRef(({ label, ...props }, ref) => {
  return (
    <label className={styles.container}>
      {label && <div className={styles.text}>{label}</div>}
      <input ref={ref} type="text" className={styles.block} {...props} />
    </label>
  );
});

export default Field;
