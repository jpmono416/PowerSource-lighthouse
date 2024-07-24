import FormItem from "../../../FormItem";
import FormInput from "../../../FormInput";
import FormInputValidator from "../../../FormInputValidator";
import ModalDetailsValidator from "../../../../../utils/validators/ModalDetailsValidator";

export default function NameInput({
  label = "Name",
  nameValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-2"
      values={[nameValue]}
      validator={ModalDetailsValidator.validateName}
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
          value={nameValue}
          title={label}
          placeholder="Chat-GPT 4"
          type="text"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
