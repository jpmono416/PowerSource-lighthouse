import FormItem from "../../../FormItem";
import FormInput from "../../../FormInput";
import FormInputValidator from "../../../FormInputValidator";
import ModalDetailsValidator from "../../../../../utils/validators/ModalDetailsValidator";

export default function LicenceInput({
  label = "Licence",
  licenceValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
  forceShowValidationErrors,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-6"
      values={[licenceValue]}
      validator={ModalDetailsValidator.validateLicence}
      doSkipValidation={doSkipValidation}
      doUseDarkText
      forceShowValidationErrors={forceShowValidationErrors}
    >
      <FormItem labelTitle={label} doUseDarkText maxWidth="max-w-[32rem]">
        <FormInput
          value={licenceValue}
          title={label}
          placeholder="MIT"
          type="text"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
