// Тут можно добавить свои функции
const FUNCTIONS = [
  {
    func: (x) => x ** 2 - 4,
    text: "f(x) = x^2 - 4",
  },
  {
    func: (x) => (1 / 32) * (x + 1) ** 3 * (x - 3) ** 4,
    text: "f(x) = \\frac{1}{32} (x + 1)^3  (x - 3)^4",
  },
  {
    func: (x) => x * Math.sin(x),
    text: "f(x) = x sin(x)",
  },
];

export default FUNCTIONS;

