import { useNavigate } from "react-router-dom";
import { useLLMCatalogueContext } from "../../hooks/contexts/LLMCatalogueContext";
import LLMModalDetailsForm from "../forms/llmForms/modal/LLMModalDetailsForm";

export default function AddModalView() {
  const { createLLM, isLoading, errors } = useLLMCatalogueContext();
  const navigate = useNavigate();

  const handleSubmit = async (submission) => {
    const newLLM = await createLLM(submission);
    if (newLLM?.id) navigate(`/models/catalogue/${newLLM.id}`);
  };

  const defaultValues = {
    name: "My LLM",
    created_date: "2024-07-23",
    description: "A description for my new LLM Model",
    organization: "PowerSource",
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-3xl text-secondary-700 font-light mb-6">
        Add an LLM
      </h2>
      <LLMModalDetailsForm
        onSubmit={handleSubmit}
        submitButtonText="Create"
        defaultValues={defaultValues}
        isLoading={isLoading}
        errors={errors}
      />
    </div>
  );
}
