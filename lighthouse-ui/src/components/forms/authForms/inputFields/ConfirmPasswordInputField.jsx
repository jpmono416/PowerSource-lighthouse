import FormInput from "../../FormInput";
import FormInputValidator from "../../FormInputValidator";
import UserDetailsValidator from "../../../../utils/validators/UserDetailsValidator";
import FormItem from "../../FormItem";

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
      className="mb-2 max-w-[20rem]"
      values={[passwordValue, confirmPasswordValue]}
      validator={UserDetailsValidator.validateConfirmPassword}
      doSkipValidation={doSkipValidation}
    >
      <FormItem labelTitle={label}>
        <FormInput
          value={confirmPasswordValue}
          title={label}
          placeholder="Confirm password"
          type="password"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
