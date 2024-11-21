import { Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { FC } from "react";

interface ICurvePlotter2DProps {
  xPoints: number[];
  yPoints: number[];
  width?: number;
  height?: number;
  min?: number;
  max?: number;
  label?: string;
  labelPosition?: "top" | "bottom";
}

const CurvePlotter2D: FC<ICurvePlotter2DProps> = ({
  xPoints,
  yPoints,
  width = 500,
  height = 300,
  min,
  max,
  label,
  labelPosition = "top",
}) => {
  //todo: optimize MathJax context on a higher level
  return (
    <div style={{ position: "absolute" }}>
      {label && labelPosition === "top" && (
        <Typography
          variant="h6"
          align="center"
          sx={{ position: "absolute", width: "100%" }}
        >
          <MathJaxContext>
            <MathJax inline>{label}</MathJax>
          </MathJaxContext>
        </Typography>
      )}
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
      {label && labelPosition === "bottom" && (
        <Typography
          variant="h6"
          align="center"
          sx={{ position: "absolute", width: "100%" }}
        >
          <MathJaxContext>
            <MathJax inline>{label}</MathJax>
          </MathJaxContext>
        </Typography>
      )}
    </div>
  );
};

export default CurvePlotter2D;
