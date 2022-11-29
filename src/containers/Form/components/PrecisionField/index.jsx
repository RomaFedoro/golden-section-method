import React from "react";
import { useController } from "react-hook-form";
import styles from "./styles.module.css";
import getPrecision from "../../../../units/getPrecision";
import { MIN_VALUES, MAX_VALUES } from "../../../../constants/form";

const PrecisionField = ({ control, nameField, disabled, ...props }) => {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({
    name: nameField,
    control,
  });

  return (
    <div>
      <div className={styles.text}>E = {getPrecision(value)}</div>
      {!disabled && (
        <div className={styles.container}>
          <input
            type="range"
            min={MIN_VALUES.precisionCount}
            max={MAX_VALUES.precisionCount}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            name={name}
            value={value}
            className={styles.block}
            {...props}
          />
        </div>
      )}
    </div>
  );
};

export default PrecisionField;

