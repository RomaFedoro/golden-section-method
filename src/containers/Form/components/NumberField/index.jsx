import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import Field from "../../../../components/Field";
import { useController } from "react-hook-form";
import { getValidData } from "../../../../units/convertInputData";

const NumberField = ({ control, nameField, ...props }) => {
  const {
    field: { onChange, onBlur, name, value: defaultValue, ref },
  } = useController({
    name: nameField,
    control,
  });

  const [value, setValue] = useState(defaultValue);

  return (
    <NumericFormat
      customInput={Field}
      onBlur={(e) => {
        onBlur(e);
        setValue(getValidData(value, nameField));
      }}
      name={name}
      getInputRef={ref}
      value={value}
      thousandSeparator=" "
      onChange={(e) => {
        onChange(e);
        setValue(e.target.value);
      }}
      {...props}
    />
  );
};

export default NumberField;
