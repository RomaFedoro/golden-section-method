import { DEFAULT_VALUES } from "../constants/form";
import {
  DEFAULT_MIN_X,
  DEFAULT_MIN_Y,
  DEFAULT_STEP,
  HEIGHT_PADDING,
  SIZE_X,
  SIZE_Y,
  WIDTH_GRAPH,
  WIDTH_PADDING,
} from "../constants/graph";
import { THICKNESS } from "../constants/style";
import getExtremumFunc from "./getExtremumFunc";

const getParamGraph = (params) => {
  const { start, end, precision, func } = params;

  let minX = Math.min(start, end, DEFAULT_MIN_X);
  let maxX = Math.max(start, end, DEFAULT_MIN_X);

  if (minX === 0 && maxX === 0) {
    minX = DEFAULT_VALUES.start;
    maxX = DEFAULT_VALUES.end;
  }

  const scaleX = SIZE_X / (maxX - minX);

  const { min, max } = getExtremumFunc({
    func,
    start: minX,
    end: maxX,
    precision: Math.max(precision, THICKNESS.graph / (10 * scaleX)),
  });

  const coords = {
    min: {
      x: minX,
      y: Math.min(min, DEFAULT_MIN_Y),
    },
    max: {
      x: maxX,
      y: Math.max(max, DEFAULT_MIN_Y),
    },
  };

  const scale = {
    x: scaleX,
    y: -SIZE_Y / (coords.max.y - coords.min.y),
  };


  const paddingX = Math.abs(WIDTH_PADDING / scale.x);
  const paddingY = Math.abs(HEIGHT_PADDING / scale.y);

  const globalCoord = {
    globalMin: {
      x: coords.min.x - paddingX,
      y: coords.min.y - paddingY,
    },
    globalMax: {
      x: coords.max.x + paddingX,
      y: coords.max.y + paddingY,
    },
  };

  const step =
    ((globalCoord.globalMax.x - globalCoord.globalMin.x) * DEFAULT_STEP) /
    WIDTH_GRAPH;

  const getCoord = (x, y) => {
    const xAxis = (x - globalCoord.globalMin.x) * scale.x;
    const yAxis = ((y ?? func(x)) - globalCoord.globalMax.y) * scale.y;
    return { x: xAxis, y: yAxis };
  };

  return {
    ...coords,
    ...globalCoord,
    scale,
    step,
    func,
    getCoord,
  };
};

export default getParamGraph;

