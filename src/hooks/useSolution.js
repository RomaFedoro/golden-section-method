import { useEffect, useRef, useState } from "react";
import convertInputData from "../units/convertInputData";
import findLocalMinimum from "../units/findLocalMinimum";
import findLocalMaximum from "../units/findLocalMaximum";
import drawGraph from "../units/drawGraph";

export const useSolution = (defaultValues) => {
  const ref = useRef(null);
  const [params, setParams] = useState(defaultValues);
  const [result, setResult] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!params) return;

    const { start, end, precision, func, isMin } = params;

    if (
      start === undefined ||
      end === undefined ||
      precision === undefined ||
      func === undefined
    )
      return;

    let a = start;
    let b = end;
    drawGraph(ref, { ...params, a, b });

    setResult(() => ({ a, b }));

    const intr = setInterval(function () {
      if (Math.abs(b - a) < precision) {
        const x = (a + b) / 2;
        drawGraph(ref, { ...params, a: x, b: x });
        clearInterval(intr);
        return;
      }

      const result = (isMin ? findLocalMinimum : findLocalMaximum)({
        precision,
        func,
        a,
        b,
      });
      a = result.a;
      b = result.b;

      drawGraph(ref, { ...params, a, b });
      setResult(() => ({ a, b }));
      setTotal((prev) => prev + 1);
    }, 1000);

    return () => {
      setTotal(0);
      setResult({});
      clearInterval(intr);
    };
  }, [params]);

  const openForm = () => {
    setTotal(0);
    setResult({});
    setParams({});
  };

  const handleSubmit = (value) => {
    if (
      Object.keys({ ...params, ...value }).every(
        (key) => params[key] === value[key]
      )
    )
      return;
    setParams(convertInputData(value));
  };

  const draw = (value) => {
    drawGraph(ref, convertInputData(value));
  };

  return { total, params, result, ref, draw, openForm, handleSubmit };
};

