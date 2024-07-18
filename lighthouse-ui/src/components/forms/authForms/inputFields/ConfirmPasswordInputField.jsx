import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import UserDetailsValidator from "../../../../utils/validators/UserDetailsValidator";

export default function ConfirmPasswordInputField({
  label = "Confirm Password",
  passwordValue,
  confirmPasswordValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-2"
      values={[passwordValue, confirmPasswordValue]}
      validator={UserDetailsValidator.validateConfirmPassword}
      doSkipValidation={doSkipValidation}
    >
      <FormInput
        value={confirmPasswordValue}
        labelTitle={label}
        placeholder="Confirm password"
        type="password"
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
