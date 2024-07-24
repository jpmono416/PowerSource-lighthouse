import { useEffect, useState } from "react";

import { useLLMCatalogueContext } from "../../hooks/contexts/LLMCatalogueContext";
import GartnerQuadrant from "../library/gartnerQuadrant/GartnerQuadrant";
import LoadingSpinner from "../library/LoadingSpinner";
import RenderedErrors from "../library/RenderedErrors";

export default function Compare() {
  const { getMatrix, isLoading, errors } = useLLMCatalogueContext();
  const [matrix, setMatrix] = useState();

  const fetchMatrix = async () => {
    const response = await getMatrix();
    setMatrix(response);
  };

  useEffect(() => {
    fetchMatrix();
  }, []);

  let content;
  if (errors) content = <RenderedErrors errors={errors} />;
  else if (!matrix || isLoading) content = <LoadingSpinner />;
  else {
    const dataPoints = matrix.map((model) => {
      return {
        id: model.id,
        name: model.name,
        x: parseInt(model.business_readiness),
        y: parseInt(model.perceived_business_value),
        link: `/models/catalogue/${model.id}`,
      };
    });
    content = (
      <GartnerQuadrant
        xAxisLabel="Business Readiness"
        yAxisLabel="Perceived Business Value"
        dataPoints={dataPoints}
      />
    );
  }

  return <div className="flex flex-col items-center mt-8 px-4">{content}</div>;
}
