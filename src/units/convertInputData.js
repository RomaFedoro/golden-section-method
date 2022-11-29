import EXTREMUMS from "../constants/extremum";
import { EMPTY_VALUES, MAX_VALUES, MIN_VALUES } from "../constants/form";
import FUNCTIONS from "../constants/func";

export const getValidData = (inputValue, name) => {
  const value = Number(String(inputValue).split(" ").join(""));

  if (inputValue === "" || isNaN(value)) return EMPTY_VALUES[name];
  if (value < MIN_VALUES[name]) return MIN_VALUES[name];
  if (value > MAX_VALUES[name]) return MAX_VALUES[name];
  return value;
};

const getValidField = (params) => (name) => getValidData(params[name], name);

const convertInputData = (params) => {
  const getValidParam = getValidField(params);
  const { precisionCount, funcId, extremumId } = params;
  const startPoint = getValidParam("start");
  const endPoint = getValidParam("end");

  return {
    start: Math.min(startPoint, endPoint),
    end: Math.max(startPoint, endPoint),
    precision: 10 ** -getValidParam("precisionCount"),
    precisionCount: Number(precisionCount),
    func: FUNCTIONS[getValidParam("funcId")].func,
    funcId,
    extremumId,
    isMin: EXTREMUMS[getValidParam("extremumId")].isMin,
  };
};

export default convertInputData;

