import useModalFormState from "../../../../hooks/formState/useModalFormState";
import AccessInput from "./inputFields/AccessInput";
import BusinessReadinessInput from "./inputFields/BusinessReadinessInput";
import Button from "../../../library/Button";
import CreatedAtInput from "./inputFields/CreatedAtInput";
import DescriptionInput from "./inputFields/DescriptionInput";
import LicenceInput from "./inputFields/LicenceInput";
import ModalityInput from "./inputFields/ModalityInput";
import NameInput from "./inputFields/NameInput";
import OrganisationInput from "./inputFields/OrganisationInput";
import PerceivedBusinessValueInput from "./inputFields/PerceivedBusinessValueInput";
import ModalDetailsValidator from "../../../../utils/validators/ModalDetailsValidator";
import RenderedErrors from "../../../library/RenderedErrors";

export default function LLMModalDetailsForm({
  onSubmit,
  submitButtonText,
  isLoading,
  defaultValues,
  errors,
}) {
  const formState = useModalFormState(defaultValues);
  const submitIsDisabled = !ModalDetailsValidator.isValidated(
    formState.submission
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitIsDisabled) return;
    onSubmit(formState.submission);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-[95vw] max-w-lg mb-[10vh]"
      onSubmit={handleSubmit}
      role="form"
    >
      <NameInput
        nameValue={formState.name}
        isDisabled={isLoading}
        onChange={(e) => formState.setName(e.target.value)}
        isActive
      />
      <OrganisationInput
        organisationValue={formState.organization}
        isDisabled={isLoading}
        onChange={(e) => formState.setOrganization(e.target.value)}
        isActive
      />
      <CreatedAtInput
        createdAtValue={formState.created_date}
        isDisabled={isLoading}
        onChange={(e) => formState.setCreated_date(e.target.value)}
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
      <AccessInput
        accessValue={formState.access}
        isDisabled={isLoading}
        onChange={(e) => formState.setAccess(e.target.value)}
        isActive
      />
      <LicenceInput
        licenceValue={formState.license}
        isDisabled={isLoading}
        onChange={(e) => formState.setLicense(e.target.value)}
        isActive
      />
      <PerceivedBusinessValueInput
        perceivedBusinessValue={formState.perceived_business_value}
        isDisabled={isLoading}
        onChange={(e) => formState.setPerceived_business_value(e.target.value)}
        isActive
      />
      <BusinessReadinessInput
        businessReadinessValue={formState.business_readiness}
        isDisabled={isLoading}
        onChange={(e) => formState.setBusiness_readiness(e.target.value)}
        isActive
      />
      <Button
        primary
        className="mt-6"
        type="submit"
        onClick={handleSubmit}
        isDisabled={submitIsDisabled}
        isLoading={isLoading}
      >
        {submitButtonText}
      </Button>
      {submitIsDisabled && !errors && (
        <p className="text-secondary-700">
          One or more fields are invalid. Please check that all required fields
          (*) have been completed and that there are no warnings
        </p>
      )}
      <RenderedErrors errors={errors} />
    </form>
  );
}
