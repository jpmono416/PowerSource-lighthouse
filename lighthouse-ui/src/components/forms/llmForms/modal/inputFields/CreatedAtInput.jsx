import FormItem from "../../../FormItem";
import FormInput from "../../../FormInput";
import FormInputValidator from "../../../FormInputValidator";
import ModalDetailsValidator from "../../../../../utils/validators/ModalDetailsValidator";

export default function CreatedAtInput({
  label = "Created At",
  createdAtValue,
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
      values={[createdAtValue]}
      validator={ModalDetailsValidator.validateCreatedAt}
      doSkipValidation={doSkipValidation}
      doUseDarkText
      forceShowValidationErrors={forceShowValidationErrors}
    >
      <FormItem
        labelTitle={label}
        doUseDarkText
        maxWidth="max-w-[32rem]"
        required
      >
        <FormInput
          value={createdAtValue}
          title={label}
          type="date"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
