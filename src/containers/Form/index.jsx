import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Container from "../../components/Container";
import EXTREMUMS from "../../constants/extremum";
import FUNCTIONS from "../../constants/func";
import NumberField from "./components/NumberField";
import PrecisionField from "./components/PrecisionField";
import Select from "./components/Select";
import styles from "./styles.module.css";

const Form = ({ defaultValues, onSubmit, draw }) => {
  const { handleSubmit, control } = useForm({ defaultValues });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Container label="Введите значения">
        <Select control={control} nameField="funcId" data={FUNCTIONS} />
        <Select control={control} nameField="extremumId" data={EXTREMUMS} />
        <NumberField
          label="a ="
          control={control}
          nameField="start"
          placeholder="Введите начальное значение"
        />
        <NumberField
          label="b ="
          control={control}
          nameField="end"
          placeholder="Введите конечное значение"
        />
        <PrecisionField control={control} nameField="precisionCount" />
      </Container>
      <button className={styles.button} type="submit">
        Решить
      </button>
    </form>
  );
};

export default Form;

