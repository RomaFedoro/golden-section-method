const t = (Math.sqrt(5) - 1) / 2;

const findLocalMinimum = ({ func, a, b }) => {
  const x1 = b - t * (b - a);
  const x2 = a + t * (b - a);

  if (func(x1) > func(x2)) return { a: x1, b };
  return { a, b: x2 };
};

export default findLocalMinimum;
