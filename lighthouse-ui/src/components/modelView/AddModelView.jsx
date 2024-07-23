import LLMModalDetailsForm from "../forms/llmForms/modal/LLMModalDetailsForm";

export default function AddModalView() {
  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-3xl text-secondary-700 font-light mb-6">
        Add an LLM
      </h2>
      <LLMModalDetailsForm onSubmit={handleSubmit} submitButtonText="Create" />
    </div>
  );
}
