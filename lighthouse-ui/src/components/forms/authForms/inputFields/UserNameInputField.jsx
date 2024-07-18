import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import UserDetailsValidator from "../../../../utils/validators/UserDetailsValidator";

export default function UserNameInputField({
  userNameValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-2"
      values={[userNameValue]}
      validator={UserDetailsValidator.validateUsername}
      doSkipValidation={doSkipValidation}
    >
      <FormInput
        value={userNameValue}
        labelTitle="Username"
        placeholder="your-username"
        type="text"
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
