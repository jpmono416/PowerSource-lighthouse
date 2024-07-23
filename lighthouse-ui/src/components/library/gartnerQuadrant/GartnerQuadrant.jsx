import DataPoints from "./DataPoints";
import QuadrantLabels from "./QuadrantLabels";
import QuadrantLines from "./QuadrantLines";

export default function GartnerQuadrant({
  xAxisLabel,
  yAxisLabel,
  dataPoints,
}) {
  return (
    <div className="relative w-full max-w-xl  aspect-square">
      <QuadrantLines />
      <QuadrantLabels />
      <DataPoints dataPoints={dataPoints} />
      <div className="text-secondary-800 absolute bottom-5 -rotate-90 translate-x-50 origin-left text-nowrap whitespace-pre">
        {`${xAxisLabel}\t\u2192`}
      </div>
      <div className="text-secondary-800 absolute bottom-[-8%] left-10 text-nowrap whitespace-pre">
        {`${yAxisLabel}\t\u2192`}
      </div>
    </div>
  );
}
