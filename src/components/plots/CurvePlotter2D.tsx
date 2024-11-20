import { LineChart } from "@mui/x-charts";
import { FC } from "react";

interface ICurvePlotter2DProps {
  xPoints: number[];
  yPoints: number[];
  width?: number;
  height?: number;
  min?: number;
  max?: number;
}

const CurvePlotter2D: FC<ICurvePlotter2DProps> = ({
  xPoints,
  yPoints,
  width = 500,
  height = 300,
  min,
  max,
}) => {
  return (
    <LineChart
      xAxis={[{ data: xPoints, min, max }]}
      series={[
        {
          data: yPoints,
          showMark: false,
        },
      ]}
      yAxis={[
        {
          min: -1,
          max: 1,
        },
      ]}
      width={width}
      height={height}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};

export default CurvePlotter2D;
