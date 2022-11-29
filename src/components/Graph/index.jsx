import React, { memo } from "react";
import { WIDTH_GRAPH, HEIGHT_GRAPH } from "../../constants/graph";

const Graph = React.forwardRef((_, ref) => (
  <canvas width={WIDTH_GRAPH} height={HEIGHT_GRAPH} ref={ref}></canvas>
));

export default memo(Graph);

