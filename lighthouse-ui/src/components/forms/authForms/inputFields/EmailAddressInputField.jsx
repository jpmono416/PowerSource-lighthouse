import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import UserDetailsValidator from "../../../../utils/validators/UserDetailsValidator";

export default function EmailAddressInputField({
  emailAddressValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-4"
      values={[emailAddressValue]}
      validator={UserDetailsValidator.validateEmailAddress}
      doSkipValidation={doSkipValidation}
    >
      <FormInput
        labelTitle="Email address"
        value={emailAddressValue}
        placeholder="your@email.com"
        type="email"
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
