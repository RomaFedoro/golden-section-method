import React from "react";
import Container from "../Container";
import styles from "./styles.module.css";

const Solution = ({ params, result, total, openForm }) => {
  const { a, b } = result;
  const { func, funcId, start, end, precisionCount, precision, extremumId } =
    params;

  return (
    <>
      <Container label="Количество итераций">
        <div className={styles.text}>n = {total}</div>
      </Container>
      {a !== undefined && b !== undefined && (
        <>
          <Container label="Точка находится в диапозоне">
            <div className={styles.text}>
              x&nbsp;∈&nbsp;[{a.toFixed(precisionCount)};&nbsp;
              {b.toFixed(precisionCount)}]
            </div>
          </Container>
          <Container label="Ответ">
            <div className={styles.text}>
              x ≈ {((a + b) / 2).toFixed(precisionCount)}
            </div>
            <div className={styles.text}>
              f(x) ≈ {func((a + b) / 2).toFixed(precisionCount)}
            </div>
          </Container>
        </>
      )}
      <button onClick={openForm}>Ввести новые значения</button>
    </>
  );
};

export default Solution;

