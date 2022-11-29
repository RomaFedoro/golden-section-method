import React from "react";
import Container from "../Container";
import styles from "./styles.module.css";

const Solution = ({ params, result, total, openForm }) => {
  const { a, b } = result;
  const { func, precisionCount } = params;

  return (
    <>
      {a !== undefined && b !== undefined && (
        <>
          <Container label="Количество итераций">
            <div className={styles.text}>n = {total}</div>
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
    </>
  );
};

export default Solution;

