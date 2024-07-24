import FormItem from "../../../FormItem";
import FormInput from "../../../FormInput";
import FormInputValidator from "../../../FormInputValidator";
import ModalDetailsValidator from "../../../../../utils/validators/ModalDetailsValidator";

export default function PerceivedBusinessValueInput({
  label = "Perceived Business Value (%)",
  perceivedBusinessValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-2"
      values={[perceivedBusinessValue]}
      validator={ModalDetailsValidator.validatePerceivedBusinessValue}
      doSkipValidation={doSkipValidation}
      doUseDarkText
    >
      <FormItem labelTitle={label} doUseDarkText maxWidth="max-w-[32rem]">
        <FormInput
          value={perceivedBusinessValue}
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
