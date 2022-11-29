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
  const { handleSubmit, getValues, control } = useForm({ defaultValues });

  const onBlur = () => draw(getValues());

  useEffect(() => {
    draw(defaultValues);
  }, []);

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}
      onBlur={onBlur}
    >
      <Container label="Функция">
        <Select control={control} nameField="funcId" data={FUNCTIONS} />
      </Container>
      <Container label="Найти">
        <Select control={control} nameField="extremumId" data={EXTREMUMS} />
      </Container>
      <Container label="Входные данные">
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
      </Container>
      <Container label="Точность">
        <PrecisionField control={control} nameField="precisionCount" />
      </Container>
      <button type="submit">Найти точку</button>
    </form>
  );
};

export default Form;

