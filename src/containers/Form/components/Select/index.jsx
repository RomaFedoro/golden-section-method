import React, { useCallback, useRef, useState } from "react";
import classnames from "classnames";
import { useClickAway } from "react-use";
import { useController } from "react-hook-form";

import { ReactComponent as IconSelect } from "../../../../assets/select.svg";

import styles from "./styles.module.css";

const Select = ({
  control,
  nameField,
  disabled,
  data = [],
}) => {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({
    name: nameField,
    control,
  });

  const refList = useRef(null);
  const [active, setActive] = useState(false);
  useClickAway(refList, () => {
    setActive(false);
  });

  const handleClick = useCallback(
    (value) => {
      setActive(false);
      onChange(value);
    },
    [onChange]
  );

  const classes = classnames(styles.block, active && styles.active);

  return (
    <div ref={ref} className={classes} onBlur={onBlur} name={name}>
      <button
        className={styles.header}
        type="button"
        onClick={() => setActive(!disabled && !active)}
      >
        {data[value].text}
        {!disabled && (
          <div className={styles.icon}>
            <IconSelect />
          </div>
        )}
      </button>
      <div ref={refList} className={styles.list}>
        {data.map((item, index) => (
          <button
            type="button"
            className={classnames(
              styles.item,
              index === value && styles.item_active
            )}
            key={index}
            onClick={() => handleClick(index)}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;

