import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLLMCatalogueContext } from "../../hooks/contexts/LLMCatalogueContext";
import LoadingSpinner from "../library/LoadingSpinner";
import RenderedErrors from "../library/RenderedErrors";

export default function ModelView() {
  const { getLLMById, isLoading, errors } = useLLMCatalogueContext();
  const modelId = useParams().modelId;
  const [model, setModel] = useState(null);

  const fetchModel = async () => {
    const model = await getLLMById(modelId);
    setModel(model);
  };

  useEffect(() => {
    fetchModel();
  }, []);

  let content;

  if (errors) content = <RenderedErrors errors={errors} />;
  else if (!model || isLoading) content = <LoadingSpinner />;
  else
    content = (
      <>
        <h2 className="text-3xl text-secondary-700 font-light">{model.name}</h2>
        <h3 className="text-lg text-secondary-600 font-light">
          {`Created by ${model.organization}`}
        </h3>
      </>
    );

  return (
    <div className="mt-6">
      <Link to={-1} className="text-primary-700">
        {"< Back to list"}
      </Link>
      <div className="flex flex-col items-center ">{content}</div>
    </div>
  );
}
