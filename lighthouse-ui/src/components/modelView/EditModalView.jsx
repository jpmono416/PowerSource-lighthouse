import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useLLMCatalogueContext } from "../../hooks/contexts/LLMCatalogueContext";
import LLMModalDetailsForm from "../forms/llmForms/modal/LLMModalDetailsForm";
import LoadingSpinner from "../library/LoadingSpinner";
import RenderedErrors from "../library/RenderedErrors";

export default function EditModalView() {
  const { editLLM, getLLMById, isLoading, errors } = useLLMCatalogueContext();
  const [fetchModelErrors, setFetchModelErrors] = useState();

  const modelId = useParams().modelId;
  const [model, setModel] = useState(null);

  const fetchModel = async () => {
    const response = await getLLMById(modelId);
    if (response.errors) setFetchModelErrors(response.errors);
    else setModel(response);
  };

  useEffect(() => {
    fetchModel();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (submission) => {
    const updatedLLM = await editLLM(model.id, submission);
    if (updatedLLM?.id) navigate(`/models/catalogue/${updatedLLM.id}`);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {fetchModelErrors && <RenderedErrors errors={fetchModelErrors} />}
      {isLoading && <LoadingSpinner />}
      {model && (
        <>
          <h2 className="text-3xl text-secondary-700 font-light mb-6">
            {`Editing ${model.name}`}
          </h2>

          <LLMModalDetailsForm
            onSubmit={handleSubmit}
            submitButtonText="Save"
            isLoading={isLoading}
            errors={errors}
            defaultValues={model}
            forceShowValidationErrors
          />
        </>
      )}
    </div>
  );
}
