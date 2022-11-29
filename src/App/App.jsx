import React, { memo, useCallback, useState } from "react";
import Form from "../containers/Form";
import Graph from "../components/Graph";
import { DEFAULT_VALUES } from "../constants/form";
import { useSolution } from "../hooks/useSolution";
import styles from "./styles.module.css";
import Solution from "../components/Solution";

const App = () => {
  const [isSolitionVisible, setIsSolitionVisible] = useState(false);
  const { total, ref, draw, result, params, openForm, handleSubmit } =
    useSolution(DEFAULT_VALUES, setIsSolitionVisible);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Поиск экстремума методом&nbsp;золотого&nbsp;сечения</h1>
        {isSolitionVisible ? (
          <Solution
            params={params}
            result={result}
            total={total}
            openForm={openForm}
          />
        ) : (
          <Form
            defaultValues={DEFAULT_VALUES}
            onSubmit={handleSubmit}
            draw={draw}
          />
        )}
      </div>
      <Graph ref={ref} />
    </div>
  );
};

export default memo(App);

