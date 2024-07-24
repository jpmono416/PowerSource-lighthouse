import Gradient from "../../../utils/tableConfigs/Gradient";
import DataPoint from "./DataPoint";

export default function DataPoints({ dataPoints }) {
  const padding = 10;
  const gradient = new Gradient("rgb(143, 59, 49)", "rgb(89, 205, 144)");

  const adjustValueForPadding = (n) => {
    const totalLength = 100 - padding * 2;
    return padding + totalLength * (n / 100);
  };

  return dataPoints.map((dataPoint) => {
    return (
      <DataPoint
        key={dataPoint.id}
        link={dataPoint.link}
        gradient={gradient}
        label={dataPoint.name}
        x={adjustValueForPadding(dataPoint.x)}
        y={adjustValueForPadding(dataPoint.y)}
      />
    );
  });
}
