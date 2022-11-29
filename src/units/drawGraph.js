import { COLORS, SIZE, THICKNESS } from "../constants/style";
import { HEIGHT_GRAPH, SEGMENTS, WIDTH_GRAPH } from "../constants/graph";
import getParamGraph from "./getParamGraph";

const paramsGraph = {
  start: -2,
  end: 2,
  precision: 0.01,
  func: (x) => x ** 2,
};

let dataGraph = getParamGraph(paramsGraph);

const updateDataGraph = (params) => {
  let isUpdated = false;

  Object.keys(paramsGraph).forEach((key) => {
    if (params[key] !== undefined && params[key] !== paramsGraph[key]) {
      isUpdated = true;
      paramsGraph[key] = params[key];
    }
  });

  if (isUpdated) dataGraph = getParamGraph(paramsGraph);
};

const drawGraphFunction = (ctx) => {
  const { getCoord, step, scale, globalMin, globalMax } = dataGraph;

  const start = globalMin.x;
  const end = globalMax.x;

  for (
    let i = start;
    i <= end;
    i += Math.max(step, THICKNESS.graph / (10 * scale.x))
  ) {
    const { x, y } = getCoord(i);
    ctx.fillStyle = COLORS.graph;
    ctx.fillRect(x, y, THICKNESS.graph, THICKNESS.graph);
  }
};

const drawRange = (ctx, { a, b }) => {
  const { getCoord, func } = dataGraph;
  if (a !== undefined && a === b) {
    const { x, y } = getCoord(a);
    const text = `(${a.toFixed(3)}; ${func(a).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(x, y, SIZE.point, 0, 2 * Math.PI, false);
    ctx.fillStyle = COLORS.point;
    ctx.font = `${SIZE.normal}px Computer Modern Serif`;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y + SIZE.normal + SIZE.point * 2);
    ctx.fill();
    return;
  }

  ctx.fillStyle = COLORS.rectBackground;
  ctx.setLineDash([0, 0]);
  ctx.strokeStyle = COLORS.rectBorder;
  ctx.lineWidth = THICKNESS.rect;

  const { x: x1 } = getCoord(a);
  const { x: x2 } = getCoord(b);

  ctx.fillRect(x1, 0, x2 - x1, HEIGHT_GRAPH);
};

const drawLine = (ctx, coord, isHorizontal = true, custom) => {
  ctx.beginPath();

  ctx.lineWidth = THICKNESS.graph;
  ctx.strokeStyle = COLORS.axis;

  if (custom) {
    custom(ctx, coord, isHorizontal);
  }

  if (isHorizontal) {
    ctx.moveTo(0, coord);
    ctx.lineTo(WIDTH_GRAPH, coord);
  } else {
    ctx.moveTo(coord, 0);
    ctx.lineTo(coord, HEIGHT_GRAPH);
  }

  ctx.stroke();

  ctx.closePath();
};

const drawDashLine =
  (text, isStart = true) =>
  (ctx, coord) => {
    ctx.setLineDash([16, 6]);
    ctx.lineWidth = THICKNESS.normal;
    ctx.strokeStyle = ctx.fillStyle = COLORS.normal;
    ctx.font = `${SIZE.normal}px Computer Modern Serif`;
    let textCoord = coord;

    if (isStart) {
      ctx.textAlign = "end";
      textCoord -= SIZE.normal / 4;
    } else {
      ctx.textAlign = "start";
      textCoord += SIZE.normal / 4;
    }
    ctx.fillText(text, textCoord, HEIGHT_GRAPH - 1);
  };

const clearCanvas = (ctx) => {
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, WIDTH_GRAPH, HEIGHT_GRAPH);
};

const drawAxios = (ctx) => {
  const { getCoord } = dataGraph;
  const { x: startX, y: startY } = getCoord(0, 0);
  ctx.setLineDash([0, 0]);
  drawLine(ctx, startY); // X Axis
  drawLine(ctx, startX, false); // Y Axis
};

const drawSegmentLine = (ctx) => {
  ctx.setLineDash([0, 0]);
  ctx.lineWidth = THICKNESS.segmentsLine;
  ctx.strokeStyle = ctx.fillStyle = COLORS.segments;
};

const drawSegments = (ctx) => {
  const { getCoord, globalMin: min, globalMax: max } = dataGraph;

  const widthSegmentX =
    10 ** Math.trunc(Math.log10((max.x - min.x) / SEGMENTS));
  let currSegmentX = Math.ceil(min.x / widthSegmentX) * widthSegmentX;

  const widthSegmentY =
    10 ** Math.trunc(Math.log10((max.x - min.x) / SEGMENTS));
  let currSegmentY = Math.ceil(min.y / widthSegmentY) * widthSegmentY;

  ctx.strokeStyle = ctx.fillStyle = COLORS.axis;
  ctx.setLineDash([0, 0]);

  while (currSegmentX <= max.x) {
    if (currSegmentX !== 0) {
      const { x } = getCoord(currSegmentX, 0);
      drawLine(ctx, x, false, drawSegmentLine);
    }
    currSegmentX += widthSegmentX;
  }

  while (currSegmentY <= max.y) {
    if (currSegmentY !== 0) {
      const { y } = getCoord(0, currSegmentY);
      drawLine(ctx, y, true, drawSegmentLine);
    }
    currSegmentY += widthSegmentY;
  }
};

const drawNormal = (ctx, params) => {
  const { getCoord } = dataGraph;
  const { start, end } = params;

  const { x: minX } = getCoord(start, 0);
  drawLine(ctx, minX, false, drawDashLine(start));

  if (start !== end) {
    const { x: maxX } = getCoord(end, 0);
    drawLine(ctx, maxX, false, drawDashLine(end, false));
  }
};

const drawGraph = async (ref, params) => {
  const { func } = params;

  updateDataGraph(params);

  const canvas = ref.current;
  if (!canvas || typeof func !== "function") return;

  const ctx = canvas.getContext("2d");

  clearCanvas(ctx);
  drawSegments(ctx);
  drawAxios(ctx);
  drawGraphFunction(ctx);
  drawRange(ctx, params);
  drawNormal(ctx, params);
};

export default drawGraph;

