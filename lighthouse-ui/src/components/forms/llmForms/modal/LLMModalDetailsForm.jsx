import useModalFormState from "../../../../hooks/formState/useModalFormState";
import DescriptionInput from "./inputFields/DescriptionInput";
import ModalityInput from "./inputFields/ModalityInput";
import NameInput from "./inputFields/NameInput";
import OrganisationInput from "./inputFields/OrganisationInput";

export default function LLMModalDetailsForm({
  onSubmit,
  isLoading,
  defaultValues,
}) {
  const formState = useModalFormState(defaultValues);
  const submitIsDisabled = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitIsDisabled) return;
    onSubmit(submission);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-[95vw] max-w-lg"
      onSubmit={handleSubmit}
      role="form"
    >
      <NameInput
        nameValue={formState.name}
        isDisabled={isLoading}
        onChange={(e) => formState.setName(e.target.value)}
        isActive
      />
      <DescriptionInput
        descriptionValue={formState.description}
        isDisabled={isLoading}
        onChange={(e) => formState.setDescription(e.target.value)}
        isActive
      />
      <ModalityInput
        modalityValue={formState.modality}
        isDisabled={isLoading}
        onChange={(e) => formState.setModality(e.target.value)}
        isActive
      />
      <OrganisationInput
        organisationValue={formState.organization}
        isDisabled={isLoading}
        onChange={(e) => formState.setOrganization(e.target.value)}
        isActive
      />
      <div>CreatedAt</div>
      <div>Access</div>
      <div>Licence</div>
      <div>perceived_business_value</div>
      <div>business_readiness</div>
    </form>
  );
}
