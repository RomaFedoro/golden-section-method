export const findLocalMinimum = ({ func, a, b, precision }) => {
  const x = (a + b) / 2;
  const f1 = func(x - precision);
  const f2 = func(x + precision);

  if (f1 > f2) return { a: x, b };
  return { a, b: x };
};

export default findLocalMinimum;
