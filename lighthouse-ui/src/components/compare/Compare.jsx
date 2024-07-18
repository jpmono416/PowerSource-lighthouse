import GartnerQuadrant from "../library/gartnerQuadrant/GartnerQuadrant";

export default function Compare() {
  return (
    <div className="flex flex-col items-center mt-8 px-4">
      <GartnerQuadrant
        xAxisLabel="Business Readiness"
        yAxisLabel="Perceived Business Value"
      />
    </div>
  );
}
