import { useNavigate, Link } from "react-router-dom";
import { useLLMCatalogueContext } from "../../hooks/contexts/LLMCatalogueContext";

import LLMModalDetailsForm from "../forms/llmForms/modal/LLMModalDetailsForm";

export default function AddModalView() {
  const { createLLM, isLoading, errors } = useLLMCatalogueContext();
  const navigate = useNavigate();

  const handleSubmit = async (submission) => {
    const newLLM = await createLLM(submission);
    if (newLLM?.id) navigate(`/models/catalogue/${newLLM.id}`);
  };

  const defaults = {
    name: "TestModal",
    description: "Test description for test modal",
    organization: "Blah blah",
    modality: "hello",
    created_date: "2024-01-01",
  };

  return (
    <div>
      {" "}
      <Link to={-1} className="text-primary-700">
        {"< Back"}
      </Link>
      <div className="flex flex-col items-center mt-8">
        <h2 className="text-3xl text-secondary-700 font-light mb-6">
          Add an LLM
        </h2>
        <LLMModalDetailsForm
          onSubmit={handleSubmit}
          submitButtonText="Create"
          isLoading={isLoading}
          errors={errors}
          defaultValues={defaults}
        />
      </div>
    </div>
  );
}
