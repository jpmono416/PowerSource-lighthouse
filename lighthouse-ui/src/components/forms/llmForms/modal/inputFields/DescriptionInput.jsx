import FormInputValidator from "../../../FormInputValidator";
import ModalDetailsValidator from "../../../../../utils/validators/ModalDetailsValidator";
import FormItem from "../../../FormItem";

export default function DescriptionInput({
  label = "Description",
  descriptionValue,
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
      values={[descriptionValue]}
      validator={ModalDetailsValidator.validateDescription}
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
        {descriptionValue.length > 0 && (
          <p className="mt-2">{`${descriptionValue.length} characters`}</p>
        )}
        <textarea
          className="w-full px-2 py-1"
          rows="12"
          value={descriptionValue}
          onChange={onChange}
          placeholder="This model is a..."
          disabled={isDisabled}
        />
      </FormItem>
    </FormInputValidator>
  );
}
