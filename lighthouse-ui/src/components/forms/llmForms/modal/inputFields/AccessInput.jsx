import FormItem from "../../../FormItem";
import FormInput from "../../../FormInput";
import FormInputValidator from "../../../FormInputValidator";
import ModalDetailsValidator from "../../../../../utils/validators/ModalDetailsValidator";

export default function AccessInput({
  label = "Access",
  accessValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
  forceShowValidationErrors,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-2"
      values={[accessValue]}
      validator={ModalDetailsValidator.validateAccess}
      doSkipValidation={doSkipValidation}
      doUseDarkText
      forceShowValidationErrors={forceShowValidationErrors}
    >
      <FormItem labelTitle={label} doUseDarkText maxWidth="max-w-[32rem]">
        <FormInput
          value={accessValue}
          title={label}
          placeholder="open"
          type="text"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
