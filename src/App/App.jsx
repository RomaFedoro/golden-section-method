import React, { memo } from "react";
import Form from "../containers/Form";
import Graph from "../components/Graph";
import { DEFAULT_VALUES } from "../constants/form";
import { useSolution } from "../hooks/useSolution";
import styles from "./styles.module.css";
import Solution from "../components/Solution";

const App = () => {
  const { total, ref, draw, result, params, openForm, handleSubmit } =
    useSolution(DEFAULT_VALUES);

  return (
    <div className={styles.container}>
      <Graph ref={ref} />
      <div className={styles.form}>
        <h1>Поиск экстремума методом&nbsp;золотого&nbsp;сечения</h1>
        <Solution
          params={params}
          result={result}
          total={total}
          openForm={openForm}
        />
        <Form
          defaultValues={DEFAULT_VALUES}
          onSubmit={handleSubmit}
          draw={draw}
        />
      </div>
    </div>
  );
};

export default memo(App);

