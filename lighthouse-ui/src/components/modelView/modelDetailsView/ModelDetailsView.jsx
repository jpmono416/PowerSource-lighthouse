import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

import { useLLMCatalogueContext } from "../../../hooks/contexts/LLMCatalogueContext";
import LoadingSpinner from "../../library/LoadingSpinner";
import RenderedErrors from "../../library/RenderedErrors";
import DataTable from "./DataTable";
import { useAppContext } from "../../../hooks/contexts/AppContext";

export default function ModelDetailsView() {
  const { getLLMById, isLoading } = useLLMCatalogueContext();
  const [errors, setErrors] = useState(null);
  const { isAdmin } = useAppContext();

  const modelId = useParams().modelId;
  const [model, setModel] = useState(null);

  const fetchModel = async () => {
    const response = await getLLMById(modelId);
    if (response.errors) setErrors(response.errors);
    else setModel(response);
  };

  useEffect(() => {
    fetchModel();
  }, []);

  const textFieldClasses = "py-8 px-4 border border-secondary-700  max-w-prose";

  return (
    <div className="mt-12 mb-[10vh]">
      <Link to={-1} className="text-primary-700">
        {"< Back"}
      </Link>
      <div className="flex flex-col items-center w-full px-2">
        {errors && <RenderedErrors errors={errors} />}
        {isLoading && !errors && <LoadingSpinner />}
        {model && !isLoading && !errors && (
          <div>
            <div className="mb-4">
              <div className="flex flex-row items-center justify-center mb-2 gap-x-2">
                <h2 className="text-3xl text-secondary-700 font-light text-center">
                  {model.name}
                </h2>
                {isAdmin && (
                  <Link to="edit">
                    <CiEdit className="text-3xl cursor-pointer text-secondary-700 hover:text-green-500" />
                  </Link>
                )}
              </div>
              {model.url && (
                <div className="flex justify-center">
                  <a
                    href={model.url}
                    target="_blank"
                    className="text-center text-secondary-600 hover:text-secondary-800"
                  >
                    External resource
                  </a>
                </div>
              )}
            </div>
            <div className="mb-12">
              <DataTable model={model} />
            </div>
            {model["intended_uses"] && (
              <div className="mb-12">
                <h3 className="text-lg text-secondary-700 mb-2">
                  Intended Uses
                </h3>
                <p className={textFieldClasses}>{model["intended_uses"]}</p>
              </div>
            )}
            {model.description && (
              <div>
                <h3 className="text-lg text-secondary-700 mb-2">Description</h3>
                <p className={textFieldClasses}>{model.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
