import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import UserDetailsValidator from "../../../../utils/validators/UserDetailsValidator";

export default function PasswordInputField({
  label = "Password",
  passwordValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-2"
      values={[passwordValue]}
      validator={UserDetailsValidator.validatePassword}
      doSkipValidation={doSkipValidation}
    >
      <FormInput
        value={passwordValue}
        labelTitle={label}
        placeholder={`Your ${label.toLowerCase()}`}
        type="password"
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
