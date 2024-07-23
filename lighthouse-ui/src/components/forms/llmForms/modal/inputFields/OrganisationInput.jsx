import FormItem from "../../../FormItem";
import FormInput from "../../../FormInput";
import FormInputValidator from "../../../FormInputValidator";
import ModalDetailsValidator from "../../../../../utils/validators/ModalDetailsValidator";

export default function OrganisationInput({
  label = "Organisation",
  organisationValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-6"
      values={[organisationValue]}
      validator={ModalDetailsValidator.validateOrganisation}
      doSkipValidation={doSkipValidation}
      doUseDarkText
    >
      <FormItem
        labelTitle={label}
        doUseDarkText
        maxWidth="max-w-[32rem]"
        required
      >
        <FormInput
          value={organisationValue}
          title={label}
          placeholder="Google, OpenAI"
          type="text"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
