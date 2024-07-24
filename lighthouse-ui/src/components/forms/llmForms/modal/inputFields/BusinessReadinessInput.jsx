import FormItem from "../../../FormItem";
import FormInput from "../../../FormInput";
import FormInputValidator from "../../../FormInputValidator";
import ModalDetailsValidator from "../../../../../utils/validators/ModalDetailsValidator";

export default function BusinessReadinessInput({
  label = "Business Readiness (%)",
  businessReadinessValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-2"
      values={[businessReadinessValue]}
      validator={ModalDetailsValidator.validateBusinessReadiness}
      doSkipValidation={doSkipValidation}
      doUseDarkText
    >
      <FormItem labelTitle={label} doUseDarkText maxWidth="max-w-[32rem]">
        <FormInput
          value={businessReadinessValue}
          title={label}
          placeholder="50"
          type="number"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
